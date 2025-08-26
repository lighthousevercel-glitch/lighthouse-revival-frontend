import { NextResponse } from "next/server"

const YOUTUBE_API_KEY = "AIzaSyBt39vZRR3N83zfjLH09v_u0paFiPcfCkc"
const CHANNEL_ID = "UCCgdli3dXzlsLKsUgx6UGTA"

export async function GET() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`
    )
    const data = await response.json()

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      live:
        item.snippet.liveBroadcastContent === "live" ||
        item.snippet.liveBroadcastContent === "upcoming",
    }))

    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch YouTube videos" }, { status: 500 })
  }
}
