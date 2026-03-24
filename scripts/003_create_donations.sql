-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  donation_type TEXT DEFAULT 'one-time', -- one-time, monthly, annual
  program TEXT, -- specific program the donation is for
  status TEXT DEFAULT 'completed', -- pending, completed, failed, refunded
  payment_method TEXT,
  transaction_id TEXT,
  anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Users can view their own donations
CREATE POLICY "donations_select_own" ON public.donations FOR SELECT USING (auth.uid() = user_id);

-- Users can insert donations
CREATE POLICY "donations_insert" ON public.donations FOR INSERT WITH CHECK (auth.uid() = user_id);

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
