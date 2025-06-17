"use client"

import * as React from "react"
import {
  Bot,
  Calendar,
  Check,
  ClipboardCopy,
  Edit,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  Sparkles,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import { Textarea } from "@workspace/ui/components/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { RightSidebarTrigger } from "@/components/right-sidebar-trigger"
import { Badge } from "@workspace/ui/components/badge"

// Tipos para los mensajes y notas
type MessageType = {
  id: string
  sender: string
  content: string
  timestamp: string
  isUser: boolean
  avatar?: string
}

type NoteType = {
  id: string
  content: string
  timestamp: string
  messageId?: string
}

// Tipo para las sugerencias de IA
type SuggestionOptionType = {
  id: string
  title: string
  confidence: number
  message: string
  interestImpact: {
    value: number
    reason: string
  }
  confidenceImpact: {
    value: number
    reason: string
  }
  escalationImpact: {
    from: number
    to: number
    description: string
  }
  explanation: string
  avoidance: string[]
  reference?: string
}

type AISuggestionType = {
  id: string
  timestamp: string
  options: SuggestionOptionType[]
}

export function ChatInterface() {
  // Estado para los mensajes y notas
  const [messages, setMessages] = React.useState<MessageType[]>([
    {
      id: "1",
      sender: "Ana",
      content: "Hola! Vi que te gusta el senderismo. Yo también soy fan de las actividades al aire libre 😊",
      timestamp: "Ayer, 20:15",
      isUser: false,
      avatar: "A",
    },
    {
      id: "2",
      sender: "Tú",
      content: "¡Hola Ana! Sí, me encanta el senderismo. ¿Has ido a alguna ruta interesante últimamente?",
      timestamp: "Ayer, 20:18",
      isUser: true,
      avatar: "T",
    },
    {
      id: "3",
      sender: "Ana",
      content:
        "Hace un par de semanas fui al Parque Nacional Sierra Nevada y fue increíble! ¿Y tú? ¿Tienes algún lugar favorito para hacer senderismo?",
      timestamp: "Hoy, 10:05",
      isUser: false,
      avatar: "A",
    },
  ])

  const [notes, setNotes] = React.useState<NoteType[]>([
    {
      id: "note1",
      content: "Ana mencionó que le gusta la fotografía de naturaleza",
      timestamp: "Ayer, 20:30",
      messageId: "2",
    },
  ])

  // Estado para las sugerencias de IA
  const [aiSuggestions, setAiSuggestions] = React.useState<AISuggestionType[]>([])

  const [inputValue, setInputValue] = React.useState("")
  const [noteContent, setNoteContent] = React.useState("")
  const [activeMessageId, setActiveMessageId] = React.useState<string | null>(null)
  const [aiResponse, setAiResponse] = React.useState<string | null>(null)

  // Estado para mostrar notificación de copiado
  const [copiedOption, setCopiedOption] = React.useState<string | null>(null)

  // Referencia para el área de desplazamiento
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Añadir una referencia para el input de archivo en el componente ChatInterface
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Función para desplazarse al final del chat
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  // Desplazarse al final cuando se agregan nuevos mensajes
  React.useEffect(() => {
    scrollToBottom()
  }, [messages, notes, aiSuggestions])

  // Función para agregar una nota
  const addNote = (messageId: string) => {
    if (noteContent.trim()) {
      const newNote: NoteType = {
        id: `note${Date.now()}`,
        content: noteContent,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        messageId,
      }
      setNotes([...notes, newNote])
      setNoteContent("")
      setActiveMessageId(null)
    }
  }

  // Función para aceptar una sugerencia
  const acceptSuggestion = (message: string) => {
    const newMessage: MessageType = {
      id: `msg${Date.now()}`,
      sender: "Tú",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
      avatar: "T",
    }
    setMessages([...messages, newMessage])
  }

  // Añadir la función para manejar la selección de archivos después de la función acceptSuggestion
  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Aquí iría la lógica para leer el contenido del archivo
      console.log("Archivo seleccionado:", files[0]?.name)

      // Ejemplo simple: leer un archivo de texto
      if (files[0]?.type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setInputValue(content || "")
        }
        reader.readAsText(files[0])
      } else {
        // Para otros tipos de archivo como Word, se necesitaría una biblioteca adicional
        alert("Por favor, convierte tu archivo a formato .txt para una mejor compatibilidad")
      }
    }
  }

  // Función para analizar la conversación
  const analyzeConversation = () => {
    if (inputValue.trim()) {
      // Aquí iría la lógica para parsear el texto pegado
      // Por ahora, simplemente lo agregamos como un mensaje del usuario
      const newMessage: MessageType = {
        id: `msg${Date.now()}`,
        sender: "Tú",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: true,
        avatar: "T",
      }
      setMessages([...messages, newMessage])
      setInputValue("")

      // Simular una respuesta después de analizar
      setTimeout(() => {
        setAiResponse(
          "La conversación muestra un nivel de interés alto (75%). Ana parece entusiasmada por compartir sus experiencias de senderismo y está haciendo preguntas para mantener la conversación. Estás en la Fase 2: Confort, con buena reciprocidad.",
        )
      }, 1000)
    }
  }

  // Función para proponer un mensaje
  const proposeMessage = () => {
    // Crear nuevas sugerencias de IA
    const newSuggestion: AISuggestionType = {
      id: `suggestion${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: [
        {
          id: "option1",
          title: "Opción 1 (Confianza: 9/10)",
          confidence: 9,
          message:
            "Mi lugar favorito es el Parque Natural de Cazorla. Tiene unas vistas impresionantes y senderos para todos los niveles. ¿Te gustaría que te mostrara algunas fotos de mi última excursión allí? Quizás podríamos organizar una salida juntos algún día.",
          interestImpact: {
            value: 5,
            reason: "Uso de elogio y pregunta abierta",
          },
          confidenceImpact: {
            value: 9,
            reason: "Lenguaje asertivo y propuesta clara",
          },
          escalationImpact: {
            from: 2,
            to: 3,
            description: "Avanza a Fase 3: Conexión",
          },
          explanation:
            "Esta respuesta muestra confianza al proponer un plan concreto, pero sin presionar. Combina información personal (tus lugares favoritos) con una invitación sutil que permite avanzar naturalmente a la siguiente fase.",
          avoidance: [
            "Evita sonar demasiado entusiasta con múltiples signos de exclamación",
            "No menciones inmediatamente que quieres una cita formal",
          ],
          reference: "Método de Escalada Natural, Fase 2-3",
        },
        {
          id: "option2",
          title: "Opción 2 (Confianza: 8/10)",
          confidence: 8,
          message:
            "¡Cazorla es mi paraíso! Tengo fotos increíbles de mi última aventura allí. ¿Te animas a una excursión un día de estos? Prometo buenas vistas y mejor compañía 😊",
          interestImpact: {
            value: 7,
            reason: "Tono casual y uso de emoji",
          },
          confidenceImpact: {
            value: 8,
            reason: "Estilo directo y juguetón",
          },
          escalationImpact: {
            from: 2,
            to: 3,
            description: "Avanza a Fase 3: Conexión",
          },
          explanation:
            "Esta versión es más casual y juguetona, ideal si la conversación ya tiene un tono relajado. El emoji y la promesa de 'mejor compañía' añaden un toque de coqueteo sutil que puede aumentar el interés.",
          avoidance: [
            "No uses más de un emoji para evitar parecer demasiado ansioso",
            "Evita bromas que puedan malinterpretarse por escrito",
          ],
        },
      ],
    }

    setAiSuggestions([...aiSuggestions, newSuggestion])

    // Desactivar la respuesta de IA anterior si existe
    setAiResponse(null)
  }

  // Función para refinar las sugerencias
  const refineSuggestions = (suggestionId: string) => {
    // Encontrar la sugerencia actual
    const currentSuggestionIndex = aiSuggestions.findIndex((s) => s.id === suggestionId)

    if (currentSuggestionIndex !== -1) {
      // Crear nuevas opciones refinadas
      const refinedSuggestion: AISuggestionType = {
        ...aiSuggestions[currentSuggestionIndex],
        id: `suggestion${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: [
          {
            id: "option1-refined",
            title: "Opción Refinada 1 (Confianza: 9.5/10)",
            confidence: 9.5,
            message:
              "Cazorla es espectacular, especialmente en esta época del año. Tengo algunas rutas secretas que poca gente conoce. Si te interesa el senderismo de verdad, podríamos explorarlas juntos este fin de semana. ¿Qué te parece?",
            interestImpact: {
              value: 8,
              reason: "Exclusividad y propuesta concreta",
            },
            confidenceImpact: {
              value: 9.5,
              reason: "Posicionamiento como experto",
            },
            escalationImpact: {
              from: 2,
              to: 3,
              description: "Avanza a Fase 3: Conexión",
            },
            explanation:
              "Esta respuesta te posiciona como alguien con conocimiento exclusivo, lo que genera curiosidad e interés. La propuesta para el fin de semana es directa pero casual, lo que muestra confianza sin parecer desesperado.",
            avoidance: [
              "No exageres tus conocimientos si no los tienes realmente",
              "Evita sonar presumido o condescendiente",
            ],
            reference: "Técnica de Valor Percibido, Cap. 4",
          },
          {
            id: "option2-refined",
            title: "Opción Refinada 2 (Confianza: 9/10)",
            confidence: 9,
            message:
              "Me encanta Sierra Nevada también, pero Cazorla tiene un encanto especial. Hay una cascada escondida que descubrí en mi última visita que te dejaría sin palabras. ¿Te gusta la fotografía? Sería un lugar perfecto para capturar algunas imágenes increíbles.",
            interestImpact: {
              value: 6,
              reason: "Conexión con sus intereses",
            },
            confidenceImpact: {
              value: 9,
              reason: "Conocimiento específico y pregunta personalizada",
            },
            escalationImpact: {
              from: 2,
              to: 2,
              description: "Fortalece Fase 2: Confort",
            },
            explanation:
              "Esta opción aprovecha la nota de contexto sobre su interés en la fotografía, creando una conexión más profunda. Aunque no avanza directamente a la Fase 3, fortalece significativamente la Fase 2, preparando mejor el terreno para una escalada natural.",
            avoidance: [
              "No fuerces la conversación hacia una cita si ella no muestra señales claras de interés",
              "Evita hablar solo de ti sin mostrar interés en sus pasiones",
            ],
          },
        ],
      }

      // Reemplazar la sugerencia anterior con la refinada
      const updatedSuggestions = [...aiSuggestions]
      updatedSuggestions[currentSuggestionIndex] = refinedSuggestion
      setAiSuggestions(updatedSuggestions)
    }
  }

  // Función para copiar un mensaje al portapapeles
  const copyMessageToClipboard = (message: string, optionId: string) => {
    navigator.clipboard.writeText(message).then(() => {
      setCopiedOption(optionId)
      setTimeout(() => setCopiedOption(null), 2000)
    })
  }

  // Combinar mensajes, notas y sugerencias en una sola línea temporal
  const timelineItems = [...messages, ...notes, ...aiSuggestions].sort((a, b) => {
    // Convertir timestamps a objetos Date para comparación
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Encabezado con botones de sidebar */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4 mx-2" />
          <div>
            <h1 className="text-xl font-semibold">Conversación con Ana</h1>
            <p className="text-sm text-muted-foreground">Tinder • Iniciada hace 2 días</p>
          </div>
        </div>
        <RightSidebarTrigger />
      </div>

      {/* Área de chat */}
      <ScrollArea className="flex-1 p-4 overflow-auto" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No hay mensajes aún</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Pega tu conversación en el área de texto de abajo para comenzar el análisis
              </p>
            </div>
          ) : (
            timelineItems.map((item) => {
              // Verificar si es una sugerencia de IA
              if ("options" in item) {
                const suggestion = item as AISuggestionType
                return (
                  <div key={suggestion.id} className="max-w-3xl mx-auto my-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        <Lightbulb className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-purple-700 dark:text-purple-300">IA Suggestion</h3>
                        <p className="text-xs text-muted-foreground">{suggestion.timestamp}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {suggestion.options.map((option) => (
                        <Card key={option.id} className="border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-3 border-b border-zinc-200 dark:border-zinc-700">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{option.title}</h4>
                              <Badge variant="outline" className="bg-zinc-200 dark:bg-zinc-700">
                                {option.confidence}/10
                              </Badge>
                            </div>
                          </div>

                          <div className="p-4 space-y-4">
                            {/* Mensaje sugerido */}
                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-md border border-zinc-200 dark:border-zinc-800">
                              <p className="text-sm italic">"{option.message}"</p>
                            </div>

                            {/* Impacto en stats */}
                            <div className="space-y-2">
                              <h5 className="text-xs font-medium uppercase text-muted-foreground">
                                Impacto en Métricas
                              </h5>

                              <div className="flex items-center justify-between">
                                <span className="text-xs">Nivel de Interés:</span>
                                <Badge
                                  variant={option.interestImpact.value > 5 ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  +{option.interestImpact.value}%
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{option.interestImpact.reason}</p>

                              <div className="flex items-center justify-between">
                                <span className="text-xs">Confianza Comunicacional:</span>
                                <Badge variant="outline" className="text-xs">
                                  {option.confidenceImpact.value}/10
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{option.confidenceImpact.reason}</p>

                              <div className="flex items-center justify-between">
                                <span className="text-xs">Fase de Escalada:</span>
                                <Badge
                                  variant={
                                    option.escalationImpact.to > option.escalationImpact.from ? "default" : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {option.escalationImpact.from} → {option.escalationImpact.to}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{option.escalationImpact.description}</p>
                            </div>

                            {/* Explicación */}
                            <div>
                              <h5 className="text-xs font-medium uppercase text-muted-foreground">Por qué funciona</h5>
                              <p className="text-xs mt-1">{option.explanation}</p>
                              {option.reference && (
                                <p className="text-xs italic mt-1 text-muted-foreground">Ref: {option.reference}</p>
                              )}
                            </div>

                            {/* Qué evitar */}
                            <div>
                              <h5 className="text-xs font-medium uppercase text-muted-foreground">Qué evitar</h5>
                              <ul className="text-xs mt-1 space-y-1">
                                {option.avoidance.map((item, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-red-500 mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex justify-between pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => copyMessageToClipboard(option.message, option.id)}
                              >
                                {copiedOption === option.id ? (
                                  <>
                                    <Check className="mr-1 h-3 w-3" />
                                    Copiado
                                  </>
                                ) : (
                                  <>
                                    <ClipboardCopy className="mr-1 h-3 w-3" />
                                    Copiar Mensaje
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="text-xs"
                                onClick={() => acceptSuggestion(option.message)}
                              >
                                <Send className="mr-1 h-3 w-3" />
                                Usar Mensaje
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Botón para refinar */}
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" onClick={() => refineSuggestions(suggestion.id)} className="text-sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Refinar Sugerencias
                      </Button>
                    </div>
                  </div>
                )
              }
              // Verificar si es una nota
              else if ("messageId" in item) {
                const note = item as NoteType
                return (
                  <div key={note.id} className="flex items-start gap-2 max-w-2xl mx-auto">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <Card className="p-3 bg-amber-50 border-amber-200">
                        <div className="flex justify-between items-start">
                          <span className="text-xs text-amber-700 font-medium">Nota de contexto</span>
                          <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm">{note.content}</p>
                      </Card>
                    </div>
                  </div>
                )
              } else {
                // Es un mensaje
                const message = item as MessageType
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 max-w-2xl ${message.isUser ? "ml-auto" : "mr-auto"}`}
                  >
                    {!message.isUser && (
                      <div
                        className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold`}
                      >
                        {message.avatar}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <Card className={`p-3 ${message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-medium">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          {/* Tamaño de letra diferente para el contenido del mensaje */}
                          <p className="mt-1 text-sm font-normal leading-relaxed">{message.content}</p>
                        </Card>

                        <Popover
                          open={activeMessageId === message.id}
                          onOpenChange={(open: boolean) => {
                            if (open) {
                              setActiveMessageId(message.id)
                            } else {
                              setActiveMessageId(null)
                            }
                          }}
                        >
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Agregar nota</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="font-medium">Agregar nota de contexto</h4>
                              <Textarea
                                placeholder="Escribe información relevante sobre este mensaje..."
                                value={noteContent}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteContent(e.target.value)}
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setActiveMessageId(null)}>
                                  Cancelar
                                </Button>
                                <Button size="sm" onClick={() => addNote(message.id)}>
                                  Guardar
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Mostrar notas asociadas a este mensaje */}
                      {notes
                        .filter((note) => note.messageId === message.id)
                        .map((note) => (
                          <div key={note.id} className="ml-2 mt-1">
                            <Card className="p-2 bg-amber-50 border-amber-200">
                              <div className="flex items-start gap-2">
                                <Calendar className="h-3 w-3 text-amber-600 mt-0.5" />
                                <div className="flex-1">
                                  <span className="text-xs text-amber-700">{note.content}</span>
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))}
                    </div>
                    {message.isUser && (
                      <div
                        className={`w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold`}
                      >
                        {message.avatar}
                      </div>
                    )}
                  </div>
                )
              }
            })
          )}

          {/* Respuesta de la IA */}
          {aiResponse && (
            <div className="max-w-2xl mx-auto mt-6">
              <Card className="p-4 border-2 border-purple-200 bg-purple-50 dark:bg-purple-950/20 dark:border-purple-800">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-purple-700 dark:text-purple-300">Asistente IA</span>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={proposeMessage}>
                                <Sparkles className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Proponer mensaje</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => setAiResponse(null)}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Descartar análisis</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-sm">{aiResponse}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Área de entrada y acciones */}
      <div className="border-t p-4 bg-background sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative">
            <Textarea
              placeholder={`Mauro: Hoy estuve enfocado en mis proyectos\nDani: Que genial yo también estuve poniéndome al día con mis cosas personales`}
              className="min-h-32 resize-none pr-10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            {/* Icono de ayuda en la esquina superior derecha del textarea */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <div className="space-y-2">
                    <p className="font-medium">Formato correcto para análisis:</p>
                    <div className="bg-muted p-2 rounded text-xs">
                      <p>Mauro: Hoy estuve enfocado en mis proyectos</p>
                      <p>Dani: Que genial yo también estuve poniéndome al día con mis cosas personales</p>
                    </div>
                    <p className="text-xs">
                      Para archivos más extensos exportados de WhatsApp, Telegram, etc., utiliza el botón "Adjuntar
                      archivo" para que sean analizados automáticamente.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleFileClick}>
                      <Paperclip className="mr-2 h-4 w-4" />
                      Adjuntar archivo
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjunta un archivo .txt o Word con tu conversación</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={proposeMessage}>
                <Sparkles className="mr-2 h-4 w-4" />
                Proponer Mensaje
              </Button>
              <Button onClick={analyzeConversation}>
                <Send className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  )
}

