"use client"

import NextLink from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button, buttonVariants } from "@/components/ui/button"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all print:hidden">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NextLink href="/" className="text-2xl font-extrabold tracking-tight text-primary flex items-center gap-2">
          HostelHub <span className="text-xl">✨</span>
        </NextLink>
        <div className="flex items-center space-x-4">
          {!session ? (
            <>
              <NextLink href="/login" className={buttonVariants({ variant: "ghost", className: "font-medium hover:bg-primary/10" })}>
                Log In
              </NextLink>
              <NextLink href="/signup" className={buttonVariants({ variant: "default", className: "font-medium shadow-md shadow-primary/20" })}>
                Sign Up
              </NextLink>
            </>
          ) : (
            <>
              <span className="text-sm font-medium hidden sm:inline-block">Hello, {session.user?.name}</span>
              <NextLink href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
                Dashboard
              </NextLink>
              <Button variant="outline" onClick={() => signOut()}>
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
