import { FormEvent, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/src/sections/AboutSection";
import { ContactSection, SubmitStatus } from "@/src/sections/ContactSection";
import { PortfolioSection } from "@/src/sections/PortfolioSection";
import { ServicesSection } from "@/src/sections/ServicesSection";

type MobileSectionId = "about" | "services" | "portfolio" | "contact";

const mobileSections: { id: MobileSectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileSection, setMobileSection] = useState<MobileSectionId>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://sheetdb.io/api/v1/4cy25wq4abc58", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              name: formData.name,
              email: formData.email,
              message: formData.message,
              date: new Date().toISOString(),
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Network response was not ok");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error.message || "There was an error sending your message. Please try again later.",
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f2ed] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-[#f5f2ed]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2ed]/80 backdrop-blur-md border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="font-serif text-lg sm:text-2xl tracking-wide font-medium">
            Zen Consultants
          </div>
          <Button
            variant="outline"
            className="md:hidden rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-[10px] px-4 h-10"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <a href="#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="#services" className="hover:opacity-60 transition-opacity">
              Services
            </a>
            <a href="#portfolio" className="hover:opacity-60 transition-opacity">
              Portfolio
            </a>
            <Button
              variant="outline"
              className="rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-xs px-6"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      <div className="md:hidden pt-20 pb-6">
        <div className="px-4">
          <div className="flex items-center justify-between gap-4 pb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]/55">
                Mobile View
              </div>
              <div className="font-serif text-2xl text-[#1a1a1a]">
                {mobileSections.find((section) => section.id === mobileSection)?.label}
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-[#1a1a1a]/15 bg-white/70 px-4 h-10 text-[11px] uppercase tracking-[0.2em] text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="mb-6 rounded-[1.75rem] border border-[#1a1a1a]/10 bg-white p-2 shadow-sm">
              {mobileSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setMobileSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[1.25rem] px-4 py-3 text-left transition-colors ${
                    mobileSection === section.id
                      ? "bg-[#1a1a1a] text-[#f5f2ed]"
                      : "text-[#1a1a1a] hover:bg-[#f5f2ed]"
                  }`}
                >
                  <span className="font-medium">{section.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Open
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {mobileSection === "about" && <AboutSection mobile />}
        {mobileSection === "services" && <ServicesSection mobile />}
        {mobileSection === "portfolio" && <PortfolioSection mobile />}
        {mobileSection === "contact" && (
          <ContactSection
            mobile
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            submitStatus={submitStatus}
            errorMessage={errorMessage}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      <div className="hidden md:block">
        <AboutSection
          onViewWork={() =>
            document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitStatus={submitStatus}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
        />
      </div>

      <footer className="py-8 px-4 sm:px-6 border-t border-[#1a1a1a]/10 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} Zen Consultants. All rights reserved.</p>
      </footer>
    </div>
  );
}
