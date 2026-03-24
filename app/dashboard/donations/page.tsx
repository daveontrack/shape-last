import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, CreditCard, TrendingUp, Heart } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "My Donations | SHAPEthiopia",
  description: "View your donation history and track your contributions to SHAPEthiopia.",
}

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  stripe: "Card",
}

const causeLabels: Record<string, string> = {
  education: "Education",
  water: "Clean Water",
  women: "Women Empowerment",
  community: "Community Development",
}

export default async function DonationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  // Calculate stats - include confirmed donations for Ethiopian payment methods
  const completedDonations = donations?.filter(d => 
    d.payment_status === "completed" || d.payment_status === "confirmed"
  ) || []
  
  const totalDonatedETB = completedDonations
    .filter(d => d.currency !== "USD")
    .reduce((sum, d) => sum + Number(d.amount), 0)
  
  const totalDonatedUSD = completedDonations
    .filter(d => d.currency === "USD")
    .reduce((sum, d) => sum + Number(d.amount), 0)
  
  const totalDonations = completedDonations.length
  const pendingDonations = donations?.filter(d => d.payment_status === "pending").length || 0

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">My Donations</h1>
          <p className="text-muted-foreground mt-2">
            Track your contributions and donation history
          </p>
        </div>
        <Button asChild>
          <Link href="/donate">Make a Donation</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated (ETB)</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonatedETB.toLocaleString()} ETB</div>
            {totalDonatedUSD > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                + ${totalDonatedUSD.toFixed(2)} USD
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDonations}</div>
            {pendingDonations > 0 && (
              <p className="text-xs text-amber-600 mt-1">
                {pendingDonations} pending verification
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalDonations > 0 
                ? `${Math.round(totalDonatedETB / totalDonations).toLocaleString()} ETB`
                : "0 ETB"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {totalDonations > 0 ? "Active" : "Start Now"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Donor since {donations?.[donations.length - 1]?.created_at 
                ? new Date(donations[donations.length - 1].created_at).getFullYear()
                : new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Donation History */}
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>A complete list of all your donations</CardDescription>
        </CardHeader>
        <CardContent>
          {!donations || donations.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No donations yet</h3>
              <p className="mt-2 text-muted-foreground">
                Make your first donation to help transform lives in Ethiopia.
              </p>
              <Button asChild className="mt-4">
                <Link href="/donate">Donate Now</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => {
                const isETB = donation.currency !== "USD"
                const statusColors: Record<string, string> = {
                  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                  confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                }
                
                return (
                  <div 
                    key={donation.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {isETB 
                            ? `${Number(donation.amount).toLocaleString()} ETB`
                            : `$${Number(donation.amount).toFixed(2)}`}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(donation.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {donation.program && (
                            <Badge variant="secondary" className="text-xs">
                              {causeLabels[donation.program] || donation.program}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {paymentMethodLabels[donation.payment_method] || donation.payment_method || "N/A"}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                        statusColors[donation.payment_status] || statusColors.pending
                      }`}>
                        {donation.payment_status === "confirmed" ? "Completed" : donation.payment_status}
                      </span>
                    </div>
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
