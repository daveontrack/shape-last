-- Create or update donations table for multi-step Ethiopian donation flow
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'ETB',
  campaign TEXT NOT NULL, -- Education, Clean Water, Women Empowerment, Community Development
  payment_method TEXT NOT NULL, -- stripe, bank_transfer
  transaction_id TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- pending, confirmed, failed
  is_anonymous BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,
  confirmed_at TIMESTAMPTZ,
  confirmed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "donations_select_own" ON public.donations;
DROP POLICY IF EXISTS "donations_insert" ON public.donations;
DROP POLICY IF EXISTS "admin_select_all_donations" ON public.donations;
DROP POLICY IF EXISTS "admin_update_donations" ON public.donations;

-- Users can view their own donations
CREATE POLICY "donations_select_own" ON public.donations FOR SELECT USING (auth.uid() = user_id);

-- Anyone can insert donations (for anonymous donations)
CREATE POLICY "donations_insert_any" ON public.donations FOR INSERT WITH CHECK (true);

-- Admin can view all donations
CREATE POLICY "admin_select_all_donations" ON public.donations FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admin can update donations
CREATE POLICY "admin_update_donations" ON public.donations FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS donations_user_id_idx ON public.donations(user_id);
CREATE INDEX IF NOT EXISTS donations_payment_status_idx ON public.donations(payment_status);
CREATE INDEX IF NOT EXISTS donations_campaign_idx ON public.donations(campaign);
