"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/ui/animated-section"

export function Contact() {
  return (
    <section className="bg-muted/30 py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="hover:-translate-y-1 transition-transform duration-300">
              <Card className="border-white/20 bg-card/60 backdrop-blur-md shadow-2xl">
                <CardHeader className="text-center pb-8 mt-4">
                  <CardTitle className="text-4xl font-bold tracking-tight">Get In Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" className="h-12 bg-background/50 backdrop-blur-sm transition-shadow focus:shadow-md focus:shadow-primary/20" />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" className="h-12 bg-background/50 backdrop-blur-sm transition-shadow focus:shadow-md focus:shadow-primary/20" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="john@example.com" className="h-12 bg-background/50 backdrop-blur-sm transition-shadow focus:shadow-md focus:shadow-primary/20" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="message">Message</Label>
                      <textarea 
                        id="message" 
                        placeholder="How can we help?" 
                        rows={5} 
                        className="flex w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow focus:shadow-md focus:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <Button type="button" className="w-full h-14 text-lg shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 mt-4">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
