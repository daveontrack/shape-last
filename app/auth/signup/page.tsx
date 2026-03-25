'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Heart } from 'lucide-react'
import { AuthForm } from '@/components/auth-form'

function SignUpContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  return (
    <div className='min-h-screen bg-secondary/30 flex flex-col'>
      {/* Header */}
      <header className='p-4'>
        <Link href='/' className='flex items-center gap-2 w-fit'>
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center'>
            <Heart className='w-5 h-5 text-primary-foreground' />
          </div>
          <span className='font-serif text-xl font-bold text-foreground'>
            SHAPE<span className='text-primary'>ethiopia</span>
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center space-y-2'>
            <h1 className='font-serif text-3xl font-bold'>
              Join Our Community
            </h1>
            <p className='text-muted-foreground'>
              Create an account to start making an impact
            </p>
          </div>

          {/* ✅ ONLY THIS */}
          <AuthForm mode='signup' redirectTo={redirectTo} />

          <div className='text-center'>
            <Link
              href='/'
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          <div className='w-8 h-8 rounded-full bg-primary animate-pulse' />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  )
}
