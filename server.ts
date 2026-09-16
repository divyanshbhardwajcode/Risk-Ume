import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default || pdfParseModule;
import mammoth from "mammoth";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const getSupabase = (req: any) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });



const extractTextFromBuffer = async (buffer: Buffer, fileType: string): Promise<string> => {

  if (fileType === "application/pdf" || fileType === "pdf") {

    const data = await pdfParse(buffer);

    return data.text;

  } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileType === "docx") {

    const result = await mammoth.extractRawText({ buffer });

    return result.value;

  } else if (fileType === "text/plain" || fileType === "txt") {

    return buffer.toString("utf-8");

  } else {

    throw new Error("Unsupported file type");

  }

};



const profileSchema: Schema = {

  type: Type.OBJECT,

  properties: {

    personal: {

      type: Type.OBJECT,

      properties: {

        fullName: { type: Type.STRING },

        headline: { type: Type.STRING },

        email: { type: Type.STRING },

        phone: { type: Type.STRING },

        location: { type: Type.STRING },

        linkedin: { type: Type.STRING },

        portfolio: { type: Type.STRING },

      },

    },

    summary: { type: Type.STRING },

    skills: { type: Type.ARRAY, items: { type: Type.STRING } },

    experience: {

      type: Type.ARRAY,

      items: {

        type: Type.OBJECT,

        properties: {

          company: { type: Type.STRING },

          role: { type: Type.STRING },

          location: { type: Type.STRING },

          startDate: { type: Type.STRING },

          endDate: { type: Type.STRING },

          current: { type: Type.BOOLEAN },

          description: { type: Type.STRING },

          achievements: { type: Type.ARRAY, items: { type: Type.STRING } },

          skills: { type: Type.ARRAY, items: { type: Type.STRING } },

        }

      }

    },

    education: {

      type: Type.ARRAY,

      items: {

        type: Type.OBJECT,

        properties: {

          institution: { type: Type.STRING },

          degree: { type: Type.STRING },

          field: { type: Type.STRING },

          startDate: { type: Type.STRING },

          endDate: { type: Type.STRING },

          location: { type: Type.STRING },

        }

      }

    },

    projects: {

      type: Type.ARRAY,

      items: {

        type: Type.OBJECT,

        properties: {

          name: { type: Type.STRING },

          description: { type: Type.STRING },

          technologies: { type: Type.ARRAY, items: { type: Type.STRING } },

          url: { type: Type.STRING },

        }

      }

    },

    certifications: {

      type: Type.ARRAY,

      items: {

        type: Type.OBJECT,

        properties: {

          name: { type: Type.STRING },

          issuer: { type: Type.STRING },

          date: { type: Type.STRING },

        }

      }

    },

    languages: {

      type: Type.ARRAY,

      items: {

        type: Type.OBJECT,

        properties: {

          name: { type: Type.STRING },

          proficiency: { type: Type.STRING },

        }

      }

    },

    achievements: { type: Type.ARRAY, items: { type: Type.STRING } },

  }

};

async function startServer() {
  const app = express();
  const authenticateToken = async (req: any, res: any, next: any) => {

    const supabase = getSupabase(req);

    if (!supabase) return res.sendStatus(401);

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return res.sendStatus(403);

    req.user = user;

    req.supabase = supabase;

    next();

  };
  const PORT = 3000;

  app.use(express.json());
  app.post("/api/resume/parse", authenticateToken, async (req: any, res: any) => {

    try {

      const { path: storagePath, filename } = req.body;

      const ext = filename.split(".").pop()?.toLowerCase();

      

      const { data, error } = await req.supabase.storage.from("resumes").download(storagePath);

      if (error) throw error;

      

      const buffer = Buffer.from(await data.arrayBuffer());

      const text = await extractTextFromBuffer(buffer, ext);

      

      const prompt = `Extract the following resume text into a structured JSON profile. \nNormalize dates (e.g., YYYY-MM). Leave missing fields empty, do NOT make up information.\nResume Text:\n${text}`;



      const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt,

        config: {

          responseMimeType: "application/json",

          responseSchema: profileSchema,

        }

      });

      

      const responseText = response.text;

      const profileJson = JSON.parse(responseText);

      

      const { error: dbError } = await req.supabase.from("career_profiles").update({ extracted_profile: profileJson }).eq("user_id", req.user.id);

      if (dbError) throw dbError;

      

      res.json({ success: true, profile: profileJson });

    } catch (error: any) {

      console.error(error);

      res.status(500).json({ error: error.message });

    }

  });


  // Auth Middleware

  app.post("/api/ats/analyze", authenticateToken, async (req: any, res: any) => {
    const { 
      id, resume_text, job_description, score_before, score_after, match_level, 
      recommendations, resume_health, interview_prob_before, interview_prob_after,
      formatting_score, quantified_achievements_score, grammar_tone_score,
      salary_readiness_score, salary_band_estimate, career_gap_risk,
      culture_fit_score, multi_role_conflict
    } = req.body;
    
    try {
      // First, create a resume entry (or find existing)
      const { data: resume, error: resumeError } = await req.supabase
        .from('resumes')
        .insert({
          user_id: req.user.id,
          title: "Optimized Resume",
          resume_data: { resume_text }
        })
        .select()
        .single();

      if (resumeError) throw resumeError;

      // Create the analysis
      const { error: analysisError } = await req.supabase
        .from('resume_analyses')
        .insert({
          id,
          user_id: req.user.id,
          resume_id: resume.id,
          overall_score: score_after,
          ats_score: score_after,
          keyword_score: 0,
          formatting_score: formatting_score || 0,
          experience_score: quantified_achievements_score || 0,
          risks: { career_gap_risk, multi_role_conflict },
          recommendations: recommendations
        });

      if (analysisError) throw analysisError;

      res.json({ status: "success", id });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/ats/history", authenticateToken, async (req: any, res: any) => {
    try {
      const { data, error } = await req.supabase
        .from("resume_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/resume/version", authenticateToken, async (req: any, res: any) => {
    const { resume_json, ats_score } = req.body;
    try {
      const { data, error } = await req.supabase
        .from("resumes")
        .insert({
          user_id: req.user.id,
          title: "Resume Update",
          resume_data: resume_json,
        })
        .select()
        .single();
        
      if (error) throw error;
      res.json({ success: true, id: data.id });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/dashboard", authenticateToken, async (req: any, res: any) => {
    try {
      const { data, error } = await req.supabase
        .from("resume_analyses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      // Return dummy benchmarking data along with latest assessment
      res.json({
        latestAssessment: data || null,
        weeklyTrends: {
          role: "Backend Engineer",
          demandChange: "+9%",
          topSkill: "Kubernetes",
          skillTrend: "upward"
        },
        benchmarking: {
          percentile: 31,
          group: "Backend Engineers"
        }
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
