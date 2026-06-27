"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/animated-section"

export function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$0",
      description: "For small hostels testing the waters.",
      features: ["Up to 50 students", "Basic room allocation", "Community support"]
    },
    {
      name: "Pro",
      price: "$49/mo",
      description: "For growing institutions needing more power.",
      features: ["Up to 500 students", "Advanced allocation rules", "Priority email support", "Complaint tracking"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large universities and multiple campuses.",
      features: ["Unlimited students", "Custom integrations", "Dedicated account manager", "24/7 phone support"]
    }
  ]

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Simple, Transparent Pricing</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <StaggerItem key={i}>
              <div className="h-full hover:-translate-y-2 transition-transform duration-300">
                <Card className={`h-full bg-card/60 backdrop-blur-md border-white/10 shadow-xl transition-all ${plan.popular ? 'ring-2 ring-primary shadow-primary/20 relative scale-105 z-10' : 'hover:shadow-2xl'}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-2 mt-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="pt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="my-6">
                      <span className="text-5xl font-extrabold">{plan.price}</span>
                    </div>
                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm flex items-center justify-center">
                          <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-8">
                    <Button className={`w-full h-12 text-md ${plan.popular ? "shadow-lg shadow-primary/25" : ""}`} variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
