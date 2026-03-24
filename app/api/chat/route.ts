import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
} from 'ai'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 30

// Validate OpenAI API key is available
function validateOpenAIKey() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('[v0] OPENAI_API_KEY is not set. AI chat features will not work.')
    return false
  }
  return true
}

// Create Supabase client with anon key for server-side access
// Uses the public anon key since we don't have service role key
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[v0] Supabase environment variables not configured')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for SHAPEthiopia, a nonprofit organization dedicated to humanitarian impact and community development in Ethiopia.

Your role is to:
- Help visitors learn about SHAPEthiopia's programs and mission
- Guide potential volunteers through the volunteer process
- Assist with donation inquiries
- Answer questions about SHAPEthiopia's work in Ethiopia
- Provide information about the organization's centers and initiatives

Key information about SHAPEthiopia:
- Mission: Empowering communities and transforming lives in Ethiopia
- Focus areas: Education, healthcare, women's empowerment, child welfare, and community development
- Programs include: Education support, healthcare initiatives, women's empowerment programs, and child sponsorship

You have access to tools to query real data from the database:
- Use getDonationStats to get donation statistics
- Use getVolunteerStats to get volunteer application statistics
- Use getProgramInfo to get information about specific programs

Be friendly, helpful, and encouraging. Use the tools when users ask about statistics, impact, or specific data.
Always maintain a warm, compassionate tone that reflects the organization's humanitarian values.`

export async function POST(req: Request) {
  // Validate API key before processing
  if (!validateOpenAIKey()) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
  
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    tools: {
      getDonationStats: tool({
        description: 'Get donation statistics including total donations, total amount raised, and recent donations',
        inputSchema: z.object({}),
        execute: async () => {
          const supabase = getSupabaseClient()
          if (!supabase) {
            return { error: 'Database not available' }
          }
          
          const { data: donations, error } = await supabase
            .from('donations')
            .select('amount, program, payment_status, created_at')
            .eq('payment_status', 'completed')
            .order('created_at', { ascending: false })
            .limit(100)
          
          if (error) {
            return { error: 'Failed to fetch donation data' }
          }
          
          const totalAmount = donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0
          const totalDonations = donations?.length || 0
          const programBreakdown = donations?.reduce((acc, d) => {
            const program = d.program || 'general'
            acc[program] = (acc[program] || 0) + Number(d.amount)
            return acc
          }, {} as Record<string, number>)
          
          return {
            totalDonations,
            totalAmountRaised: totalAmount,
            currency: 'USD',
            programBreakdown,
            recentDonationsCount: donations?.filter(d => {
              const date = new Date(d.created_at)
              const weekAgo = new Date()
              weekAgo.setDate(weekAgo.getDate() - 7)
              return date > weekAgo
            }).length || 0
          }
        }
      }),
      
      getVolunteerStats: tool({
        description: 'Get volunteer application statistics including total applications and status breakdown',
        inputSchema: z.object({}),
        execute: async () => {
          const supabase = getSupabaseClient()
          if (!supabase) {
            return { error: 'Database not available' }
          }
          
          const { data: applications, error } = await supabase
            .from('volunteer_applications')
            .select('status, preferred_programs, created_at')
          
          if (error) {
            return { error: 'Failed to fetch volunteer data' }
          }
          
          const statusBreakdown = applications?.reduce((acc, a) => {
            acc[a.status] = (acc[a.status] || 0) + 1
            return acc
          }, {} as Record<string, number>)
          
          const programInterest = applications?.reduce((acc, a) => {
            if (a.preferred_programs) {
              for (const program of a.preferred_programs) {
                acc[program] = (acc[program] || 0) + 1
              }
            }
            return acc
          }, {} as Record<string, number>)
          
          return {
            totalApplications: applications?.length || 0,
            statusBreakdown,
            programInterest,
            pendingApplications: statusBreakdown?.pending || 0,
            approvedVolunteers: statusBreakdown?.approved || 0
          }
        }
      }),
      
      getProgramInfo: tool({
        description: 'Get information about SHAPEthiopia programs based on donation and volunteer data',
        inputSchema: z.object({
          programName: z.string().nullable().describe('Optional specific program name to get info about')
        }),
        execute: async ({ programName }) => {
          const programs = [
            {
              name: 'Education',
              slug: 'education',
              description: 'Supporting schools, providing supplies, and funding scholarships for Ethiopian children',
              impact: 'Helps children access quality education and build a brighter future'
            },
            {
              name: 'Healthcare',
              slug: 'healthcare', 
              description: 'Providing medical care, health education, and supporting clinics in underserved areas',
              impact: 'Improves health outcomes and saves lives in rural communities'
            },
            {
              name: 'Women Empowerment',
              slug: 'women-empowerment',
              description: 'Skills training, microfinance, and support programs for women',
              impact: 'Enables women to become financially independent and community leaders'
            },
            {
              name: 'Child Welfare',
              slug: 'child-welfare',
              description: 'Nutrition programs, safe housing, and comprehensive care for vulnerable children',
              impact: 'Ensures children have their basic needs met and can thrive'
            },
            {
              name: 'Community Development',
              slug: 'community-development',
              description: 'Infrastructure projects, clean water initiatives, and sustainable development',
              impact: 'Builds stronger, more resilient communities'
            }
          ]
          
          if (programName) {
            const program = programs.find(p => 
              p.name.toLowerCase().includes(programName.toLowerCase()) ||
              p.slug.toLowerCase().includes(programName.toLowerCase())
            )
            return program || { message: 'Program not found. Available programs: ' + programs.map(p => p.name).join(', ') }
          }
          
          return { programs }
        }
      })
    },
    maxSteps: 3,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeStream: consumeStream,
  })
}
