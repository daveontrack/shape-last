import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user?.id)
    .single()

  const firstName = profile?.first_name || ""
  const lastName = profile?.last_name || ""
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || ""

  const greeting = fullName ? `Welcome back, ${fullName}!` : "Welcome to your Dashboard!"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-bold text-foreground">{greeting}</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings from here.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/dashboard/profile" className="group">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="mt-4">Profile</CardTitle>
              <CardDescription>
                View and edit your personal information including name, email, and profile picture.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/settings" className="group">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="mt-4">Settings</CardTitle>
              <CardDescription>
                Manage your account settings including password, security options, and preferences.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Account Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{fullName || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-muted-foreground">Account Created</span>
              <span className="font-medium">
                {user?.created_at 
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })
                  : "Unknown"
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
