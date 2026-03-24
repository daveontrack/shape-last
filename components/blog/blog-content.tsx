"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search, User } from "lucide-react"

const featuredPost = {
  id: "1",
  title: "Celebrating 20,000 Lives Impacted: Our Journey of Transformation",
  excerpt: "As we reach this incredible milestone, we reflect on the communities transformed, the children educated, and the futures brightened through our collective efforts.",
  image: "/images/hero-ethiopia.jpg",
  category: "Community",
  author: "Dr. Abebe Tadesse",
  date: "March 5, 2026",
  readTime: "5 min read",
}

const posts = [
  {
    id: "2",
    title: "New Clean Water Well Brings Hope to Boricha Village",
    excerpt: "Over 500 families now have access to clean, safe drinking water thanks to our latest water project.",
    image: "/images/clean-water.jpg",
    category: "Clean Water",
    author: "Samuel Bekele",
    date: "February 28, 2026",
    readTime: "3 min read",
  },
  {
    id: "3",
    title: "Women's Cooperative Graduates 50 New Entrepreneurs",
    excerpt: "Our Hawasa center celebrates as 50 women complete their vocational training and launch businesses.",
    image: "/images/women-empowerment.jpg",
    category: "Women Empowerment",
    author: "Meron Haile",
    date: "February 20, 2026",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "Annual Report 2025: A Year of Growth and Impact",
    excerpt: "Review our achievements, challenges, and plans for the future in our comprehensive annual report.",
    image: "/images/community-development.jpg",
    category: "Reports",
    author: "Hanna Girma",
    date: "February 15, 2026",
    readTime: "8 min read",
  },
  {
    id: "5",
    title: "Back to School: 1,500 Children Receive New Supplies",
    excerpt: "With support from our donors, children across all six centers received school supplies for the new academic year.",
    image: "/images/children-education.jpg",
    category: "Education",
    author: "Meron Haile",
    date: "February 10, 2026",
    readTime: "3 min read",
  },
  {
    id: "6",
    title: "Volunteer Spotlight: Meet Sarah from the USA",
    excerpt: "Sarah spent two weeks at our Shanto center. Read about her experience and the impact she made.",
    image: "/images/team-meeting.jpg",
    category: "Volunteers",
    author: "Samuel Bekele",
    date: "February 5, 2026",
    readTime: "4 min read",
  },
  {
    id: "7",
    title: "Partnership Announcement: New Agricultural Program",
    excerpt: "We're excited to announce a new partnership to bring sustainable farming techniques to rural communities.",
    image: "/images/community-development.jpg",
    category: "Community",
    author: "Dr. Abebe Tadesse",
    date: "January 28, 2026",
    readTime: "3 min read",
  },
]

const categories = [
  "All",
  "Education",
  "Clean Water",
  "Women Empowerment",
  "Community",
  "Volunteers",
  "Reports",
]

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const showFeatured = activeCategory === "All" && searchQuery === ""

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-secondary">
        <div className="container mx-auto px-4 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Blog & News
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-3 mb-6 text-balance">
              Stories of Impact
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
              Stay updated with the latest news, success stories, and updates from 
              our community development work across Ethiopia.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {showFeatured && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto min-h-[300px]">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 text-pretty">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Button asChild className="w-fit">
                    <Link href={`/blog/${featuredPost.id}`}>
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-8 bg-background border-b sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === activeCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-200"
              >
                {category}
                {category !== "All" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({posts.filter(p => p.category === category).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Results header */}
          {(activeCategory !== "All" || searchQuery) && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found
                {activeCategory !== "All" && ` in "${activeCategory}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              {(activeCategory !== "All" || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchQuery("")
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any articles matching your criteria. Try adjusting your filters or search query.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("All")
                    setSearchQuery("")
                  }}
                >
                  View all articles
                </Button>
              </div>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Stay Connected
          </h2>
          <p className="opacity-90 text-lg max-w-2xl mx-auto mb-8 text-pretty">
            Subscribe to our newsletter to receive the latest updates, stories, 
            and news directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
