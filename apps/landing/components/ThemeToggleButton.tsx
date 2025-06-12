"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </Button>
  )
}