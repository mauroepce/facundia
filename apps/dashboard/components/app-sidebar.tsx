"use client"

import * as React from "react"
import {
  ChevronRight,
  Clock,
  Command,
  FileText,
  Folder,
  FolderPlus,
  Heart,
  MessageSquarePlus,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Tag,
  Trash2,
} from "lucide-react"

import { NavUser } from "./nav-user"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@workspace/ui/components/sidebar"

// Datos de ejemplo para las conversaciones
const conversations = [
  {
    id: 1,
    name: "Ana - Tinder",
    preview: "Creo que tenemos mucho en común...",
    date: "Hoy, 14:30",
    isNew: true,
    isFavorite: true,
    folder: "En progreso",
  },
  {
    id: 2,
    name: "María - Instagram",
    preview: "¿Te gustaría ir a tomar algo el viernes?",
    date: "Ayer, 20:15",
    isNew: true,
    isFavorite: false,
    folder: "En progreso",
  },
  {
    id: 3,
    name: "Laura - Bumble",
    preview: "Gracias por los consejos, me ayudaron mucho",
    date: "12 Mar",
    isNew: false,
    isFavorite: true,
    folder: "Interesantes",
  },
  {
    id: 4,
    name: "Sofía - WhatsApp",
    preview: "No estoy segura de poder ir mañana...",
    date: "10 Mar",
    isNew: false,
    isFavorite: false,
    folder: "Interesantes",
  },
  {
    id: 5,
    name: "Carla - Hinge",
    preview: "¿Qué opinas de mi respuesta?",
    date: "5 Mar",
    isNew: false,
    isFavorite: false,
    folder: "Archivadas",
  },
]

// Datos de ejemplo para las carpetas
const folders = [
  {
    id: 1,
    name: "En progreso",
    icon: Clock,
    count: 2,
  },
  {
    id: 2,
    name: "Interesantes",
    icon: Heart,
    count: 2,
  },
  {
    id: 3,
    name: "Archivadas",
    icon: FileText,
    count: 1,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filtrar conversaciones basadas en la búsqueda
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">ChatAnalyzer</span>
                    <span className="truncate text-xs">Mejora tus conversaciones</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {/* Botón de tema oscuro en la esquina superior derecha */}
          <ThemeToggle />
        </div>

        {/* Botón Nueva Conversación */}
        <div className="px-2 pb-2">
          <Button className="w-full justify-start" variant="default">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Nueva Conversación
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              className="pl-8"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Conversaciones Favoritas */}
        {filteredConversations.some((conv) => conv.isFavorite) && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center">
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              Favoritas
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredConversations
                  .filter((conv) => conv.isFavorite)
                  .map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarSeparator />

        {/* Carpetas */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span className="flex items-center">
              <Folder className="mr-2 h-4 w-4" />
              Carpetas
            </span>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <FolderPlus className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <Collapsible key={folder.id} className="w-full">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between">
                        <div className="flex items-center">
                          <folder.icon className="mr-2 h-4 w-4" />
                          <span>{folder.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2 text-xs text-muted-foreground">{folder.count}</span>
                          <ChevronRight className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal className="h-4 w-4" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Añadir conversación
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="mr-2 h-4 w-4" />
                          Renombrar carpeta
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar carpeta
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <CollapsibleContent>
                      <div className="pl-4 pt-2">
                        <SidebarMenu>
                          {filteredConversations
                            .filter((conv) => conv.folder === folder.name)
                            .map((conversation) => (
                              <ConversationItem key={conversation.id} conversation={conversation} />
                            ))}
                        </SidebarMenu>
                      </div>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Todas las conversaciones */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Todas las conversaciones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredConversations.map((conversation) => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

// Componente para cada elemento de conversación
function ConversationItem({ conversation }: { conversation: (typeof conversations)[0] }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="relative">
        <div className="flex flex-col items-start">
          <div className="flex items-center w-full">
            <span className="font-medium">{conversation.name}</span>
            {conversation.isFavorite && <Star className="ml-1 h-3 w-3 text-yellow-500" />}
          </div>
          <span className="text-xs text-muted-foreground line-clamp-1">{conversation.preview}</span>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-xs text-muted-foreground">{conversation.date}</span>
          {conversation.isNew && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>}
        </div>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal className="h-4 w-4" />
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={isMobile ? "bottom" : "right"} align={isMobile ? "end" : "start"}>
          <DropdownMenuItem>
            <Star className="mr-2 h-4 w-4" />
            {conversation.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Folder className="mr-2 h-4 w-4" />
            Mover a carpeta
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar conversación
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

