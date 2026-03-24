import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import BlogContent from "@/components/blog/blog-content"

export const metadata: Metadata = {
  title: "Blog & News",
  description: "Stay updated with the latest news, stories, and updates from SHAPEthiopia's community development work across Ethiopia.",
}

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <BlogContent />
      <Footer />
    </>
  )
}
