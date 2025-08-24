export const runtime = "edge"
import { type NextRequest, NextResponse } from "next/server"
import { getMemberByIdService, updateMemberService, deleteMemberService } from "@/lib/services/members-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const member = await getMemberByIdService(Number.parseInt(params.id))

    if (!member) {
      return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: member })
  } catch (error) {
    console.error("Error fetching member:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch member" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const member = await updateMemberService(Number.parseInt(params.id), body)

    return NextResponse.json({ success: true, data: member })
  } catch (error) {
    console.error("Error updating member:", error)
    return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteMemberService(Number.parseInt(params.id))

    return NextResponse.json({ success: true, message: "Member deleted successfully" })
  } catch (error) {
    console.error("Error deleting member:", error)
    return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 })
  }
}
