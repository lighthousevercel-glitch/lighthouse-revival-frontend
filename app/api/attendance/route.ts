export const runtime = "edge"
import { type NextRequest, NextResponse } from "next/server"
import { getAttendanceService, recordAttendanceService } from "@/lib/services/attendance-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const churchId = searchParams.get("churchId") || "1"
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const serviceType = searchParams.get("serviceType") || "all"

    const attendance = await getAttendanceService({
      churchId: Number.parseInt(churchId),
      // startDate,
      // endDate,
      serviceType: serviceType === "all" ? undefined : serviceType,
    })

    return NextResponse.json({ success: true, data: attendance })
  } catch (error) {
    console.error("Error fetching attendance:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch attendance" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const attendance = await recordAttendanceService(body)

    return NextResponse.json({ success: true, data: attendance }, { status: 201 })
  } catch (error) {
    console.error("Error recording attendance:", error)
    return NextResponse.json({ success: false, error: "Failed to record attendance" }, { status: 500 })
  }
}
