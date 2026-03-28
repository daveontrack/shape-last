// import Link from "next/link"
// import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
// import { NewsletterSignup } from "@/components/newsletter-signup"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// const quickLinks = [
//   { href: "/about", label: "About Us" },
//   { href: "/programs", label: "Our Programs" },
//   { href: "/centers", label: "Our Centers" },
//   { href: "/volunteer", label: "Volunteer" },
//   { href: "/donate", label: "Donate" },
//   { href: "/blog", label: "Blog" },
// ]

// const programs = [
//   { href: "/programs#children", label: "Children's Education" },
//   { href: "/programs#women", label: "Women Empowerment" },
//   { href: "/programs#water", label: "Clean Water" },
//   { href: "/programs#community", label: "Community Development" },
// ]

// const socialLinks = [
//   { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
//   { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
//   { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
//   { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
//   { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
// ]

// export function Footer() {
//   return (
//     <footer className="bg-foreground text-background">
//       {/* Main Footer */}
//       <div className="container mx-auto px-4 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* About Column */}
//           <div className="space-y-6">
//             <Link href="/" className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//                 <Heart className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <span className="font-serif text-xl font-bold">
//                 SHAPE<span className="text-primary">Ethiopia</span>
//               </span>
//             </Link>
//             <p className="text-background/70 leading-relaxed">
//               Empowering communities and transforming lives across Ethiopia through sustainable development programs.
//             </p>
//             <div className="flex gap-3">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
//                   aria-label={social.label}
//                 >
//                   <social.icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
//             <ul className="space-y-3">
//               {quickLinks.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-background/70 hover:text-primary transition-colors"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Programs */}
//           <div>
//             <h3 className="font-serif text-lg font-semibold mb-6">Our Programs</h3>
//             <ul className="space-y-3">
//               {programs.map((program) => (
//                 <li key={program.href}>
//                   <Link
//                     href={program.href}
//                     className="text-background/70 hover:text-primary transition-colors"
//                   >
//                     {program.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact & Newsletter */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
//               <ul className="space-y-4">
//                 <li className="flex items-start gap-3">
//                   <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//                   <span className="text-background/70">
//                     Hawassa, Ethiopia<br />
//                     In front of the Main Campus of Hawassa University
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-primary shrink-0" />
//                   <a href="mailto:info@shapeethiopia.org" className="text-background/70 hover:text-primary transition-colors">
//                     info@shapeethiopia.org
//                   </a>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 text-primary shrink-0" />
//                   <a href="tel:+251911234567" className="text-background/70 hover:text-primary transition-colors">
//                     +251 911 234 567
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
//               <form className="flex gap-2">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
//                 />
//                 <Button type="submit" size="sm" className="shrink-0">
//                   Subscribe
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-background/10">
//         <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <p className="text-background/60 text-sm text-center sm:text-left">
//             &copy; {new Date().getFullYear()} SHAPEEthiopia. All rights reserved.
//           </p>
//           <div className="flex gap-6 text-sm">
//             <Link href="/privacy" className="text-background/60 hover:text-primary transition-colors">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="text-background/60 hover:text-primary transition-colors">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Our Programs" },
  { href: "/centers", label: "Our Centers" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
  { href: "/blog", label: "Blog" },
];

const programs = [
  { href: "/programs#children", label: "Children's Education" },
  { href: "/programs#women", label: "Women Empowerment" },
  { href: "/programs#water", label: "Clean Water" },
  { href: "/programs#community", label: "Community Development" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // You can call an API to save the email here
    setSubmitted(true);
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">
                SHAPE<span className="text-primary">Ethiopia</span>
              </span>
            </Link>
            <p className="text-background/70 leading-relaxed">
              Empowering communities and transforming lives across Ethiopia through sustainable development programs.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.href}>
                  <Link
                    href={program.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-background/70">
                    Hawassa, Ethiopia<br />
                    In front of the Main Campus of Hawassa University
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@shapeethiopia.org" className="text-background/70 hover:text-primary transition-colors">
                    info@shapeethiopia.org
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+251911234567" className="text-background/70 hover:text-primary transition-colors">
                    +251 911 234 567
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Subscribe to Newsletter</h4>
              {submitted ? (
                <p className="text-green-600 font-medium">Thanks for subscribing!</p>
              ) : (
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                  />
                  <Button type="submit" size="sm" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} SHAPEEthiopia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
