export const runtime = "edge"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby--yy8gE_yGPXUEdBg1f1B6HSt5N3kdvTHIZKIwUaH4MJJy9vcZ2uafB0pmyycR4mj/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
