import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, Clock, ArrowLeft, ArrowRight, Share2, 
  Facebook, Twitter, Linkedin, Heart, BookmarkPlus,
  Quote, User
} from "lucide-react"

// Blog post data
const allPosts = [
  {
    id: "1",
    title: "Celebrating 20,000 Lives Impacted: Our Journey of Transformation",
    excerpt: "As we reach this incredible milestone, we reflect on the communities transformed, the children educated, and the futures brightened through our collective efforts.",
    content: `
      <p class="lead">Twenty thousand lives. It's more than a number—it's 20,000 stories of hope, resilience, and transformation. Today, we celebrate this remarkable milestone and reflect on the journey that brought us here.</p>

      <h2>A Decade of Dedication</h2>
      <p>When SHAPEthiopia was founded, we had a simple yet ambitious vision: to create lasting change in Ethiopian communities through education, clean water, and women's empowerment. What started as a small initiative in Hawasa has grown into a movement that spans six centers across the nation.</p>

      <p>Every child who learned to read, every family who gained access to clean water, every woman who started her own business—these individual victories have accumulated into something truly extraordinary.</p>

      <blockquote>
        "The impact we've witnessed goes far beyond the numbers. We've seen entire communities transform, with children becoming teachers, and beneficiaries becoming leaders."
        <cite>— Dr. Abebe Tadesse, Founder</cite>
      </blockquote>

      <h2>The Ripple Effect of Change</h2>
      <p>What makes our impact truly meaningful is its sustainability. When we educate a child, we're not just changing one life—we're transforming generations. Our data shows that children who complete our programs are 85% more likely to pursue higher education and contribute back to their communities.</p>

      <p>In the past year alone, we've:</p>
      <ul>
        <li>Provided education support to over 3,500 children</li>
        <li>Installed 25 clean water wells serving 15,000+ people</li>
        <li>Trained 450 women in vocational skills</li>
        <li>Established 6 community development centers</li>
      </ul>

      <h2>Stories That Inspire</h2>
      <p>Behind every statistic is a human story. Like Almaz, who joined our women's empowerment program five years ago. Today, she employs 12 women in her textile business and mentors others in our program. Or young Samuel, who received educational support and is now studying medicine at Addis Ababa University.</p>

      <figure>
        <img src="/images/community-development.jpg" alt="Community gathering at our Hawasa center" />
        <figcaption>Community members celebrating at our Hawasa center's anniversary event.</figcaption>
      </figure>

      <h2>Looking Forward</h2>
      <p>As we celebrate this milestone, we're already planning for the next chapter. Our goal for the coming year is to expand our reach to three new regions and double our impact in existing communities.</p>

      <p>But we can't do this alone. Every donation, every volunteer hour, every shared story contributes to this mission. Together, we're not just changing lives—we're building a brighter future for Ethiopia.</p>

      <h2>Join Our Mission</h2>
      <p>This milestone belongs to everyone who has supported our work. If you've been part of our journey, thank you. If you're just learning about us, we invite you to join this movement of transformation.</p>
    `,
    image: "/images/hero-ethiopia.jpg",
    category: "Milestone",
    author: {
      name: "Dr. Abebe Tadesse",
      role: "Founder & Executive Director",
      avatar: "/images/team-meeting.jpg",
      bio: "Dr. Abebe Tadesse founded SHAPEthiopia in 2010 with a vision to transform communities through sustainable development."
    },
    date: "March 5, 2026",
    readTime: "5 min read",
    tags: ["Impact", "Community", "Milestone", "Education"],
  },
  {
    id: "2",
    title: "New Clean Water Well Brings Hope to Boricha Village",
    excerpt: "Over 500 families now have access to clean, safe drinking water thanks to our latest water project.",
    content: `
      <p class="lead">For the residents of Boricha Village, the completion of a new clean water well marks the end of a daily struggle that has defined generations.</p>

      <h2>A Community Transformed</h2>
      <p>Before the well was installed, women and children in Boricha would walk an average of 4 kilometers each day to collect water from an unreliable source. The water often caused illness, and the time spent collecting it meant children missed school and women couldn't pursue economic opportunities.</p>

      <p>Now, with a modern well installed at the heart of the village, over 500 families have immediate access to clean, safe drinking water. The impact has been immediate and profound.</p>

      <blockquote>
        "My children no longer get sick from the water. My daughter can go to school every day now. This well has changed everything for us."
        <cite>— Fatima, Boricha Village resident</cite>
      </blockquote>

      <h2>The Installation Process</h2>
      <p>The project was completed through a partnership with local government and community volunteers. Our team worked alongside village elders to identify the optimal location for the well, ensuring it would serve the maximum number of families.</p>

      <p>Key features of the new well include:</p>
      <ul>
        <li>Solar-powered pumping system for sustainability</li>
        <li>Community-maintained storage tanks</li>
        <li>Training program for local maintenance teams</li>
        <li>Water quality monitoring equipment</li>
      </ul>

      <h2>Community Ownership</h2>
      <p>A crucial aspect of our water projects is ensuring community ownership. We trained 15 local residents in well maintenance and established a community fund for ongoing upkeep. This model ensures the well will continue serving the community for decades to come.</p>

      <h2>Looking Ahead</h2>
      <p>The success in Boricha has inspired plans for three additional wells in neighboring villages. With your support, we can bring clean water to thousands more families in the region.</p>
    `,
    image: "/images/clean-water.jpg",
    category: "Clean Water",
    author: {
      name: "Samuel Bekele",
      role: "Clean Water Program Director",
      avatar: "/images/team-meeting.jpg",
      bio: "Samuel has led over 50 water projects across Ethiopia, bringing clean water to more than 30,000 people."
    },
    date: "February 28, 2026",
    readTime: "3 min read",
    tags: ["Clean Water", "Community", "Infrastructure"],
  },
  {
    id: "3",
    title: "Women's Cooperative Graduates 50 New Entrepreneurs",
    excerpt: "Our Hawasa center celebrates as 50 women complete their vocational training and launch businesses.",
    content: `
      <p class="lead">Fifty women stood proudly on stage at our Hawasa center, certificates in hand, ready to embark on a new chapter as entrepreneurs. This graduation ceremony marked not just the end of a training program, but the beginning of 50 new businesses.</p>

      <h2>The Journey to Independence</h2>
      <p>Over the past 18 months, these women underwent intensive training in business skills, financial literacy, and vocational trades including tailoring, food production, and handicrafts. Many started the program with no formal business experience; today, they're launching enterprises that will support their families and communities.</p>

      <blockquote>
        "I used to think business was only for men with education. This program showed me that I have what it takes. Now I employ three other women in my tailoring shop."
        <cite>— Tigist, Graduate and Business Owner</cite>
      </blockquote>

      <h2>Program Highlights</h2>
      <p>Our Women's Empowerment Program includes:</p>
      <ul>
        <li>6 months of vocational skills training</li>
        <li>Business planning and financial literacy workshops</li>
        <li>Mentorship from successful local businesswomen</li>
        <li>Micro-loans to launch their businesses</li>
        <li>Ongoing support network and resources</li>
      </ul>

      <h2>Impact Beyond Numbers</h2>
      <p>The ripple effects of women's economic empowerment extend far beyond the individual. Research shows that when women earn income, they reinvest 90% back into their families—improving nutrition, education, and healthcare for their children.</p>

      <h2>Join Us</h2>
      <p>Want to support the next cohort of women entrepreneurs? Your donation helps provide training, materials, and startup capital for women ready to transform their lives.</p>
    `,
    image: "/images/women-empowerment.jpg",
    category: "Women Empowerment",
    author: {
      name: "Meron Haile",
      role: "Women's Empowerment Coordinator",
      avatar: "/images/team-meeting.jpg",
      bio: "Meron has dedicated 8 years to empowering Ethiopian women through education and entrepreneurship."
    },
    date: "February 20, 2026",
    readTime: "4 min read",
    tags: ["Women Empowerment", "Entrepreneurship", "Training"],
  },
  {
    id: "4",
    title: "Annual Report 2025: A Year of Growth and Impact",
    excerpt: "Review our achievements, challenges, and plans for the future in our comprehensive annual report.",
    content: `
      <p class="lead">2025 was a transformative year for SHAPEthiopia. Despite global challenges, we expanded our reach, deepened our impact, and laid the groundwork for even greater achievements in the years to come.</p>

      <h2>Key Achievements</h2>
      <ul>
        <li>Expanded to 2 new regional centers</li>
        <li>Increased beneficiaries by 35%</li>
        <li>Launched 15 new clean water projects</li>
        <li>Graduated 200+ women from vocational programs</li>
        <li>Achieved 95% program completion rate</li>
      </ul>

      <h2>Financial Transparency</h2>
      <p>We believe in complete transparency with our donors. In 2025:</p>
      <ul>
        <li>85% of funds went directly to programs</li>
        <li>10% to administration</li>
        <li>5% to fundraising</li>
      </ul>

      <h2>Looking to 2026</h2>
      <p>Our goals for the coming year include expanding to three new regions, launching a youth leadership program, and increasing our clean water capacity by 50%.</p>
    `,
    image: "/images/community-development.jpg",
    category: "Reports",
    author: {
      name: "Hanna Girma",
      role: "Communications Director",
      avatar: "/images/team-meeting.jpg",
      bio: "Hanna leads SHAPEthiopia's communications and reporting efforts."
    },
    date: "February 15, 2026",
    readTime: "8 min read",
    tags: ["Annual Report", "Transparency", "Impact"],
  },
  {
    id: "5",
    title: "Back to School: 1,500 Children Receive New Supplies",
    excerpt: "With support from our donors, children across all six centers received school supplies for the new academic year.",
    content: `
      <p class="lead">The excitement was palpable as 1,500 children across our six centers received brand new school supplies, setting them up for success in the new academic year.</p>

      <h2>More Than Just Supplies</h2>
      <p>Each child received a backpack filled with notebooks, pencils, pens, rulers, and other essential supplies. For many families, the cost of these supplies would have been a significant burden—or an impossible expense.</p>

      <blockquote>
        "When I saw my new backpack, I felt like anything was possible. I'm going to study hard and make my family proud."
        <cite>— Bereket, 10 years old</cite>
      </blockquote>

      <h2>Community Celebration</h2>
      <p>Distribution events at each center became celebrations of education, with parents, teachers, and community leaders coming together to mark the start of the school year.</p>

      <h2>Thank You, Donors</h2>
      <p>This initiative was made possible by generous donors from around the world. Your contributions directly impact children's ability to learn and succeed.</p>
    `,
    image: "/images/children-education.jpg",
    category: "Education",
    author: {
      name: "Meron Haile",
      role: "Women's Empowerment Coordinator",
      avatar: "/images/team-meeting.jpg",
      bio: "Meron supports various education initiatives alongside her work in women's empowerment."
    },
    date: "February 10, 2026",
    readTime: "3 min read",
    tags: ["Education", "Children", "Back to School"],
  },
  {
    id: "6",
    title: "Volunteer Spotlight: Meet Sarah from the USA",
    excerpt: "Sarah spent two weeks at our Shanto center. Read about her experience and the impact she made.",
    content: `
      <p class="lead">When Sarah Thompson from California signed up to volunteer at SHAPEthiopia, she expected to teach English. What she didn't expect was how much she would learn in return.</p>

      <h2>Two Weeks That Changed Everything</h2>
      <p>Sarah spent two weeks at our Shanto center, teaching English to children aged 8-14. But the experience became so much more than language lessons.</p>

      <blockquote>
        "I came to Ethiopia thinking I would give something to these children. But they gave me so much more—joy, perspective, and a sense of purpose I'd been missing."
        <cite>— Sarah Thompson, Volunteer</cite>
      </blockquote>

      <h2>Daily Life at the Center</h2>
      <p>Sarah's days started early, with morning assembly and songs. She taught three classes of English, organized games during breaks, and helped with after-school activities.</p>

      <h2>A Lasting Connection</h2>
      <p>Though Sarah has returned home, she maintains contact with the center and has organized a fundraiser at her local community, raising $3,000 for educational supplies.</p>

      <h2>Become a Volunteer</h2>
      <p>Sarah's story is just one of many. We welcome volunteers from around the world to share their skills and make a difference. Visit our volunteer page to learn more.</p>
    `,
    image: "/images/team-meeting.jpg",
    category: "Volunteers",
    author: {
      name: "Samuel Bekele",
      role: "Volunteer Coordinator",
      avatar: "/images/team-meeting.jpg",
      bio: "Samuel coordinates volunteer programs across all SHAPEthiopia centers."
    },
    date: "February 5, 2026",
    readTime: "4 min read",
    tags: ["Volunteers", "Stories", "International"],
  },
  {
    id: "7",
    title: "Partnership Announcement: New Agricultural Program",
    excerpt: "We're excited to announce a new partnership to bring sustainable farming techniques to rural communities.",
    content: `
      <p class="lead">SHAPEthiopia is thrilled to announce a groundbreaking partnership with the Ethiopian Agricultural Research Institute to launch a sustainable farming program in our target communities.</p>

      <h2>A New Frontier</h2>
      <p>While education, water, and women's empowerment remain our core focus, we recognize that food security is fundamental to community wellbeing. This new program will introduce sustainable farming techniques to 500 families.</p>

      <h2>Program Components</h2>
      <ul>
        <li>Training in climate-resilient farming techniques</li>
        <li>Distribution of high-yield seed varieties</li>
        <li>Irrigation system installation</li>
        <li>Market access support</li>
      </ul>

      <h2>Expected Impact</h2>
      <p>We expect this program to increase household food production by 40% and create new income opportunities for participating families.</p>

      <h2>Launch Timeline</h2>
      <p>The program will launch in April 2026, with the first harvest expected by September. We'll share updates as we progress.</p>
    `,
    image: "/images/community-development.jpg",
    category: "Partnerships",
    author: {
      name: "Dr. Abebe Tadesse",
      role: "Founder & Executive Director",
      avatar: "/images/team-meeting.jpg",
      bio: "Dr. Abebe leads strategic partnerships and program development at SHAPEthiopia."
    },
    date: "January 28, 2026",
    readTime: "3 min read",
    tags: ["Partnership", "Agriculture", "Sustainability"],
  },
]

