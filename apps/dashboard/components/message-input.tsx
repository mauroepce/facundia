"use client"

import * as React from "react"
import { ImagePlus, Send } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"

export function MessageInput() {
  const [message, setMessage] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Mensaje enviado:", message)
      // Aquí iría la lógica para enviar el mensaje
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log("Archivos seleccionados:", files)
      // Aquí iría la lógica para manejar los archivos
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              placeholder="Pega aquí tu conversación para analizarla..."
              className="min-h-24 resize-none pr-12"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute bottom-2 right-2" onClick={handleFileClick}>
                    <ImagePlus className="h-5 w-5" />
                    <span className="sr-only">Adjuntar imágenes</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach images</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleSendMessage} className="h-10 w-10 rounded-full p-0">
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Pega fragmentos de tus conversaciones para recibir análisis y recomendaciones para mejorar tu comunicación.
        </p>
      </div>
    </div>
  )
}

