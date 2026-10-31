# KaagazSaathi 📄✅

> **An AI-assisted paperwork co-pilot** that checks your documents against a government service's published requirements — *before you apply.*

**Build for Bharat 2026 · Software Track** | KIET Deemed to be University

---

## The Problem
One small mismatch (e.g., "ASHA KUMARI" vs "ASHA KUMAR") can stall a government service application. Citizens discover missing or inconsistent documents only at the counter, causing avoidable delays and extra trips.

## The Solution
KaagazSaathi performs **cross-document consistency checks** and **completeness validation** against a deterministic, human-verified rules engine — giving citizens an evidence-backed readiness report *before they visit*.

## Core Features
- 🔍 **Cross-document consistency** — same field compared across every uploaded document
- 🔤 **Name normalization & transliteration** — handles spellings, initials, and script variants
- 📋 **Requirement-aware validation** — rules tied to the chosen government service
- 📎 **Evidence citations** — each flag names the field and links to the official source
- 🤔 **Uncertainty handling** — low-confidence results sent for human review
- 🔒 **Privacy by design** — raw documents processed on-device (browser OCR); server stores rules, not documents

## Tech Stack (MERN)
| Layer | Technology |
|-------|-----------|
| Frontend | React + plain CSS (blue/white theme) |
| Backend | Node.js + Express |
| Database | MongoDB (rules & service catalogue only) |
| OCR | Tesseract.js (in-browser) |
| Matching | Custom normalization + transliteration utilities |

## Team
| Member | Branch |
|--------|--------|
| Ayush Gupta | CS |
| Jahnvi Gupta | CS |
| Deepanshu Moudgil | CS |
| Krishna Agarwal | CSIT |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in MONGO_URI
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000`, API at `http://localhost:5000`.
