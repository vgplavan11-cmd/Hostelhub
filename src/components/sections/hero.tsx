"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-48 md:pb-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <StaggerContainer className="container mx-auto px-4 text-center relative z-10">
        <StaggerItem>
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-6 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/20 hover:scale-105 transition-transform duration-300">
            Welcome to the Future of Hostels ✨
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-foreground drop-shadow-sm">
            Elevate Your <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Hostel Experience</span>
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            HostelHub seamlessly connects wardens and students through an intuitive, premium, and stress-free management platform.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="flex justify-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Link href="/signup" className={buttonVariants({ size: "lg", variant: "default", className: "w-full sm:w-auto h-14 px-8 text-lg shadow-xl shadow-primary/20" })}>
                Get Started
              </Link>
            </div>
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Link href="/login" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto h-14 px-8 text-lg" })}>
                Live Demo
              </Link>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
    </section>
  )
}
