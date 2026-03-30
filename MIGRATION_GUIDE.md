# Migration Guide: Frontend/Backend Separation

## Step 1: Understanding the Current Structure

Your current code is organized as:
```
/app - Next.js pages and routes
/components - UI components
/lib - Utilities and helpers
```

## Step 2: New Structure Setup

I've created:
```
/frontend - Move UI components here
/backend - Move API logic here
/app - Stays as-is (Next.js router)
```

## Step 3: What to Move Where

### Move to /frontend

1. **UI Components** - Move from `/components`
   ```
   /frontend/components/
   ├── auth-form.tsx
   ├── navigation.tsx
   ├── footer.tsx
   └── ui/ (shadcn components)
   ```

2. **Custom Hooks** - Create `/frontend/hooks/`
   ```
   /frontend/hooks/
   └── use-toast.ts
   ```

3. **Frontend Utils** - Create `/frontend/utils/`
   ```
   /frontend/utils/
   └── validation.ts (form validation only)
   ```

### Move to /backend

1. **API Handlers** - Create `/backend/api/`
   ```
   /backend/api/
   ├── donate-handler.ts
   ├── auth-handler.ts
   └── profile-handler.ts
   ```

2. **Services** - Create `/backend/services/`
   ```
   /backend/services/
   ├── donation-service.ts
   ├── user-service.ts
   └── email-service.ts
   ```

3. **Database Queries** - Create `/backend/database/`
   ```
   /backend/database/
   ├── donations.ts
   ├── users.ts
   └── profiles.ts
   ```

### Keep in /lib

- Supabase client setup
- Shared types
- Shared constants

## Step 4: Example Migration

### Before (Current)
File: `/app/api/donate/route.ts`
```typescript
// All logic mixed together
export async function POST(request: Request) {
  // Donation logic here
  // Database call
  // Email sending
  // Response
}
```

### After (Separated)
File: `/backend/api/donate-handler.ts`
```typescript
// Just the API logic
export async function handleDonation(request: Request) {
  const data = await request.json()
  const result = await saveDonation(data)
  await sendDonationEmail(data)
  return result
}
```

File: `/app/api/donate/route.ts`
```typescript
import { handleDonation } from "@/backend/api/donate-handler"

export async function POST(request: Request) {
  return handleDonation(request)
}
```

File: `/backend/services/donation-service.ts`
```typescript
export async function saveDonation(data) {
  const supabase = createClient()
  return supabase.from("donations").insert(data)
}
```

## Step 5: Update Imports

After moving files, update imports:

```typescript
// Old
import { DonationForm } from "@/components/donation-form"

// New
import { DonationForm } from "@/frontend/components/donation-form"
```

## Step 6: No tsconfig.json Changes Needed

If you have path aliases in tsconfig.json, everything will still work:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Step 7: Still Deploys as One App

- No changes to deployment process
- No changes to environment variables
- No changes to database connections
- App still deploys to Vercel normally

## Important Notes

1. **Don't move /app folder** - Next.js needs it there
2. **Update all imports** - Check for broken imports after moving
3. **Test locally** - Run `npm run dev` and test all features
4. **Still one database** - All code still shares same Supabase connection
5. **Performance** - No performance impact, same bundle size

## Checklist

- [ ] Create `/frontend` and `/backend` folders
- [ ] Move UI components to `/frontend/components`
- [ ] Move API handlers to `/backend/api`
- [ ] Move services to `/backend/services`
- [ ] Update import paths
- [ ] Test locally (`npm run dev`)
- [ ] Verify all features work
- [ ] Deploy to production
