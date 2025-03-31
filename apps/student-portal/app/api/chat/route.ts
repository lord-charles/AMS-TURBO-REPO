import { OpenAIStream, StreamingTextResponse } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Example system prompt - customize this for your use case
    const systemPrompt = `
      You are an intelligent AI assistant for a data analytics dashboard. 
      Provide concise, helpful responses about dashboard features, data analysis, 
      and suggestions for improvement. You can explain metrics, suggest optimizations, 
      and help the user understand their data. Be professional but conversational.
      
      The dashboard contains:
      - Revenue metrics
      - User engagement statistics 
      - Project management tools
      - Activity feeds
      - Performance charts
      
      When appropriate, suggest specific actions the user can take to improve their metrics or workflow.
    `

    // Generate a response with OpenAI
    const response = await openai("gpt-4o").chat({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    })

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)

    // Return a StreamingTextResponse, which sets the correct headers
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(JSON.stringify({ error: "There was an error processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

