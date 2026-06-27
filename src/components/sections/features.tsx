"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Building, Users, Activity, ShieldCheck } from "lucide-react"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"

export function Features() {
  const features = [
    {
      title: "Smart Allocation",
      description: "Automated and conflict-free room assignments tailored for your institution.",
      icon: <Building className="h-8 w-8 text-primary mb-4" />
    },
    {
      title: "Role-based Access",
      description: "Dedicated dashboards for Admins, Wardens, and Students with specific permissions.",
      icon: <ShieldCheck className="h-8 w-8 text-primary mb-4" />
    },
    {
      title: "Complaint Tracking",
      description: "Students can raise issues and track resolutions in real-time.",
      icon: <Activity className="h-8 w-8 text-primary mb-4" />
    },
    {
      title: "Community Hub",
      description: "Connect students and foster a vibrant living environment.",
      icon: <Users className="h-8 w-8 text-primary mb-4" />
    }
  ]

  return (
    <section className="bg-muted/30 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Powerful Features</h2>
        </AnimatedSection>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <div className="h-full hover:-translate-y-2 transition-transform duration-300">
                <Card className="h-full border-white/20 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
