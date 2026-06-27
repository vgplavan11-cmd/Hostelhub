"use client"

import { motion } from "framer-motion"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Building, ShieldCheck, Zap, Users, BarChart3, Smartphone } from "lucide-react"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
}

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              Hostel Management, Modernized
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Manage your hostel with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                unmatched precision.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              HostelHub is the all-in-one operating system for modern student accommodation. Automate requests, track attendance, and manage rooms with a beautiful, lightning-fast interface.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <NextLink href="/signup">
                <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </NextLink>
              <NextLink href="#features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur hover:bg-muted transition-all duration-300">
                  Explore Features
                </Button>
              </NextLink>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="mt-20 mx-auto max-w-6xl relative"
          >
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-2 shadow-2xl">
              <div className="rounded-xl overflow-hidden border border-border bg-background aspect-video flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-muted/50 to-background"></div>
                <div className="text-center space-y-4 z-10">
                  <LayoutDashboardIcon className="h-16 w-16 mx-auto text-primary/40" />
                  <p className="text-2xl font-bold text-muted-foreground/50">Dashboard Interface Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10k+", label: "Active Students" },
              { value: "99.9%", label: "Uptime" },
              { value: "50+", label: "Hostels Onboarded" },
              { value: "24/7", label: "Automated Tracking" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to scale</h2>
            <p className="text-xl text-muted-foreground">Replace your spreadsheets and legacy software with our modern suite of tools designed specifically for hostel administrators.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Building, title: "Smart Room Allocation", desc: "Automate room assignments based on preferences, courses, and availability with drag-and-drop ease." },
              { icon: ShieldCheck, title: "Digital Gatepass", desc: "Students can request leaves seamlessly. Wardens approve in one click with instant SMS notifications to parents." },
              { icon: Zap, title: "Real-time Complaints", desc: "Maintenance issues are tracked from report to resolution with automated escalations and status updates." },
              { icon: Users, title: "Visitor Management", desc: "Track guests digitally. Generate QR codes for pre-approved visitors for secure and fast check-ins." },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Get visual insights into occupancy rates, frequent issues, and staff performance on a unified dashboard." },
              { icon: Smartphone, title: "Mobile-First Design", desc: "Access the platform from any device. Students can manage their entire hostel life from their phone." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to modernize your hostel?</h2>
              <p className="text-xl opacity-90">Join dozens of institutions that have already upgraded their hostel management experience.</p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <NextLink href="/signup">
                  <Button size="lg" variant="secondary" className="h-14 px-10 text-lg text-primary hover:scale-105 transition-transform duration-300">
                    Create Free Account
                  </Button>
                </NextLink>
                <div className="flex items-center gap-2 opacity-80 text-sm mt-4 sm:mt-0 sm:ml-4">
                  <CheckCircle2 className="h-5 w-5" /> No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

