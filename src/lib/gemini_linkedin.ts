import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const linkedinProfileSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    headline: { type: Type.STRING },
    location: { type: Type.STRING },
    about: { type: Type.STRING },
    current_company: { type: Type.STRING },
    current_title: { type: Type.STRING },
    experiences: {
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
        }
      }
    },
    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
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
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          url: { type: Type.STRING },
        }
      }
    },
  }
};

export async function normalizeLinkedInProfile(text: string) {
  const prompt = `Extract the following LinkedIn profile text into a structured JSON profile.
Normalize dates (e.g., YYYY-MM). Leave missing fields empty, do NOT make up information.
LinkedIn Text:
${text}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: linkedinProfileSchema,
    }
  });

  return JSON.parse(response.text || "{}");
}

const auditSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    overall_score: { type: Type.INTEGER },
    categories: {
      type: Type.OBJECT,
      properties: {
        headline: { type: Type.INTEGER },
        about: { type: Type.INTEGER },
        experience: { type: Type.INTEGER },
        skills: { type: Type.INTEGER },
        keywords: { type: Type.INTEGER },
      }
    },
    issues: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
    rewrites: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          section: { type: Type.STRING },
          current: { type: Type.STRING },
          recommended: { type: Type.STRING },
          reason: { type: Type.STRING }
        }
      }
    }
  }
};

export async function generateLinkedInAudit(profileData: any, targetRole: string = "") {
  const prompt = `You are a strict career coach and recruiter. Audit this LinkedIn profile JSON.
${targetRole ? `The user is targeting the role: ${targetRole}. Evaluate against this target.` : "Evaluate for clarity and impact."}
Provide an overall score out of 100, category scores (out of 20), list issues, provide recommendations, and suggest 1-3 specific rewrites (e.g. rewrite headline or an experience bullet).
Do NOT invent facts. Improve tone and impact.
Profile:
${JSON.stringify(profileData, null, 2)}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: auditSchema,
    }
  });

  return JSON.parse(response.text || "{}");
}
