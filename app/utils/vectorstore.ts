import { OllamaEmbeddings } from "@langchain/ollama"
import { QdrantVectorStore } from "@langchain/qdrant"
import { QdrantClient } from "@qdrant/js-client-rest"
import { config } from "../config"
import { ingestDocuments } from "./ingest"

export async function ensureVectorStore() {
  const client = new QdrantClient({ url: config.qdrantUrl })

  const collections = await client.getCollections()

  const exists = collections.collections.some(
    (c) => c.name === config.qdrantCollection
  )

  const embeddings = new OllamaEmbeddings({
    model: config.embeddingModel,
    baseUrl: config.ollamaBaseUrl,
  })


  if (!exists) {
    console.log("Collection not found → ingesting docs...")
    await ingestDocuments()
  }

  return QdrantVectorStore.fromExistingCollection(embeddings, {
    url: config.qdrantUrl,
    collectionName: config.qdrantCollection,
  })
}

export async function createVectorStore() { 
    const embeddings = new OllamaEmbeddings(
        {
            model: config.embeddingModel,
            baseUrl: config.ollamaBaseUrl,
        }
    );    
    
    return { embeddings } 
}