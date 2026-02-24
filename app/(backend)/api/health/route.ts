import { NextResponse } from "next/server"


export async function GET() {
    return NextResponse.json(
        {
            message: "healty",
            status: 200
        }
    )
}