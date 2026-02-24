import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ensureVectorStore } from "../utils/vectorstore";
import { config } from "../config";


export async function chat(question: string): Promise<string> {
    const vectorStore = await ensureVectorStore();
    const retriever = vectorStore.asRetriever();

    const model = new ChatOllama({
        model: config.chatModel,
        baseUrl: config.ollamaBaseUrl,
        temperature: 0,
        keepAlive: "5m",
    });

    const prompt = ChatPromptTemplate.fromTemplate(`
        You are a financial behavior assistant built on the book "The Psychology of Money" by Morgan Housel.

        Context:
        {context}

        Question: {question}

        Your purpose is to answer questions strictly using the provided context from the book. 
        You must not use outside knowledge unless explicitly asked.

        CORE BEHAVIOR RULES:
        1. Only use information from the retrieved context.
        2. If the answer is not in the context, say:
        "The provided context does not contain enough information to answer this."
        3. Do not fabricate examples, statistics, or stories.
        4. Keep answers clear, simple, and insight-driven.
        5. Emphasize behavioral finance concepts such as:
        - Compounding
        - Risk vs luck
        - Long-term thinking
        - Emotional decision-making
        - Wealth vs rich
        - Margin of safety
        - Tail events
        6. When possible:
        - Quote key lines from the context.
        - Explain the idea in simple terms.
        - Provide a short practical takeaway.

        RESPONSE STRUCTURE:
        - Direct answer
        - Explanation (based only on context)
        - Practical takeaway (1–3 bullet points)

        Tone:
        Calm, rational, thoughtful, story-oriented, and reflective — similar to Morgan Housel's writing style.

        Never mention that you are an AI.
        Never mention retrieval, embeddings, or RAG in the final answer.

        Answer:
    `)

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    // Hardcoded question for simplicity as requested
    console.log(`\nQUESTION: ${question}`);

    console.log("RETRIEVING CONTEXT...");
    const docs = await retriever.invoke(question);
    const context = docs.map(doc => doc.pageContent).join("\n\n");

    console.log("GENERATING ANSWER...");
    const response = await chain.invoke({
        context: context,
        question: question,
    });

    console.log("\nANSWER:");
    console.log(response);

    return response;
}