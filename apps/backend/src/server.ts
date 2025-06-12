import { Hono } from 'hono'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { chatParserTool } from './mcp/tools/chat-parser'
import { supabaseClient } from './supabase/client'

const app = new Hono()

// Configuración MCP base
const mcp = new McpServer({
  name: 'chatAnalysys',
  version: '1.0',
  auth: {
    protocol: 'oauth',
    flows: ['authorization_code']
  }
})

// Registrar herramientas
mcp.registerTool(chatParserTool(supabaseClient))

// Configurar endpoint SSE
app.get('/sse', async (c) => {
  return mcp.handleSSE(c.req.raw)
})

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

export default app
