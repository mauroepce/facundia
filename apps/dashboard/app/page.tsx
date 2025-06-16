import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { RightSidebar } from "@/components/right-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col">
          <ChatInterface />
        </SidebarInset>
      </SidebarProvider>
      <RightSidebar />
    </div>
  )
}

