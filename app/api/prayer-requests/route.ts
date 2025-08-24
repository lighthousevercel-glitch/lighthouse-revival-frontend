export const runtime = "edge"
import { type NextRequest, NextResponse } from "next/server"
import { getPrayerRequestsService, createPrayerRequestService } from "@/lib/services/prayer-requests-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const churchId = searchParams.get("churchId") || "1"
    const status = searchParams.get("status") || "all"
    const category = searchParams.get("category") || "all"

    const prayerRequests = await getPrayerRequestsService({
      churchId: Number.parseInt(churchId),
      status: status === "all" ? undefined : status,
      category: category === "all" ? undefined : category,
    })

    return NextResponse.json({ success: true, data: prayerRequests })
  } catch (error) {
    console.error("Error fetching prayer requests:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch prayer requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const prayerRequest = await createPrayerRequestService(body)

    return NextResponse.json({ success: true, data: prayerRequest }, { status: 201 })
  } catch (error) {
    console.error("Error creating prayer request:", error)
    return NextResponse.json({ success: false, error: "Failed to create prayer request" }, { status: 500 })
  }
}
