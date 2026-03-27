"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, User } from "lucide-react"

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  country: string | null
  avatar_url: string | null
}

interface UserMetadata {
  avatar_url?: string
  picture?: string
  full_name?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState("")
  const [oauthAvatarUrl, setOauthAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/auth/login")
        return
      }

      setEmail(user.email || "")
      
      // Get OAuth avatar from user metadata
      const metadata = user.user_metadata as UserMetadata
      const oauthAvatar = metadata?.avatar_url || metadata?.picture || null
      setOauthAvatarUrl(oauthAvatar)

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error && error.code !== "PGRST116") {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        })
      }

      if (data) {
        // Use OAuth avatar if no custom avatar is set
        setProfile({
          ...data,
          avatar_url: data.avatar_url || oauthAvatar
        })
      } else {
        // Pre-fill from OAuth data if available
        const fullName = metadata?.full_name || ""
        const nameParts = fullName.split(" ")
        
        setProfile({
          id: user.id,
          first_name: nameParts[0] || null,
          last_name: nameParts.slice(1).join(" ") || null,
          phone: null,
          address: null,
          city: null,
          country: "Ethiopia",
          avatar_url: oauthAvatar,
        })
      }
      setIsLoading(false)
    }

    fetchProfile()
  }, [router, toast])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    
    // Validation
    if (!profile.first_name?.trim()) {
      toast({
        title: "First name is required",
        description: "Please enter your first name.",
        variant: "destructive",
      })
      return
    }
    
    setIsSaving(true)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("profiles")
        .update({
          id: profile.id,
          first_name: profile.first_name?.trim() || null,
          last_name: profile.last_name?.trim() || null,
          phone: profile.phone?.trim() || null,
          address: profile.address?.trim() || null,
          city: profile.city?.trim() || null,
          country: profile.country?.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)

      if (error) {
        throw error
      }
      
      toast({
        title: "Profile updated successfully",
        description: "Your changes have been saved.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Failed to save profile",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const initials = profile?.first_name 
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ""}`.toUpperCase()
    : email[0]?.toUpperCase() || "U"
  
  // Use profile avatar or OAuth avatar
  const displayAvatarUrl = profile?.avatar_url || oauthAvatarUrl

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={displayAvatarUrl || undefined} alt={profile?.first_name || "Profile"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {profile?.first_name 
                  ? `${profile.first_name} ${profile.last_name || ""}`.trim()
                  : "Complete Your Profile"}
              </CardTitle>
              <CardDescription>{email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile?.first_name || ""}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile?.last_name || ""}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile?.phone || ""}
                onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                placeholder="+251 xxx xxx xxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile?.address || ""}
                onChange={(e) => setProfile(prev => prev ? { ...prev, address: e.target.value } : null)}
                placeholder="Enter your address"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile?.city || ""}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, city: e.target.value } : null)}
                  placeholder="Enter your city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profile?.country || ""}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, country: e.target.value } : null)}
                  placeholder="Enter your country"
                />
              </div>
            </div>

            <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
