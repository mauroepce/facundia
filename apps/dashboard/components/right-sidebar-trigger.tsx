"use client"

import type * as React from "react"
import { PanelRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { useRightSidebar } from "./right-sidebar-context"

export function RightSidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, open } = useRightSidebar()

  // Mejorar el botón de toggle con una animación
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""} ${className}`}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelRight className="h-5 w-5" />
      <span className="sr-only">Toggle Right Sidebar</span>
    </Button>
  )
}

