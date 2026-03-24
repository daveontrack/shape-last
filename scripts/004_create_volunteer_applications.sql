-- Create volunteer applications table
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Ethiopia',
  occupation TEXT,
  skills TEXT[],
  availability TEXT, -- weekdays, weekends, flexible
  preferred_program TEXT,
  motivation TEXT,
  experience TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, active, inactive
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "volunteer_apps_select_own" ON public.volunteer_applications 
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert applications
CREATE POLICY "volunteer_apps_insert" ON public.volunteer_applications 
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Users can update their own pending applications
CREATE POLICY "volunteer_apps_update_own" ON public.volunteer_applications 
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Admin can view all applications
CREATE POLICY "admin_select_all_volunteer_apps" ON public.volunteer_applications FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Admin can update applications
CREATE POLICY "admin_update_volunteer_apps" ON public.volunteer_applications FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
    )
  );
