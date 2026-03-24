import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HandHeart, Calendar, Clock, CheckCircle, XCircle, Hourglass } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Volunteer Status | SHAPEthiopia",
  description: "View your volunteer applications and status with SHAPEthiopia.",
}

const statusConfig = {
  pending: { 
    label: "Pending Review", 
    icon: Hourglass, 
    color: "bg-accent/10 text-accent-foreground",
    description: "Your application is being reviewed by our team."
  },
  approved: { 
    label: "Approved", 
    icon: CheckCircle, 
    color: "bg-success/10 text-success",
    description: "Congratulations! Your application has been approved."
  },
  rejected: { 
    label: "Not Accepted", 
    icon: XCircle, 
    color: "bg-destructive/10 text-destructive",
    description: "Unfortunately, we couldn't accept your application at this time."
  },
  active: { 
    label: "Active Volunteer", 
    icon: HandHeart, 
    color: "bg-primary/10 text-primary",
    description: "You're an active volunteer. Thank you for your service!"
  },
  inactive: { 
    label: "Inactive", 
    icon: Clock, 
    color: "bg-muted text-muted-foreground",
    description: "Your volunteer status is currently inactive."
  },
}

export default async function VolunteerStatusPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: applications } = await supabase
    .from("volunteer_applications")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  const activeApplication = applications?.find(a => a.status === "active" || a.status === "approved")

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Volunteer Status</h1>
          <p className="text-muted-foreground mt-2">
            Track your volunteer applications and status
          </p>
        </div>
        {!activeApplication && (
          <Button asChild>
            <Link href="/volunteer">Apply to Volunteer</Link>
          </Button>
        )}
      </div>

      {/* Current Status */}
      {activeApplication && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Active Volunteer</CardTitle>
                <CardDescription>
                  Thank you for being part of the SHAPEthiopia family!
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Availability</p>
                <p className="font-medium capitalize">{activeApplication.availability || "Flexible"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hours per Week</p>
                <p className="font-medium">{activeApplication.hours_per_week || "As needed"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeApplication.skills?.map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  )) || <span className="text-muted-foreground">Not specified</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {new Date(activeApplication.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications History */}
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>All your volunteer applications</CardDescription>
        </CardHeader>
        <CardContent>
          {!applications || applications.length === 0 ? (
            <div className="text-center py-12">
              <HandHeart className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No applications yet</h3>
              <p className="mt-2 text-muted-foreground">
                Join our volunteer team and make a direct impact in communities.
              </p>
              <Button asChild className="mt-4">
                <Link href="/volunteer">Apply Now</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const status = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.pending
                const StatusIcon = status.icon
                
                return (
                  <div 
                    key={app.id} 
                    className="p-4 bg-muted/50 rounded-lg space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${status.color} flex items-center justify-center`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{app.first_name} {app.last_name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>Applied {new Date(app.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={status.color}>
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground pl-13">
                      {status.description}
                    </p>
                    {app.preferred_programs && app.preferred_programs.length > 0 && (
                      <div className="pl-13">
                        <p className="text-xs text-muted-foreground mb-1">Preferred Programs:</p>
                        <div className="flex flex-wrap gap-1">
                          {app.preferred_programs.map((program: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {app.reviewed_at && (
                      <p className="text-xs text-muted-foreground pl-13">
                        Reviewed on {new Date(app.reviewed_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
