"use client"

import * as React from "react"

type RightSidebarContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

const RightSidebarContext = React.createContext<RightSidebarContextType | undefined>(undefined)

export function RightSidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      toggleSidebar,
    }),
    [open, toggleSidebar],
  )

  return <RightSidebarContext.Provider value={value}>{children}</RightSidebarContext.Provider>
}

export function useRightSidebar() {
  const context = React.useContext(RightSidebarContext)
  if (context === undefined) {
    throw new Error("useRightSidebar must be used within a RightSidebarProvider")
  }
  return context
}

