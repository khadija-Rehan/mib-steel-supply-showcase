import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be less than 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email must be less than 255 characters."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number.")
    .max(20, "Phone number must be less than 20 characters."),
  subject: z
    .string()
    .trim()
    .min(2, "Please enter a subject.")
    .max(150, "Subject must be less than 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a message of at least 10 characters.")
    .max(2000, "Message must be less than 2000 characters."),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Public enquiry form handler. Validates input, then stores the submission.
 * Uses the publishable client with an insert-only anon RLS policy — no
 * privileged credentials and no read access.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw new Error(first?.message ?? "Please check the form and try again.");
    }
    return parsed.data;
  })
  .handler(async ({ data }): Promise<EnquiryResult> => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const url = process.env["SUPABASE_URL"];
      const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
      if (!url || !key) throw new Error("Backend is not configured.");

      const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
        // Opaque sb_ keys aren't JWTs: send only apikey, never a Bearer header.
        global: {
          fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
              headers.delete("Authorization");
            }
            headers.set("apikey", key);
            return fetch(input, { ...init, headers });
          },
        },
      });

      const { error } = await supabase.from("enquiry_submissions").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });
      if (error) throw new Error(error.message);

      return { ok: true };
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again or contact us directly.";
      return { ok: false, message };
    }
  });
