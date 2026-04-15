import { Dispatch, FormEvent, SetStateAction } from "react";
import { AboutSection } from "@/src/sections/AboutSection";
import { ContactSection, SubmitStatus } from "@/src/sections/ContactSection";
import { PortfolioSection } from "@/src/sections/PortfolioSection";
import { ServicesSection } from "@/src/sections/ServicesSection";

type MobileSectionId = "about" | "services" | "portfolio" | "contact";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type HomePageProps = {
  mobileSection: MobileSectionId;
  isMobileMenuOpen: boolean;
  setMobileSection: (section: MobileSectionId) => void;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  formData: ContactFormData;
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
  handleSubmit: (e: FormEvent) => Promise<void>;
  submitStatus: SubmitStatus;
  errorMessage: string;
  isSubmitting: boolean;
  onOpenService: (slug: string) => void;
};

const mobileSections: { id: MobileSectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export function HomePage({
  mobileSection,
  isMobileMenuOpen,
  setMobileSection,
  setIsMobileMenuOpen,
  formData,
  setFormData,
  handleSubmit,
  submitStatus,
  errorMessage,
  isSubmitting,
  onOpenService,
}: HomePageProps) {
  return (
    <>
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
        {mobileSection === "services" && (
          <ServicesSection mobile onOpenService={onOpenService} />
        )}
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
        <ServicesSection onOpenService={onOpenService} />
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
    </>
  );
}
