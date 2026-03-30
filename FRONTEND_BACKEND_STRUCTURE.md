# Frontend/Backend Code Organization

## Project Structure

This project uses a **monorepo architecture** - one Next.js app with separated frontend and backend code for clarity.

### Folder Organization

```
shapethiopia/
├── app/                           # Next.js App Router (entry point)
│   ├── api/                       # API routes
│   ├── auth/                      # Auth pages (uses /frontend)
│   ├── dashboard/                 # Dashboard pages (uses /frontend)
│   ├── donate/                    # Donation pages (uses /frontend)
│   └── [other pages]/
│
├── frontend/                      # FRONTEND CODE
│   ├── components/                # Reusable UI components
│   │   ├── auth-form.tsx
│   │   ├── navigation.tsx
│   │   ├── ui/                    # shadcn/ui components
│   │   └── [other components]/
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── [other hooks]/
│   └── utils/                     # Frontend utilities
│       ├── validation.ts
│       └── [other utils]/
│
├── backend/                       # BACKEND CODE
│   ├── services/                  # Database & external services
│   │   ├── user-service.ts        # User operations
│   │   ├── donation-service.ts    # Donation operations
│   │   └── [other services]/
│   ├── api/                       # API logic (used in /app/api)
│   │   ├── auth-handler.ts
│   │   ├── donation-handler.ts
│   │   └── [other handlers]/
│   ├── database/                  # Database queries
│   │   ├── profiles.ts
│   │   ├── donations.ts
│   │   └── [other queries]/
│   └── utils/                     # Backend utilities
│       ├── email.ts
│       ├── logger.ts
│       └── [other utils]/
│
├── lib/                           # Shared utilities (frontend + backend)
│   ├── supabase/
│   ├── auth.ts
│   └── types.ts
│
├── public/                        # Static files
├── package.json
└── tsconfig.json
```

## Which Files Go Where?

### Frontend (/frontend)
- React components
- Custom hooks (useEffect, useState, etc.)
- Form validation logic
- UI state management
- Frontend utilities (date formatting, string parsing, etc.)

### Backend (/backend)
- API request handlers
- Database queries
- External API calls (Resend, Stripe, etc.)
- Authentication logic
- Email services
- Business logic

### Shared (/lib)
- TypeScript types
- Supabase client setup
- Shared constants
- Utility functions used by both

## How to Use

### API Routes Example
File: `/app/api/donate/route.ts`
```typescript
import { handleDonation } from "@/backend/api/donation-handler"

export async function POST(request: Request) {
  return handleDonation(request)
}
```

### Pages Example
File: `/app/donate/page.tsx`
```typescript
import { DonationForm } from "@/frontend/components/donation-form"

export default function DonatePage() {
  return <DonationForm />
}
```

### Services Example
File: `/backend/services/donation-service.ts`
```typescript
import { createClient } from "@/lib/supabase/server"

export async function saveDonation(data: DonationData) {
  const supabase = createClient()
  return supabase.from("donations").insert(data)
}
```

## Benefits

1. **Clear Separation** - Easy to understand what's UI vs business logic
2. **Easier Testing** - Test backend services independently
3. **Better Organization** - Code is grouped by purpose
4. **Team Scalability** - Frontend devs and backend devs can work separately
5. **Single Deployment** - Still deploys as one Next.js app
6. **No Performance Impact** - All code is in same process

## Important Notes

- The `/app` folder is required by Next.js - don't move it
- All imports still work normally (TypeScript paths configured)
- Environment variables stay the same
- Database connections unchanged
- This is organizational only - no functionality changes

## Migration Checklist

- [ ] Review existing components to place in `/frontend`
- [ ] Review existing services to place in `/backend`
- [ ] Update import paths in API routes
- [ ] Update import paths in pages
- [ ] Test that everything still works
- [ ] Deploy to production
