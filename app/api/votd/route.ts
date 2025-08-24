import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://www.biblegateway.com/votd/get/?format=json&version=NIV",
      { cache: "no-store" } // always fresh
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Verse of the Day" },
      { status: 500 }
    )
  }
}
