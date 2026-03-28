import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNavbar } from "@/components/dashboard/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      <DashboardNavbar user={user} profile={profile} />
      <main className="flex-1">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
