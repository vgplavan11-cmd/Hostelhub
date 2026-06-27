"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export function PrintButton() {
  return (
    <Button size="lg" className="w-full md:w-auto px-8" onClick={() => window.print()}>
      <Printer className="mr-2 h-5 w-5" />
      Download / Print Pass
    </Button>
  )
}
