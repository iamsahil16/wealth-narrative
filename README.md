# Wealth Narrative — RAG on *The Psychology of Money*

## Project Overview

**Wealth Narrative** is a Retrieval-Augmented Generation (RAG) system built on the book *The Psychology of Money* by Morgan Housel.

The application allows users to ask questions about money, wealth, investing mindset, and behavioral finance while ensuring that responses are grounded in the ideas and principles from the book itself.

Wealth Narrative transforms a finance book into an interactive conversational knowledge system focused on financial psychology rather than generic finance advice.

---

## Key Features

* **Book-Grounded Answers:** Responses are generated using the knowledge base derived from *The Psychology of Money*.
* **Conversational Finance Learning:** Discuss wealth, money habits, risk, compounding, luck, and long-term thinking.
* **Semantic Retrieval:** Meaning-based retrieval fetches the most relevant passages from the book.
* **Context Injection:** Retrieved context is injected into the prompt to produce grounded responses.
* **Streaming Chat Experience:** Real-time conversational interface for exploring finance concepts.
* **Focused Knowledge Base:** System currently works on a pre-processed single book knowledge base.

---

## Technical Architecture

### Frontend

* **Framework:** Next.js (App Router) + TypeScript
* **UI:** Tailwind CSS (finance themed UI)
* **Experience:** Chat interface with streaming responses

### Backend / RAG Layer

* **Runtime:** Node.js (Bun compatible)
* **RAG Stack:** LangChain orchestration
* **Embeddings:** Ollama embedding models
* **Vector Database:** Qdrant
* **LLM:** Ollama chat models for grounded generation

---

## RAG Pipeline Flow

1. Book content is pre-processed into text chunks.
2. Chunks are converted into embeddings.
3. Embeddings are stored in the vector database.
4. During chat:

   * User question is embedded
   * Relevant book passages are retrieved
   * Context is injected into the prompt
   * LLM generates a grounded answer

---

## Example Use Cases

* Learn wealth-building mindset principles
* Understand behavioral finance concepts
* Explore investing psychology
* Ask conceptual questions about money
* Build finance education assistants

---

## Getting Started

This is a Next.js project bootstrapped with **create-next-app**.

### Run the development server

```bash
bun install
bun dev
```

Open **http://localhost:3000** with your browser to see the result.

You can start editing the page by modifying:

```
app/page.tsx
```

The page auto-updates as you edit the file.

This project uses **next/font** to automatically optimize and load Geist, a font family by Vercel.

---

## Learn More

To learn more about Next.js:

* Next.js Documentation — learn about Next.js features and API
* Learn Next.js — interactive tutorial
* Next.js GitHub repository — feedback and contributions welcome

---

## Deployment

The easiest way to deploy this app is using **Vercel**.

Refer to the official Next.js deployment documentation for more details.

---

## Why This Project Matters

Most finance knowledge is behavioral rather than mathematical. Wealth Narrative demonstrates how RAG can convert long-form finance literature into an interactive reasoning system that helps users internalize financial thinking instead of passively reading.
