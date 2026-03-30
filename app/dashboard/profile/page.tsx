"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, User, CheckCircle, AlertCircle } from "lucide-react"

interface Profile {
  id: string
  first_name: string
  last_name: string
  phone: string
  address: string
  city: string
  country: string
  avatar_url: string | null
  email: string
}

const INITIAL_PROFILE: Profile = {
  id: "",
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  city: "",
  country: "Ethiopia",
  avatar_url: null,
  email: "",
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(INITIAL_PROFILE)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)
        console.log("[v0] Fetching user profile...")

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        console.log("[v0] Profile fetched:", data)

        if (data.success && data.data) {
          setProfile({
            id: data.data.id || "",
            first_name: data.data.first_name || "",
            last_name: data.data.last_name || "",
            phone: data.data.phone || "",
            address: data.data.address || "",
            city: data.data.city || "",
            country: data.data.country || "Ethiopia",
            avatar_url: data.data.avatar_url || null,
            email: data.data.email || "",
          })
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to load profile"
        console.error("[v0] Error fetching profile:", errorMsg)
        setError(errorMsg)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (field: keyof Profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    // Hide success message when user starts editing again
    if (showSuccess) setShowSuccess(false)
  }

  const validateForm = (): boolean => {
    if (!profile.first_name.trim()) {
      toast({
        title: "First name is required",
        description: "Please enter your first name.",
        variant: "destructive",
      })
      return false
    }
    if (!profile.last_name.trim()) {
      toast({
        title: "Last name is required",
        description: "Please enter your last name.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSaving(true)
    setError(null)

    try {
      console.log("[v0] Saving profile...")
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: profile.first_name.trim(),
          last_name: profile.last_name.trim(),
          phone: profile.phone.trim(),
          address: profile.address.trim(),
          city: profile.city.trim(),
          country: profile.country.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save profile")
      }

      const data = await response.json()
      console.log("[v0] Profile saved:", data)

      // Update local state with the response data
      if (data.success && data.data) {
        setProfile(prev => ({
          ...prev,
          ...data.data,
        }))
      }

      setShowSuccess(true)
      toast({
        title: "Profile updated successfully",
        description: "Your changes have been saved and a confirmation email has been sent.",
      })

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Please try again later."
      console.error("[v0] Error saving profile:", errorMsg)
      setError(errorMsg)
      toast({
        title: "Failed to save profile",
        description: errorMsg,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const initials = profile.first_name 
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ""}`.toUpperCase()
    : profile.email?.[0]?.toUpperCase() || "U"

  const fullName = profile.first_name 
    ? `${profile.first_name} ${profile.last_name}`.trim()
    : "Complete Your Profile"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
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

      {showSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-700 dark:text-green-300">
            Your profile has been updated successfully and a confirmation email has been sent
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.first_name || "Profile"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{fullName}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                <Input
                  id="firstName"
                  value={profile.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                  placeholder="Enter your first name"
                  required
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                <Input
                  id="lastName"
                  value={profile.last_name}
                  onChange={(e) => handleInputChange("last_name", e.target.value)}
                  placeholder="Enter your last name"
                  required
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={profile.email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+251 xxx xxx xxxx"
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your address"
                disabled={isSaving}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profile.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Enter your country"
                  disabled={isSaving}
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
