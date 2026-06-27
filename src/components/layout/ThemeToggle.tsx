"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9" /> // Placeholder to prevent layout shift
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors overflow-hidden flex items-center justify-center w-9 h-9"
      aria-label="Toggle theme"
    >
      <Sun className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "scale-0 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 rotate-90"}`} />
    </button>
  )
}
