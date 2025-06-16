import type React from "react"
import "@workspace/ui/globals.css"
import { RightSidebarProvider } from "@/components/right-sidebar-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>ChatAnalyzer</title>
        <meta name="description" content="Mejora tus conversaciones con análisis de IA" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <RightSidebarProvider>{children}</RightSidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

