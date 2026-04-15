import { Dispatch, FormEvent, SetStateAction } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type SubmitStatus = "idle" | "success" | "error";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactSectionProps = {
  mobile?: boolean;
  formData: ContactFormData;
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  submitStatus: SubmitStatus;
  errorMessage: string;
  isSubmitting: boolean;
};

function ContactDetails() {
  const whatsappLink = "https://wa.me/918431502356";

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</div>
          <a
            href="mailto:zenconsultants2025@gmail.com"
            className="text-base sm:text-lg break-all hover:opacity-70 transition-opacity"
          >
            zenconsultants2025@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Phone</div>
          <a
            href="tel:+918431502356"
            className="text-base sm:text-lg hover:opacity-70 transition-opacity"
          >
            +91 84315 02356
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-50 mb-1">WhatsApp</div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg hover:opacity-70 transition-opacity"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest opacity-50 mb-1 mt-1">
            Office
          </div>
          <span className="text-base sm:text-lg leading-snug block max-w-[250px] sm:max-w-[320px]">
            Unit 101, Oxford Towers, No. 139/88 Old Airport Road, Bangalore 560008
          </span>
        </div>
      </div>
    </div>
  );
}

function ContactForm({
  formData,
  setFormData,
  handleSubmit,
  submitStatus,
  errorMessage,
  isSubmitting,
}: Omit<ContactSectionProps, "mobile">) {
  return (
    <div className="bg-white/5 p-5 sm:p-8 md:p-12 rounded-[1.75rem] sm:rounded-3xl border border-white/10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs uppercase tracking-widest opacity-70">
            Full Name
          </Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="bg-transparent border-white/20 text-white placeholder:text-white/30 h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-widest opacity-70">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@company.com"
            className="bg-transparent border-white/20 text-white placeholder:text-white/30 h-12 rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs uppercase tracking-widest opacity-70">
            How can we help?
          </Label>
          <Textarea
            id="message"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about your project..."
            className="bg-transparent border-white/20 text-white placeholder:text-white/30 min-h-[120px] rounded-none border-0 border-b focus-visible:ring-0 focus-visible:border-white px-0 resize-none"
          />
        </div>

        {submitStatus === "success" && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 text-green-200 text-sm rounded-lg">
            Thank you for your inquiry. We will get back to you shortly.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 text-red-200 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-white text-[#1a1a1a] hover:bg-white/90 h-12 sm:h-14 text-xs sm:text-sm uppercase tracking-widest mt-4 disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </Button>
      </form>
    </div>
  );
}

export function ContactSection({
  mobile = false,
  ...formProps
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={
        mobile
          ? "px-4 pb-8 bg-[#1a1a1a] text-[#f5f2ed]"
          : "py-16 sm:py-24 px-4 sm:px-6 bg-[#1a1a1a] text-[#f5f2ed]"
      }
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 sm:gap-16">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light mb-6 sm:mb-8">
            Let's build <br />
            <span className="italic text-gray-400">the future.</span>
          </h2>
          <p className="opacity-70 max-w-md mb-8 sm:mb-12 text-base sm:text-lg font-light">
            Ready to transform your business? Reach out to schedule a preliminary
            consultation with our partners.
          </p>
          <ContactDetails />
        </div>

        <ContactForm {...formProps} />
      </div>
    </section>
  );
}