function getPost(id: string) {
  return allPosts.find(post => post.id === id)
}

function getRelatedPosts(currentId: string, category: string) {
  return allPosts
    .filter(post => post.id !== currentId)
    .filter(post => post.category === category || Math.random() > 0.5)
    .slice(0, 3)
}

function getAdjacentPosts(currentId: string) {
  const currentIndex = allPosts.findIndex(post => post.id === currentId)
  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = getPost(id)
  
  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = getPost(id)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(id, post.category)
  const { prev, next } = getAdjacentPosts(id)

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-0">
          {/* Background Image */}
          <div className="relative h-[50vh] min-h-[400px] max-h-[600px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-12">
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-4">
                    <Link 
                      href="/blog" 
                      className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Link>
                    
                    {/* Share & Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <Share2 className="h-4 w-4 text-foreground" />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <Facebook className="h-4 w-4 text-foreground" />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <Twitter className="h-4 w-4 text-foreground" />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <Linkedin className="h-4 w-4 text-foreground" />
                      </Button>
                      <Separator orientation="vertical" className="h-6 mx-1 bg-foreground/20" />
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <Heart className="h-4 w-4 text-foreground" />
                      </Button>
                      <Button variant="secondary" size="icon" className="rounded-full h-9 w-9 bg-background/20 backdrop-blur-sm border-0 hover:bg-background/40">
                        <BookmarkPlus className="h-4 w-4 text-foreground" />
                      </Button>
                    </div>
                  </div>
                  
                  <Badge className="mb-4">{post.category}</Badge>
                  
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{post.author.name}</p>
                        <p className="text-sm">{post.author.role}</p>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-8 hidden sm:block" />
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-8">
                {/* Article Body */}
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-serif prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-li:text-muted-foreground prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-8 prose-blockquote:bg-secondary prose-blockquote:rounded-r-lg prose-blockquote:italic
                    prose-blockquote:not-italic prose-blockquote:text-foreground
                    prose-figure:my-8 prose-figure:rounded-xl prose-figure:overflow-hidden
                    prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:mt-3
                    prose-img:rounded-xl prose-img:shadow-lg
                    [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:leading-relaxed [&_.lead]:mb-8
                    [&_blockquote_cite]:block [&_blockquote_cite]:text-sm [&_blockquote_cite]:text-primary [&_blockquote_cite]:mt-3 [&_blockquote_cite]:not-italic [&_blockquote_cite]:font-medium
                  "
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mobile Social Share */}
                <div className="flex xl:hidden items-center gap-3 mt-8 pt-8 border-t">
                  <span className="text-sm text-muted-foreground font-medium">Share:</span>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Author Bio Card */}
                <Card className="mt-12 border-0 shadow-lg bg-secondary">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <Avatar className="h-20 w-20 border-4 border-background">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="text-xl">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-primary font-medium mb-1">Written by</p>
                        <h3 className="font-serif text-xl font-bold text-foreground mb-1">{post.author.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{post.author.role}</p>
                        <p className="text-muted-foreground">{post.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Post Navigation */}
                <div className="mt-12 grid sm:grid-cols-2 gap-4">
                  {prev && (
                    <Link href={`/blog/${prev.id}`} className="group">
                      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <span className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                            <ArrowLeft className="w-4 h-4" />
                            Previous Article
                          </span>
                          <h4 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {prev.title}
                          </h4>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                  {next && (
                    <Link href={`/blog/${next.id}`} className="group sm:ml-auto">
                      <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-right">
                          <span className="text-sm text-muted-foreground flex items-center justify-end gap-2 mb-2">
                            Next Article
                            <ArrowRight className="w-4 h-4" />
                          </span>
                          <h4 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {next.title}
                          </h4>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  {/* Donate CTA */}
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
                    <CardContent className="p-6 relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                      <div className="relative z-10">
                        <Heart className="w-10 h-10 mb-4 opacity-90" />
                        <h3 className="font-serif text-xl font-bold mb-2">Support Our Mission</h3>
                        <p className="opacity-90 mb-6 text-sm">
                          Your donation helps us continue transforming lives across Ethiopia.
                        </p>
                        <Button variant="secondary" asChild className="w-full">
                          <Link href="/donate">Donate Now</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-6">Related Stories</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block">
                          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="flex gap-4 p-4">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Badge variant="outline" className="mb-2 text-xs">
                                  {relatedPost.category}
                                </Badge>
                                <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2">Stay Updated</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get the latest stories delivered to your inbox.
                      </p>
                      <form className="space-y-3">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button className="w-full">Subscribe</Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* More Stories */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">More Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover more inspiring stories from our communities across Ethiopia.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
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
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
