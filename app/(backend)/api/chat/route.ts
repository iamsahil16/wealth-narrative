import { NextRequest, NextResponse } from "next/server"
import { chat } from "../../../services/chat"



interface IChatInput {
    question: string
}

interface IChatOutput {
    response: string
}


export async function POST(req: NextRequest) {
    try {
        const body: IChatInput = await req.json();

        if(!body?.question) {
            return NextResponse.json(
                {
                    error: "no question in input",
                    status: 400 
                }
            )
        }



        const answer = await chat(body.question);

        const output: IChatOutput = {
            response: answer
        }

        return NextResponse.json(output);
    } catch (error) {
        console.error("Chat route error:", error)

        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
        )
    }  
}