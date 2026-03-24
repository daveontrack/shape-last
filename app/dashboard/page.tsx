import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, HandHeart, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's donations
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  // Get user's volunteer applications
  const { data: volunteerApps } = await supabase
    .from("volunteer_applications")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  const totalDonations = donations?.reduce((sum, d) => sum + (d.payment_status === "completed" ? Number(d.amount) : 0), 0) || 0
  const pendingDonations = donations?.filter(d => d.payment_status === "pending").length || 0
  const activeVolunteerApps = volunteerApps?.filter(v => v.status === "active" || v.status === "approved").length || 0
  const pendingVolunteerApps = volunteerApps?.filter(v => v.status === "pending").length || 0

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name")
    .eq("id", user?.id)
    .single()

  const greeting = profile?.first_name ? `Welcome back, ${profile.first_name}!` : "Welcome to your Dashboard!"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{greeting}</h1>
        <p className="text-muted-foreground mt-2">
          Track your contributions and engagement with SHAPEthiopia
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime contributions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Donations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDonations}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteer Status</CardTitle>
            <HandHeart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVolunteerApps}</div>
            <p className="text-xs text-muted-foreground">
              Active programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVolunteerApps}</div>
            <p className="text-xs text-muted-foreground">
              Under review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>
              Support our programs and help transform lives in Ethiopia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Become a Volunteer</CardTitle>
            <CardDescription>
              Join our team and make a direct impact in communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/volunteer">Apply to Volunteer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest donations and volunteer activity</CardDescription>
        </CardHeader>
        <CardContent>
          {(donations?.length || 0) + (volunteerApps?.length || 0) === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No activity yet. Start by making a donation or applying to volunteer!
            </p>
          ) : (
            <div className="space-y-4">
              {donations?.slice(0, 3).map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Donation - ${donation.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    donation.payment_status === "completed" 
                      ? "bg-success/10 text-success" 
                      : "bg-accent/10 text-accent-foreground"
                  }`}>
                    {donation.payment_status}
                  </span>
                </div>
              ))}
              {volunteerApps?.slice(0, 3).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <HandHeart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Volunteer Application</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === "approved" || app.status === "active"
                      ? "bg-success/10 text-success" 
                      : app.status === "rejected"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-accent/10 text-accent-foreground"
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
