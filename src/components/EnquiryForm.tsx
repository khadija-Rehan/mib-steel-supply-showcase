import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { submitEnquiry, type EnquiryResult } from "@/lib/enquiry.functions";

const FIELD_CLASSES =
  "w-full rounded-lg border border-input bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

const LABEL_CLASSES = "mb-1.5 block text-sm font-medium text-foreground/90";

export function EnquiryForm() {
  const submit = useServerFn(submitEnquiry);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    setPending(true);
    try {
      const response = await submit({ data: form });
      setResult(response);
      if (response.ok) {
        setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch {
      setResult({
        ok: false,
        message: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-panel rounded-2xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={LABEL_CLASSES}>
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            maxLength={100}
            value={form.fullName}
            onChange={update("fullName")}
            className={FIELD_CLASSES}
            placeholder="Your full name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL_CLASSES}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            value={form.email}
            onChange={update("email")}
            className={FIELD_CLASSES}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className={LABEL_CLASSES}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            value={form.phone}
            onChange={update("phone")}
            className={FIELD_CLASSES}
            placeholder="+92 3XX XXXXXXX"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="subject" className={LABEL_CLASSES}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            required
            maxLength={150}
            value={form.subject}
            onChange={update("subject")}
            className={FIELD_CLASSES}
            placeholder="e.g. Quotation for GI sheets"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL_CLASSES}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            value={form.message}
            onChange={update("message")}
            className={FIELD_CLASSES}
            placeholder="Tell us about your material requirements…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-black/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Enquiry
          </>
        )}
      </button>

      <AnimatePresence>
        {result ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            aria-live="polite"
            className={`mt-5 flex items-start gap-3 rounded-lg border p-4 text-sm ${
              result.ok
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-destructive/50 bg-destructive/10 text-foreground"
            }`}
          >
            {result.ok ? (
              <>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Thank you — your enquiry has been received.</p>
                  <p className="mt-1 text-muted-foreground">
                    Our team will review your requirements and get back to you.
                    For an immediate response, call or WhatsApp us.
                  </p>
                </div>
              </>
            ) : (
              <>
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-semibold">Your enquiry could not be sent.</p>
                  <p className="mt-1 text-muted-foreground">{result.message}</p>
                </div>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
