# Complete Frontend/Backend Structure Guide

Your project is now organized to clearly separate **Frontend** (UI layer) from **Backend** (API/Database layer) while working as a single Next.js application.

## Directory Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── (pages)
│   ├── api/                      # API routes (import from /backend)
│   └── layout.tsx
│
├── frontend/                     # 🎨 UI Layer
│   ├── components/               # Reusable React components
│   ├── pages/                    # Page-level components
│   ├── hooks/                    # Custom React hooks
│   └── utils/                    # Frontend utilities
│
├── backend/                      # ⚙️ Server & Database Layer
│   ├── services/                 # Business logic
│   ├── api/                      # API utilities
│   ├── database/                 # DB queries
│   └── utils/                    # Backend utilities
│
├── components/                   # Legacy components (keep or migrate)
└── lib/                          # Legacy utilities (keep or migrate)
```

## Quick Start Examples

### 1. Create a Frontend Component
```typescript
// frontend/components/DonateButton.tsx
import { useState } from 'react'
import { useToast } from '@/frontend/hooks/useToast'

export function DonateButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function handleDonate() {
    setIsLoading(true)
    const response = await fetch('/api/donate', {
      method: 'POST',
      body: JSON.stringify({ amount: 50 })
    })
    const result = await response.json()
    
    if (result.success) {
      toast({ title: 'Donation successful!' })
    }
    setIsLoading(false)
  }

  return <button onClick={handleDonate}>Donate</button>
}
```

### 2. Create an API Endpoint
```typescript
// app/api/donate/route.ts
import { recordDonation } from '@/backend/services/donationService'
import { successResponse, errorResponse } from '@/backend/api/responseHandler'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const donation = await recordDonation(body)
    return Response.json(successResponse(donation))
  } catch (error) {
    return Response.json(errorResponse('Failed to process donation'), { status: 400 })
  }
}
```

### 3. Create a Backend Service
```typescript
// backend/services/donationService.ts
import { createDonation } from '@/backend/database/mutations'
import { sendDonationEmail } from '@/backend/services/emailService'
import { log } from '@/backend/utils/logger'

export async function recordDonation(data: any) {
  log('Recording donation', { amount: data.amount, email: data.email })
  
  const donation = await createDonation(data)
  await sendDonationEmail(data.email, data.amount)
  
  return donation
}
```

### 4. Create Database Queries
```typescript
// backend/database/mutations.ts
import { createClient } from '@/lib/supabase/server'

export async function createDonation(donation: any) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('donations')
    .insert([donation])
    .select()
  
  if (error) throw error
  return data[0]
}
```

## File Organization Summary

| Layer | Purpose | Location | Examples |
|-------|---------|----------|----------|
| **Frontend** | User Interface | `/frontend/components` | Navigation, Forms, Cards |
| **Frontend** | Page Logic | `/frontend/pages` | HomePage, DonationPage |
| **Frontend** | React Hooks | `/frontend/hooks` | useToast, useAuth |
| **Frontend** | UI Utils | `/frontend/utils` | formatCurrency, validators |
| **Backend** | Business Logic | `/backend/services` | donationService, userService |
| **Backend** | API Response | `/backend/api` | responseHandler, errorHandler |
| **Backend** | DB Queries | `/backend/database` | queries.ts, mutations.ts |
| **Backend** | Backend Utils | `/backend/utils` | logger, emailTemplates |
| **Routing** | API Routes | `/app/api` | Import from backend |
| **Routing** | Pages | `/app` | Import from frontend |

## Next Steps

1. Read the detailed README files in each folder:
   - `frontend/components/README.md` - Component organization
   - `backend/services/README.md` - Service creation
   - And others...

2. Start organizing your code gradually
3. Import from new structure in `/app` routes
4. Keep old `/components` and `/lib` during migration

This gives you clear understanding of where code belongs while keeping everything functional!
