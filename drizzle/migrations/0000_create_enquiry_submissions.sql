CREATE TABLE public.enquiry_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiry_submissions TO anon;
GRANT ALL ON public.enquiry_submissions TO service_role;

ALTER TABLE public.enquiry_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.enquiry_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);