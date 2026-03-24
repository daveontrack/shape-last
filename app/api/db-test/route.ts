import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test the connection by getting the current timestamp from the database
    const { data, error } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
      .maybeSingle()
    
    // Even if the table doesn't exist, the connection is successful if we get a specific error
    if (error && !error.message.includes('does not exist')) {
      console.error('[v0] Database connection error:', error.message)
      return NextResponse.json({ 
        connected: false, 
        error: error.message 
      }, { status: 500 })
    }
    
    console.log('[v0] Database connection successful')
    return NextResponse.json({ 
      connected: true, 
      message: 'Database connection successful',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing'
    })
    
  } catch (err) {
    console.error('[v0] Database connection failed:', err)
    return NextResponse.json({ 
      connected: false, 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 })
  }
}
