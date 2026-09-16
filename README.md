# Risk-Ume

## AI-Powered Resume Intelligence, ATS Optimization & Career Risk Analysis

Risk-Ume is an AI-powered career intelligence platform designed to analyze resumes from multiple perspectives rather than reducing a resume to a single score.

The system combines ATS analysis, resume health, skill-gap detection, career-risk assessment, interview-readiness signals, keyword analysis, hiring-manager profiling, recommendations, resume versioning, persistent storage, and dashboard analytics.

> A resume should not only describe where you have been. It should help identify where you are vulnerable and what you should improve next.

---

## Table of Contents

* [Overview](#overview)
* [Problem](#problem)
* [Core Features](#core-features)
* [End-to-End System Architecture](#end-to-end-system-architecture)
* [Complete Working Flow](#complete-working-flow)
* [AI Analysis Framework](#ai-analysis-framework)
* [ATS Intelligence](#ats-intelligence)
* [Career Risk Engine](#career-risk-engine)
* [Skill Intelligence](#skill-intelligence)
* [Recommendation Engine](#recommendation-engine)
* [Resume Versioning](#resume-versioning)
* [Database Architecture](#database-architecture)
* [Backend Architecture](#backend-architecture)
* [Authentication](#authentication)
* [API Architecture](#api-architecture)
* [Dashboard and Analytics](#dashboard-and-analytics)
* [Technology Stack](#technology-stack)
* [Project Structure](#project-structure)
* [Data Flow](#data-flow)
* [Optimization Loop](#optimization-loop)
* [Development Roadmap](#development-roadmap)
* [Limitations](#limitations)
* [Security](#security)
* [What I Learned](#what-i-learned)
* [Future Vision](#future-vision)
* [Project Status](#project-status)
* [Author](#author)
* [License](#license)

---

# Overview

Risk-Ume explores a broader question than traditional resume scanners.

Instead of asking:

> "Is my resume good?"

Risk-Ume attempts to answer:

> "Where is my resume vulnerable, why is it vulnerable, what skills am I missing, and what should I improve?"

The platform analyzes a resume against a target role and generates structured career intelligence.

---

# Problem

A resume can be weak for many different reasons:

* Poor ATS keyword alignment
* Missing technical skills
* Missing important keywords
* Weakly quantified achievements
* Poor formatting
* Weak grammar or tone
* Poor role alignment
* Skill gaps
* Career-gap concerns
* Weak interview-readiness signals
* Weak positioning for a target role

Because of this, a single resume score is often not enough.

Risk-Ume approaches resume analysis as a multidimensional intelligence problem.

---

# Core Features

## Resume Intelligence

* Resume analysis
* Resume health analysis
* ATS scoring
* Job-description matching
* Missing keyword detection
* Missing skill detection
* Hard-skill analysis
* Soft-skill analysis
* Grammar and tone analysis
* Formatting analysis
* Quantified-achievement analysis

## Career Intelligence

* Career-risk assessment
* Role analysis
* Skill-gap detection
* Keyword decay analysis
* Hiring-manager profiling
* Interview-readiness signals
* Salary-readiness analysis
* Culture-fit analysis
* Multi-role conflict analysis

## Optimization

* Before vs after ATS comparison
* AI-generated recommendations
* Add / remove / rewrite recommendations
* Recommendation impact scoring
* Resume optimization
* Resume re-analysis

## Data and Product Features

* User authentication
* JWT-based authentication
* Password hashing
* Resume version history
* Persistent assessments
* Career-risk history
* Recommendation storage
* Dashboard analytics
* Skill trend analysis
* Career benchmarking

---

# End-to-End System Architecture

The complete Risk-Ume system can be understood as the following pipeline:

```text
                         +----------------------+
                         |         USER         |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         |    UPLOAD RESUME     |
                         +----------+-----------+
                                    |
                                    v
                     +--------------------------+
                     | TARGET ROLE / JOB DESC. |
                     +------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |       RISK-UME APP        |
                    +-------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |      FRONTEND LAYER       |
                    | React + TypeScript + Vite |
                    +-------------+-------------+
                                  |
                                  v
                    +---------------------------+
                    |        BACKEND API        |
                    |     Node.js + Express      |
                    +-------------+-------------+
                                  |
                   +--------------+--------------+
                   |                             |
                   v                             v
          +------------------+         +------------------+
          | AUTHENTICATION   |         |   AI ANALYSIS    |
          |   JWT + bcrypt   |         |      ENGINE      |
          +------------------+         +--------+---------+
                                                |
                                                v
                                      +------------------+
                                      |    GEMINI AI     |
                                      +--------+---------+
                                               |
                                               v
                                    +--------------------+
                                    | STRUCTURED RESULT  |
                                    +---------+----------+
                                              |
                    +-------------------------+-------------------------+
                    |                         |                         |
                    v                         v                         v
               +----------+             +----------+             +----------+
               |   ATS    |             |  SKILLS  |             |   RISK   |
               +----+-----+             +----+-----+             +----+-----+
                    |                        |                         |
                    +------------------------+-------------------------+
                                             |
                                             v
                                  +-----------------------+
                                  | RECOMMENDATION ENGINE |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  | RESUME OPTIMIZATION   |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |      RE-ANALYSIS      |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |    BEFORE / AFTER     |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |       DATABASE        |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |       DASHBOARD       |
                                  +-----------------------+
                                              |
                                              v
                                  +-----------------------+
                                  |    CAREER INSIGHTS    |
                                  +-----------------------+
```

---

# Complete Working Flow

```text
STEP 1
User uploads resume
      |
      v
STEP 2
User selects target role or job description
      |
      v
STEP 3
Authentication is verified
      |
      v
STEP 4
Resume and job context are processed
      |
      v
STEP 5
AI analysis begins
      |
      +---------------------+
      |                     |
      v                     v
 ATS Analysis          Career Analysis
      |                     |
      v                     v
 Keywords               Skill Gaps
 Formatting             Career Risk
 Resume Health          Role Alignment
      |                     |
      +----------+----------+
                 |
                 v
STEP 6
Structured intelligence is produced
                 |
                 v
STEP 7
Weaknesses, gaps and risk signals are identified
                 |
        +--------+--------+
        |        |        |
        v        v        v
      Skills  Keywords   Risks
        |        |        |
        +--------+--------+
                 |
                 v
STEP 8
Recommendations are generated
                 |
                 v
STEP 9
User improves the resume
                 |
                 v
STEP 10
Resume is analyzed again
                 |
                 v
STEP 11
Before / after results are compared
                 |
                 v
STEP 12
Assessment and version are stored
                 |
                 v
STEP 13
Dashboard displays the intelligence
                 |
                 v
STEP 14
User continues improving
                 |
                 +--------------------> STEP 5
```

---

# AI Analysis Framework

Risk-Ume divides resume intelligence into multiple analytical dimensions.

```text
                         +----------------------+
                         |        RESUME         |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | AI RESUME UNDERSTANDING|
                         +----------+-----------+
                                    |
          +---------+---------+------+-------+---------+
          |         |         |              |         |
          v         v         v              v         v
         ATS      HEALTH    SKILLS          RISK     CAREER
          |         |         |              |         |
          v         v         v              v         v
      Keywords  Formatting Hard Skills   Risk Score  Role Fit
      Job Match Grammar    Soft Skills   Signals     Salary
      ATS Fit   Impact     Missing       Gaps        Culture
                          Skills
          |         |         |              |         |
          +---------+---------+--------------+---------+
                                    |
                                    v
                         +----------------------+
                         | STRUCTURED ANALYSIS  |
                         +----------+-----------+
                                    |
                                    v
                         +----------------------+
                         | RECOMMENDATION ENGINE|
                         +----------+-----------+
                                    |
                                    v
                            RESUME IMPROVEMENT
```

---

# ATS Intelligence

Risk-Ume treats ATS analysis as one part of a larger resume intelligence system.

## ATS Dimensions

| Dimension               | Purpose                                |
| ----------------------- | -------------------------------------- |
| ATS Score               | Resume-job alignment                   |
| Resume Health           | Overall resume condition               |
| Formatting              | Structural quality                     |
| Quantified Achievements | Strength of measurable accomplishments |
| Grammar and Tone        | Writing quality                        |
| Salary Readiness        | Career-positioning signal              |
| Career Gap Risk         | Potential career-gap concern           |
| Culture Fit             | Organizational alignment signal        |
| Multi-Role Conflict     | Potential role-positioning conflict    |
| Missing Skills          | Skills expected but absent             |
| Missing Keywords        | Important terms not detected           |
| Hard Skills             | Technical capabilities                 |
| Soft Skills             | Professional capabilities              |
| Keyword Decay           | Potentially outdated terminology       |
| Hiring Manager Profile  | Human-review perspective               |
| Impact Prediction       | Potential impact of recommendations    |

---

# ATS Optimization Flow

```text
                  ORIGINAL RESUME
                         |
                         v
                  INITIAL SCAN
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       ATS SCORE     MISSING SKILLS  KEYWORDS
          |              |              |
          v              v              v
      WEAK AREAS     SKILL GAPS       MISMATCH
          |              |              |
          +--------------+--------------+
                         |
                         v
                AI RECOMMENDATIONS
                         |
             +-----------+-----------+
             |           |           |
             v           v           v
            ADD        REMOVE      REWRITE
             |           |           |
             +-----------+-----------+
                         |
                         v
                  OPTIMIZED RESUME
                         |
                         v
                     SECOND SCAN
                         |
                         v
                  BEFORE / AFTER
                         |
                         v
                    IMPROVEMENT
```

---

# Resume Health Framework

```text
                       +----------------------+
                       |    RESUME HEALTH     |
                       +----------+-----------+
                                  |
                     +------------+------------+
                     |            |            |
                     v            v            v
                  CONTENT     PRESENTATION  ROLE ALIGNMENT
                     |            |            |
                     v            v            v
                 Experience   Formatting     Keywords
                 Impact       Structure      Skills
                 Achievements Grammar        Job Match
                     |            |            |
                     +------------+------------+
                                  |
                                  v
                         OVERALL RESUME HEALTH
```

---

# Career Risk Engine

Risk-Ume contains a separate career-risk analysis layer.

The career-risk assessment considers information such as:

* Industry
* Target role
* Skills
* Experience
* Company status
* Total score
* Risk level

```text
                     +----------------------+
                     |    CAREER PROFILE    |
                     +----------+-----------+
                                |
              +-----------------+-----------------+
              |                 |                 |
              v                 v                 v
           INDUSTRY           ROLE            EXPERIENCE
              |                 |                 |
              +-----------------+-----------------+
                                |
                                v
                              SKILLS
                                |
                                v
                         COMPANY STATUS
                                |
                                v
                    +---------------------+
                    |   CAREER RISK       |
                    |      ENGINE         |
                    +----------+----------+
                               |
                               v
                        TOTAL RISK SCORE
                               |
                               v
                           RISK LEVEL
                               |
                               v
                        CAREER INSIGHTS
```

---

# Skill Intelligence

Risk-Ume analyzes skills from multiple perspectives.

```text
                      SKILL INTELLIGENCE
                             |
             +---------------+---------------+
             |               |               |
             v               v               v
        HARD SKILLS     SOFT SKILLS     MISSING SKILLS
             |               |               |
             +---------------+---------------+
                             |
                             v
                      KEYWORD ANALYSIS
                             |
                             v
                        KEYWORD DECAY
                             |
                             v
                      SKILL GAP ANALYSIS
                             |
                             v
                    CAREER RECOMMENDATIONS
```

The conceptual flow is:

```text
CURRENT SKILLS
      |
      v
REQUIRED SKILLS
      |
      v
SKILL GAP
      |
      v
CAREER RISK
      |
      v
RECOMMENDATION
      |
      v
IMPROVEMENT
```

---

# Hiring Manager Perspective

ATS systems and human reviewers evaluate resumes differently.

Risk-Ume includes a hiring-manager perspective to complement ATS analysis.

```text
                         RESUME
                            |
                            v
                      ATS ANALYSIS
                            |
                 +----------+----------+
                 |                     |
                 v                     v
             KEYWORDS             FORMATTING
                 |                     |
                 +----------+----------+
                            |
                            v
                    HUMAN EVALUATION
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
          RELEVANCE       IMPACT      POSITIONING
              |             |             |
              +-------------+-------------+
                            |
                            v
                 HIRING MANAGER PROFILE
```

---

# Recommendation Engine

Recommendations are structured around three main actions:

```text
                       ANALYSIS
                          |
             +------------+------------+
             |            |            |
             v            v            v
            ADD         REMOVE       REWRITE
             |            |            |
             +------------+------------+
                          |
                          v
                     IMPACT SCORE
                          |
                          v
                  PRIORITIZED ACTIONS
                          |
                          v
                   RESUME IMPROVEMENT
```

A recommendation can contain:

* Recommendation type
* Recommendation content
* Impact score
* Related assessment

---

# Resume Versioning

Risk-Ume supports iterative resume development.

```text
                  RESUME VERSION 1
                           |
                           v
                        ANALYSIS
                           |
                           v
                    RECOMMENDATIONS
                           |
                           v
                  RESUME VERSION 2
                           |
                           v
                        ANALYSIS
                           |
                           v
                    RECOMMENDATIONS
                           |
                           v
                  RESUME VERSION 3
                           |
                           v
                    VERSION COMPARE
                           |
                           v
                     PROGRESS TRACK
```

---

# Database Architecture

```text
                         +----------------+
                         |      USERS     |
                         +-------+--------+
                                 |
              +------------------+------------------+
              |                  |                  |
              v                  v                  v
     +----------------+ +----------------+ +----------------+
     | ATS ASSESSMENTS| | RISK ASSESSMENTS| | RESUME VERSIONS|
     +-------+--------+ +----------------+ +----------------+
             |
             v
     +---------------------+
     | ATS RECOMMENDATIONS |
     +---------------------+
```

## Users

```text
users
 |
 +-- id
 +-- name
 +-- email
 +-- password_hash
 +-- subscription_tier
 +-- created_at
 +-- last_login
```

## ATS Assessments

```text
ats_assessments
 |
 +-- id
 +-- user_id
 +-- resume_text
 +-- job_description
 +-- ats_score_before
 +-- ats_score_after
 +-- resume_health
 +-- interview_prob_before
 +-- interview_prob_after
 +-- formatting_score
 +-- quantified_achievements_score
 +-- grammar_tone_score
 +-- salary_readiness_score
 +-- career_gap_risk
 +-- culture_fit_score
 +-- multi_role_conflict
 +-- missing_skills
 +-- missing_keywords
 +-- hard_skills
 +-- soft_skills
 +-- keyword_decay
 +-- hiring_manager_profile
 +-- impact_prediction
 +-- created_at
```

## Recommendations

```text
ats_recommendations
 |
 +-- id
 +-- assessment_id
 +-- type
 +-- content
 +-- impact_score
```

## Risk Assessments

```text
risk_assessments
 |
 +-- id
 +-- user_id
 +-- industry
 +-- role
 +-- skills
 +-- experience
 +-- company_status
 +-- total_score
 +-- level
 +-- created_at
```

## Resume Versions

```text
resume_versions
 |
 +-- id
 +-- user_id
 +-- resume_json
 +-- ats_score
 +-- created_at
```

---

# Backend Architecture

```text
                         CLIENT
                           |
                           v
                  +-------------------+
                  |  REACT FRONTEND   |
                  +---------+---------+
                            |
                            v
                  +-------------------+
                  |   EXPRESS API     |
                  +---------+---------+
                            |
            +---------------+---------------+
            |               |               |
            v               v               v
       AUTH SYSTEM      ATS SYSTEM      RISK SYSTEM
            |               |               |
            +---------------+---------------+
                            |
                            v
                    +---------------+
                    |   AI SERVICE  |
                    +-------+-------+
                            |
                            v
                    +---------------+
                    |  GEMINI API   |
                    +-------+-------+
                            |
                            v
                    +---------------+
                    | STRUCTURED AI |
                    |    OUTPUT     |
                    +-------+-------+
                            |
                            v
                    +---------------+
                    |    SQLITE     |
                    |   DATABASE    |
                    +---------------+
```

---

# Authentication

Risk-Ume includes application-level authentication.

```text
                         USER
                           |
              +------------+------------+
              |                         |
              v                         v
          REGISTER                    LOGIN
              |                         |
              v                         v
       PASSWORD HASHING          PASSWORD VERIFY
              |                         |
              +------------+------------+
                           |
                           v
                          JWT
                           |
                           v
                 AUTHENTICATED REQUEST
                           |
                           v
                 PROTECTED API ROUTES
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
          ATS DATA      RISK DATA     VERSIONS
```

---

# API Architecture

| Endpoint              | Method | Purpose                         |
| --------------------- | ------ | ------------------------------- |
| `/api/auth/register`  | POST   | Create user                     |
| `/api/auth/login`     | POST   | Authenticate user               |
| `/api/auth/me`        | GET    | Retrieve authenticated user     |
| `/api/auth/upgrade`   | POST   | Change subscription tier        |
| `/api/ats/analyze`    | POST   | Store ATS analysis              |
| `/api/ats/history`    | GET    | Retrieve ATS history            |
| `/api/resume/version` | POST   | Save resume version             |
| `/api/risk/save`      | POST   | Save career-risk assessment     |
| `/api/dashboard`      | GET    | Retrieve dashboard intelligence |

---

# Dashboard and Analytics

The dashboard brings the stored intelligence together.

```text
                         DASHBOARD
                             |
        +--------------------+--------------------+
        |                    |                    |
        v                    v                    v
    ATS ANALYTICS       CAREER RISK         RESUME DATA
        |                    |                    |
        +--------------------+--------------------+
                             |
                             v
                    CAREER INTELLIGENCE
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
      SKILL TRENDS      BENCHMARKING       ROLE DEMAND
          |                  |                  |
          +------------------+------------------+
                             |
                             v
                      RECOMMENDATIONS
```

---

# Dashboard Visualization Concepts

## ATS Improvement

```text
ATS SCORE

Before        [###############.....]
After         [###################.]
```

## Resume Health

```text
FORMATTING             [#################...]
ACHIEVEMENTS           [###############.....]
GRAMMAR AND TONE       [##################..]
SALARY READINESS       [############........]
CULTURE FIT            [###############.....]
```

## Skill Gap

```text
SKILL                 CURRENT       REQUIRED       GAP

Python                ##########    ##########      0
Docker                #######       ##########      3
Cloud                 ######        ##########      4
Kubernetes            ####          ##########      6
System Design         ###           ##########      7
```

## Career Risk

```text
RISK CATEGORY

Skill Risk             [###########.........]
Role Risk              [#######.............]
Experience Risk        [#########...........]
Market Risk            [######..............]
Career Gap Risk        [###########.........]
```

These are visualization concepts for the application. They are not claims of statistically validated model performance.

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Recharts
* Motion
* Lucide React

## Backend

* Node.js
* Express
* TypeScript
* SQLite
* better-sqlite3
* JWT
* bcryptjs

## AI

* Google Gemini API
* AI-driven resume analysis
* Structured AI responses
* Career intelligence

## Development

* Git
* GitHub
* npm
* Vite
* TypeScript

---

# Technology Architecture

```text
                         RISK-UME
                            |
             +--------------+--------------+
             |                             |
             v                             v
        FRONTEND                        BACKEND
             |                             |
       +-----+-----+                +------+------+
       |     |     |                |      |      |
       v     v     v                v      v      v
     React Vite  TS             Express SQLite  JWT
       |                             |
       v                             v
    Tailwind                      AI Layer
    Recharts                         |
    Motion                           v
                               Gemini API
```

---

# Project Structure

```text
Risk-Ume/
|
+-- src/
|   |
|   +-- components/
|   +-- pages/
|   +-- services/
|   +-- hooks/
|   +-- types/
|   +-- main.tsx
|
+-- server.ts
+-- index.html
+-- package.json
+-- package-lock.json
+-- tsconfig.json
+-- vite.config.ts
+-- .env.example
+-- .gitignore
+-- README.md
```

---

# Data Flow

```text
USER
  |
  v
RESUME + TARGET JOB
  |
  v
FRONTEND
  |
  v
EXPRESS BACKEND
  |
  +----------------------+
  |                      |
  v                      v
AUTHENTICATION       AI PROCESSING
                         |
                         v
                    GEMINI API
                         |
                         v
                STRUCTURED ANALYSIS
                         |
            +------------+------------+
            |            |            |
            v            v            v
           ATS         SKILLS         RISK
            |            |            |
            +------------+------------+
                         |
                         v
                  RECOMMENDATIONS
                         |
                         v
                   RESUME CHANGES
                         |
                         v
                      RE-ANALYSIS
                         |
                         v
                    BEFORE / AFTER
                         |
                         v
                      DATABASE
                         |
                         v
                      DASHBOARD
                         |
                         v
                    CAREER INSIGHTS
```

---

# Optimization Loop

```text
                 +----------------+
                 | UPLOAD RESUME  |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 |    ANALYZE     |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | IDENTIFY RISKS |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | FIND SKILL GAPS|
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | FIND KEYWORDS  |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | RECOMMENDATIONS|
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | IMPROVE RESUME |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 |  RE-ANALYZE    |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | BEFORE / AFTER |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | SAVE VERSION   |
                 +-------+--------+
                         |
                         v
                 +----------------+
                 | TRACK PROGRESS |
                 +-------+--------+
                         |
                         +--------------------> ANALYZE AGAIN
```

---

# Installation

## Requirements

* Node.js
* npm
* Gemini API key

## Clone

```bash
git clone <repository-url>
cd Risk-Ume
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create the required environment configuration:

```env
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secure_secret
```

Never commit API keys, passwords or secrets to GitHub.

---

# Development

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

---

# Engineering Principles

## 1. Multidimensional Analysis

Resume quality should not be represented by one metric.

## 2. Structured AI Output

AI-generated information is transformed into structured application data.

## 3. Persistent Intelligence

Assessments, recommendations, risks and resume versions can be stored.

## 4. Iterative Optimization

Users can analyze, improve, re-analyze and compare.

## 5. Actionable Feedback

The objective is not only to identify problems but to suggest improvements.

## 6. Career-Oriented Thinking

Risk-Ume attempts to connect resumes, skills, roles and career risks.

---

# Development Roadmap

## Foundation

* [x] React frontend
* [x] TypeScript
* [x] Express backend
* [x] SQLite database
* [x] Authentication
* [x] AI integration

## ATS Intelligence

* [x] ATS scoring
* [x] Resume health
* [x] Before / after analysis
* [x] Missing skills
* [x] Missing keywords
* [x] Hard skills
* [x] Soft skills
* [x] Grammar and tone
* [x] Formatting
* [x] Quantified achievements
* [x] Recommendations
* [x] Recommendation impact

## Career Intelligence

* [x] Career-risk assessment
* [x] Role analysis
* [x] Skill analysis
* [x] Keyword decay
* [x] Hiring-manager profiling
* [x] Interview-readiness signals
* [x] Salary readiness
* [x] Culture fit
* [x] Multi-role conflict analysis

## Product Layer

* [x] Authentication
* [x] Persistent assessments
* [x] Resume versions
* [x] Dashboard
* [x] Career benchmarking
* [x] Skill trends

## Future

* [ ] Robust evaluation datasets
* [ ] Model benchmarking
* [ ] Automated evaluation pipeline
* [ ] Industry-specific models
* [ ] Job-market data integration
* [ ] Personalized learning roadmap
* [ ] Longitudinal skill tracking
* [ ] Improved explainability
* [ ] Automated testing
* [ ] CI/CD
* [ ] Production monitoring
* [ ] Scalable production database

---

# Current Limitations

Risk-Ume is an actively developing project.

Some analytical values should currently be treated as AI-generated or application-level indicators rather than statistically validated predictions.

This is especially important for:

* Career risk
* Interview probability
* Salary readiness
* Culture fit
* Market-related signals

Future development should include:

```text
Real-World Data
      |
      v
Evaluation Dataset
      |
      v
Model Benchmarking
      |
      v
Calibration
      |
      v
Validation
      |
      v
More Reliable Predictions
```

---

# Security

The application includes:

* Password hashing
* JWT authentication
* Protected API routes
* User-specific records
* Environment-based API configuration

For production deployment, additional security hardening would be required:

* Rate limiting
* Secure secret management
* Input validation
* API abuse protection
* Logging
* Monitoring
* Production database security
* Secure deployment configuration

---

# What I Learned

Risk-Ume was built as a practical learning project to understand how an AI idea can become a complete software system.

The project required learning across:

```text
Frontend Development
        |
        v
Backend Development
        |
        v
REST APIs
        |
        v
Database Design
        |
        v
Authentication
        |
        v
AI Integration
        |
        v
Data Modeling
        |
        v
Analytics
        |
        v
Product Design
        |
        v
Deployment
```

The biggest lesson was that building an AI product is not only about connecting an API to a model.

It also requires:

* User experience
* Backend architecture
* Database design
* Authentication
* Data persistence
* Structured AI output
* Analytics
* Visualization
* Error handling
* Evaluation
* Security
* Deployment

---

# Why Risk-Ume?

Most resume tools primarily answer:

> "How good is my resume?"

Risk-Ume attempts to answer:

> "Where is my resume vulnerable, why is it vulnerable, what skills am I missing, and what should I improve?"

The central idea is:

```text
Resume Scoring
      |
      v
Resume Intelligence
      |
      v
Career Risk
      |
      v
Skill Intelligence
      |
      v
Recommendations
      |
      v
Optimization
      |
      v
Continuous Improvement
```

---

# Future Vision

The long-term goal is to evolve Risk-Ume from a resume analyzer into a broader career intelligence system.

```text
                         CAREER INTELLIGENCE
                                  |
             +--------------------+--------------------+
             |                    |                    |
             v                    v                    v
          RESUME                SKILLS               ROLES
             |                    |                    |
             v                    v                    v
            ATS                  GAPS                 DEMAND
             |                    |                    |
             +--------------------+--------------------+
                                  |
                                  v
                           CAREER RISK
                                  |
                                  v
                         RECOMMENDATIONS
                                  |
                                  v
                         LEARNING ROADMAP
                                  |
                                  v
                         CAREER PROGRESS
```

The long-term direction is:

```text
RESUME
   |
   v
SKILLS
   |
   v
TARGET ROLES
   |
   v
MARKET REQUIREMENTS
   |
   v
SKILL GAPS
   |
   v
CAREER RISKS
   |
   v
RECOMMENDATIONS
   |
   v
LEARNING
   |
   v
IMPROVED RESUME
   |
   v
NEW ANALYSIS
```

---

# Project Status

## Development Scope

```text
Frontend
[####################] Active

Backend
[####################] Active

Database
[####################] Active

Authentication
[####################] Active

ATS Analysis
[####################] Implemented

Risk Engine
[##################..] Active Development

AI Evaluation
[###########.........] Improving

Production Readiness
[########............] Future Work
```

These indicators represent development scope and are not claims of model accuracy.

---

# Final Architecture

The entire idea of Risk-Ume can be summarized as:

```text
                         +----------------+
                         |     RESUME     |
                         +-------+--------+
                                 |
                                 v
                       +-------------------+
                       |    TARGET ROLE    |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |    RISK-UME APP   |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |    AI ANALYSIS    |
                       +---------+---------+
                                 |
              +------------------+------------------+
              |                  |                  |
              v                  v                  v
         +---------+        +---------+        +---------+
         |   ATS   |        |  SKILL  |        |  RISK   |
         +----+----+        +----+----+        +----+----+
              |                  |                  |
              +------------------+------------------+
                                 |
                                 v
                       +-------------------+
                       | RECOMMENDATIONS   |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       | RESUME OPTIMIZE   |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |   RE-ANALYSIS     |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |   BEFORE / AFTER  |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |     DASHBOARD     |
                       +---------+---------+
                                 |
                                 v
                       +-------------------+
                       |  CAREER INSIGHTS  |
                       +---------+---------+
                                 |
                                 +------------------+
                                                    |
                                                    v
                                               NEW RESUME
                                                    |
                                                    +----> REPEAT
```

---

# Risk-Ume

### Resume Intelligence → Career Risk → Skill Intelligence → Optimization → Continuous Improvement

---

# Author

## Divyansh Bhardwaj

First-year engineering student exploring:

* Artificial Intelligence
* Machine Learning
* Generative AI
* Full-Stack Development
* Data Analytics
* Software Engineering

Risk-Ume is one of my major learning projects and an attempt to build an AI product around a practical problem.

The project is still evolving, and the current implementation is a foundation for future improvements.

> Not finished. Not perfect. Still learning. Still building.

