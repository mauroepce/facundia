"use client"

import * as React from "react"
import {
  ArrowUp,
  BarChart3,
  Brain,
  ChevronDown,
  HelpCircle,
  Settings,
  Target,
  TrendingUp,
  UserRound,
  MessageSquare,
  Clock,
  Sparkles,
  Heart,
  MessageCircle,
} from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"
import { Textarea } from "@workspace/ui/components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { useRightSidebar } from "./right-sidebar-context"

export function RightSidebar() {
  const { open } = useRightSidebar()
  const [interestLevel, setInterestLevel] = React.useState(65)
  const [confidenceLevel, setConfidenceLevel] = React.useState(8)

  // Estados para las nuevas secciones
  const [conversationObjective, setConversationObjective] = React.useState<string>("")
  const [objectiveDetails, setObjectiveDetails] = React.useState<string>("")
  const [conversationStyle, setConversationStyle] = React.useState<string>("")
  const [styleDetails, setStyleDetails] = React.useState<string>("")
  const [personDescription, setPersonDescription] = React.useState<string>("")

  // Análisis de la persona (generado automáticamente)
  const [personAnalysis, setPersonAnalysis] = React.useState<string[]>([
    "Intereses detectados: Senderismo, fotografía de naturaleza",
    "Comunica un tono amigable, uso moderado de emojis",
    "Probable horario de respuesta: Mañanas",
    "Muestra entusiasmo por actividades al aire libre",
    "Nivel de apertura: Alto (dispuesta a compartir experiencias personales)",
  ])

  // Simulate changing values
  React.useEffect(() => {
    const interval = setInterval(() => {
      setInterestLevel((prev) => {
        const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)
        return Math.min(Math.max(newValue, 30), 95) // Keep between 30-95
      })

      setConfidenceLevel((prev) => {
        const newValue = prev + (Math.random() > 0.5 ? 0.1 : -0.1)
        return Math.min(Math.max(Number.parseFloat(newValue.toFixed(1)), 5), 10) // Keep between 5-10
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`border-l bg-sidebar text-sidebar-foreground w-80 shrink-0 flex flex-col h-full transition-all duration-300 ease-in-out ${
        open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 w-0"
      }`}
    >
      <div className="p-4 min-w-80 overflow-y-auto flex-1">
        {/* Acordeón 1: Panel de Estadísticas */}
        <Collapsible defaultOpen className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
            <h2 className="text-l font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Panel de Estadísticas
            </h2>
            <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            {/* Interest Level */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Nivel de Interés
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Más información sobre Nivel de Interés</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Nivel de Interés
                        </DialogTitle>
                        <DialogDescription>
                          Evaluación del grado de reciprocidad y dinamismo en la conversación
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          El <strong>Nivel de Interés</strong> es un indicador clave que mide qué tan involucrada está
                          la otra persona en la conversación. Este indicador analiza:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Longitud de respuestas:</strong> Mensajes más largos y elaborados suelen indicar
                            mayor interés.
                          </li>
                          <li>
                            <strong>Tiempo de respuesta:</strong> Respuestas rápidas generalmente señalan mayor
                            entusiasmo.
                          </li>
                          <li>
                            <strong>Preguntas recíprocas:</strong> Si la otra persona también hace preguntas, muestra
                            curiosidad e interés.
                          </li>
                          <li>
                            <strong>Uso de emojis y exclamaciones:</strong> Pueden indicar entusiasmo y conexión
                            emocional.
                          </li>
                        </ul>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="font-medium mb-1">Interpretación:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <span className="text-red-500 font-medium">Bajo (0-40%):</span> Respuestas cortas, demoras
                              largas, poca iniciativa.
                            </li>
                            <li>
                              <span className="text-yellow-500 font-medium">Medio (41-70%):</span> Interacción moderada,
                              cierta reciprocidad.
                            </li>
                            <li>
                              <span className="text-green-500 font-medium">Alto (71-100%):</span> Gran entusiasmo,
                              respuestas rápidas y elaboradas, mucha iniciativa.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Engagement del usuario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{interestLevel}%</span>
                    <Badge variant={interestLevel > 70 ? "default" : interestLevel > 40 ? "outline" : "destructive"}>
                      {interestLevel > 70 ? "Alto" : interestLevel > 40 ? "Medio" : "Bajo"}
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getInterestColor(interestLevel)} transition-all duration-500`}
                      style={{ width: `${interestLevel}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Escalation Status */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <ArrowUp className="h-4 w-4" />
                    Estado de Escalada
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Más información sobre Estado de Escalada</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <ArrowUp className="h-5 w-5" />
                          Estado de Escalada
                        </DialogTitle>
                        <DialogDescription>
                          Fase en la que se encuentra la interacción, desde el primer contacto hasta acercamientos más
                          concretos
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          El <strong>Estado de Escalada</strong> determina en qué etapa se encuentra tu interacción con
                          la otra persona. Este indicador identifica patrones de comunicación que señalan la progresión
                          natural de una relación.
                        </p>
                        <div className="space-y-3">
                          <div className="bg-muted p-3 rounded-md">
                            <p className="font-medium mb-1 flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                <span className="text-xs font-bold">1</span>
                              </div>
                              Fase 1: Conocimiento
                            </p>
                            <p className="text-sm">
                              Intercambio inicial de información básica, intereses comunes y primeras impresiones. La
                              conversación es principalmente informativa y exploratoria.
                            </p>
                          </div>

                          <div className="bg-blue-500/10 border border-blue-500 p-3 rounded-md">
                            <p className="font-medium mb-1 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                              <div className="h-5 w-5 rounded-full border-2 border-blue-500 bg-blue-500 flex items-center justify-center text-white">
                                <span className="text-xs font-bold">2</span>
                              </div>
                              Fase 2: Confort
                            </p>
                            <p className="text-sm">
                              Desarrollo de comodidad mutua, bromas ligeras, algo de tensión positiva y señales de
                              interés más allá de lo amistoso. La conversación fluye con más naturalidad.
                            </p>
                          </div>

                          <div className="bg-muted p-3 rounded-md">
                            <p className="font-medium mb-1 flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                <span className="text-xs font-bold">3</span>
                              </div>
                              Fase 3: Conexión
                            </p>
                            <p className="text-sm">
                              Conversaciones más personales, intercambio de valores, planes concretos para verse,
                              señales claras de atracción mutua y posible planificación de encuentros.
                            </p>
                          </div>
                        </div>

                        <p className="text-sm">
                          Cada fase requiere estrategias de comunicación diferentes. Avanzar demasiado rápido o quedarse
                          estancado en una fase puede afectar negativamente la dinámica de la interacción.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Progreso de la conversación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Badge className="w-fit bg-blue-500 hover:bg-blue-600">Fase 2: Confort</Badge>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        <div className="h-2 w-6 rounded-l-full bg-blue-500"></div>
                        <div className="h-2 w-6 bg-blue-500"></div>
                        <div className="h-2 w-6 rounded-r-full bg-secondary"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">2/3</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
                    <span className="text-sm font-bold">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Confidence */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Confianza Comunicacional
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">Más información sobre Confianza Comunicacional</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          Confianza Comunicacional
                        </DialogTitle>
                        <DialogDescription>
                          Medición de qué tan seguro y asertivo te perciben en tus mensajes
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          La <strong>Confianza Comunicacional</strong> evalúa cómo proyectas seguridad y asertividad en
                          tus mensajes. Este indicador es crucial porque la forma en que te expresas influye
                          directamente en cómo te perciben.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Claridad y concisión:</strong> Mensajes directos sin ambigüedades o excesivas
                            disculpas.
                          </li>
                          <li>
                            <strong>Asertividad:</strong> Capacidad para expresar opiniones y deseos sin ser agresivo ni
                            pasivo.
                          </li>
                          <li>
                            <strong>Consistencia:</strong> Mantener un tono coherente que refleje personalidad
                            auténtica.
                          </li>
                          <li>
                            <strong>Iniciativa:</strong> Proponer ideas, temas o planes sin excesiva vacilación.
                          </li>
                        </ul>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="font-medium mb-1">Escala de puntuación:</p>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>
                              <span className="text-red-500 font-medium">1-5:</span> Comunicación insegura,
                              excesivamente complaciente o dubitativa.
                            </li>
                            <li>
                              <span className="text-yellow-500 font-medium">6-7:</span> Comunicación moderadamente
                              asertiva con ocasionales señales de inseguridad.
                            </li>
                            <li>
                              <span className="text-green-500 font-medium">8-10:</span> Comunicación segura, directa y
                              equilibrada que proyecta confianza sin arrogancia.
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm">
                          Mejorar tu confianza comunicacional puede transformar significativamente tus interacciones,
                          generando mayor respeto e interés por parte de tus interlocutores.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Seguridad y consistencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold">
                      {confidenceLevel.toFixed(1)}
                      <span className="text-sm text-muted-foreground">/10</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {confidenceLevel >= 8 ? "Excelente" : confidenceLevel >= 6 ? "Buena" : "Necesita mejorar"}
                    </span>
                  </div>
                  <CircularGauge value={confidenceLevel * 10} />
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Acordeón 2: Configuraciones y Análisis */}
        <Collapsible defaultOpen className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
            <h2 className="text-l font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuraciones y Análisis
            </h2>
            <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            {/* 1. Sección "Objetivo de la Conversación" */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Objetivo</h3>
                </div>
              </div>
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <Select value={conversationObjective} onValueChange={setConversationObjective}>
                    <SelectTrigger id="conversation-objective">
                      <SelectValue placeholder="Selecciona un objetivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendship">Amistad</SelectItem>
                      <SelectItem value="casual-date">Cita casual</SelectItem>
                      <SelectItem value="reconnect">Reconectar tras un conflicto</SelectItem>
                      <SelectItem value="serious-relationship">Relación seria</SelectItem>
                      <SelectItem value="other">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {conversationObjective === "other" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="objective-details">Detalla tu objetivo</Label>
                    <Input
                      id="objective-details"
                      placeholder="Detalla tu objetivo..."
                      value={objectiveDetails}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setObjectiveDetails(e.target.value)}
                      maxLength={80}
                    />
                    <p className="text-xs text-muted-foreground text-right">{objectiveDetails.length}/80</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 2. Sección "Estilo de Conversación" */}
            <div className="mb-4 pt-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Estilo</h3>
                </div>
              </div>
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <Select value={conversationStyle} onValueChange={setConversationStyle}>
                    <SelectTrigger id="conversation-style">
                      <SelectValue placeholder="Selecciona un estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fun">Divertido</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="romantic">Romántico</SelectItem>
                      <SelectItem value="sarcastic">Sarcasmo</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {conversationStyle === "custom" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="style-details">Describe el estilo que deseas</Label>
                    <Input
                      id="style-details"
                      placeholder="Describe el estilo que deseas..."
                      value={styleDetails}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStyleDetails(e.target.value)}
                      maxLength={80}
                    />
                    <p className="text-xs text-muted-foreground text-right">{styleDetails.length}/80</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 3. Sección "Descripción de la Persona" */}
            <div className="mb-4 pt-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Descripción de la Persona</h3>
                </div>
              </div>
              <div className="space-y-1.5 pt-1">
                <Textarea
                  placeholder="Ella se llama Ana, estudia psicología, vive en una casa grande, le encanta el café y la naturaleza..."
                  className="min-h-[80px] resize-none"
                  value={personDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPersonDescription(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* 4. Sección "Análisis de la Persona" (Auto-generado) */}
            <div className="mb-4 pt-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Análisis de la Persona</h3>
                </div>
              </div>
              <div className="space-y-3 pt-1">
                <div className="grid gap-3">
                  <Card className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold">Intereses detectados</h4>
                          <p className="text-xs text-muted-foreground">
                            Senderismo, fotografía de naturaleza, actividades al aire libre
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold">Estilo comunicativo</h4>
                          <p className="text-xs text-muted-foreground">
                            Tono amigable, uso moderado de emojis, preguntas abiertas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold">Patrones temporales</h4>
                          <p className="text-xs text-muted-foreground">
                            Responde principalmente por las mañanas, tiempo de respuesta promedio: 15 minutos
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-xs font-semibold">Nivel de apertura</h4>
                          <p className="text-xs text-muted-foreground">
                            Alto (dispuesta a compartir experiencias personales y hacer planes)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Actualizado automáticamente al analizar la conversación
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

// Custom Circular Gauge Component
function CircularGauge({ value }: { value: number }) {
  const normalizedValue = Math.min(Math.max(value, 0), 100)
  const circumference = 2 * Math.PI * 18 // 18 is the radius
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference

  // Calculate color based on value
  const getColor = () => {
    if (value < 50) return "#ef4444" // red-500
    if (value < 70) return "#eab308" // yellow-500
    return "#22c55e" // green-500
  }

  return (
    <div className="relative h-16 w-16 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 44 44">
        {/* Background circle */}
        <circle
          className="text-secondary"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="22"
          cy="22"
        />
        {/* Foreground circle */}
        <circle
          className="transition-all duration-300 ease-in-out"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={getColor()}
          fill="transparent"
          r="18"
          cx="22"
          cy="22"
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{Math.round(value)}%</span>
      </div>
    </div>
  )
}

const getInterestColor = (level: number) => {
  if (level > 70) return "bg-green-500"
  if (level > 40) return "bg-yellow-500"
  return "bg-red-500"
}

