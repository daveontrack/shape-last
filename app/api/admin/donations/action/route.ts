import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { donation_id, action, admin_notes } = body

    if (!donation_id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Use 'approve' or 'reject'" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { error: "Only admins can approve donations" },
        { status: 403 }
      )
    }

    // Update donation status
    const status = action === "approve" ? "confirmed" : "failed"
    const updateData: any = {
      payment_status: status,
      admin_notes: admin_notes || null,
      confirmed_at: new Date().toISOString(),
      confirmed_by: user.id,
    }

    const { data, error } = await supabase
      .from("donations")
      .update(updateData)
      .eq("id", donation_id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating donation:", error)
      return NextResponse.json(
        { error: "Failed to update donation" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Donation ${action}ed successfully`,
      donation: data,
    })

  } catch (error) {
    console.error("[v0] Admin action error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
