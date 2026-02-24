import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import path from "path";
import { createVectorStore } from "./vectorstore";
import { config } from "../config";

export async function ingestDocuments() {

    console.log("PDF LOADING...");

    const filePath = path.join(process.cwd(), "document/document.pdf")
    const loader = new PDFLoader(filePath)
    
    const docs = await loader.load();

    console.log("PDF CHUNKING...");

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: config.chunkSize,
        chunkOverlap: config.chunkOverlap,
    });
    
    const splits = await splitter.splitDocuments(docs);


    console.log("EMBEDDINGS CREATION... AND SAVE IN QDRANT VECTOR STORE...");

    const { embeddings } = await createVectorStore();

    await QdrantVectorStore.fromDocuments(
        splits,
        embeddings,
        {
            url: config.qdrantUrl,
            collectionName: config.qdrantCollection,
        }
    );

    console.log("DOCS INGESTED");
}
ingestDocuments();

