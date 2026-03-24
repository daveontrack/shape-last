import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const campaign = searchParams.get("campaign")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

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
        { error: "Only admins can view donations" },
        { status: 403 }
      )
    }

    // Build query
    let query = supabase
      .from("donations")
      .select("*", { count: "exact" })

    // Apply filters
    if (status) {
      query = query.eq("payment_status", status)
    }

    if (campaign) {
      query = query.eq("program", campaign)
    }

    if (search) {
      query = query.or(`donor_name.ilike.%${search}%,donor_phone.ilike.%${search}%,transaction_id.ilike.%${search}%`)
    }

    // Apply pagination
    query = query.order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error("[v0] Error fetching donations:", error)
      return NextResponse.json(
        { error: "Failed to fetch donations" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      donations: data || [],
      total: count || 0,
      limit,
      offset,
    })

  } catch (error) {
    console.error("[v0] Fetch donations error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
