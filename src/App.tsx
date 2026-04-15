import { FormEvent, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesBySlug } from "@/src/data/services";
import { HomePage } from "@/src/pages/HomePage";
import { ServicePage } from "@/src/pages/ServicePage";
import { SubmitStatus } from "@/src/sections/ContactSection";

type MobileSectionId = "about" | "services" | "portfolio" | "contact";

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileSection, setMobileSection] = useState<MobileSectionId>("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [locationState, setLocationState] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }));

  useEffect(() => {
    const handleLocationChange = () => {
      setLocationState({
        pathname: window.location.pathname,
        hash: window.location.hash,
      });
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (!locationState.hash) {
      return;
    }

    const id = locationState.hash.replace("#", "");
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [locationState]);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setLocationState({
      pathname: window.location.pathname,
      hash: window.location.hash,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openService = (slug: string) => {
    navigate(`/services/${slug}`);
    setIsMobileMenuOpen(false);
  };

  const goHome = (hash?: string) => {
    navigate(hash ? `/${hash}` : "/");
  };

  const currentService = locationState.pathname.startsWith("/services/")
    ? servicesBySlug[locationState.pathname.replace("/services/", "")]
    : undefined;

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
          <button
            type="button"
            onClick={() => goHome()}
            className="font-serif text-left text-lg sm:text-2xl tracking-wide font-medium"
          >
            Zen Consultants
          </button>
          <Button
            variant="outline"
            className="md:hidden rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-[10px] px-4 h-10"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            <button
              type="button"
              onClick={() => goHome("#about")}
              className="hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => goHome("#services")}
              className="hover:opacity-60 transition-opacity"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => goHome("#portfolio")}
              className="hover:opacity-60 transition-opacity"
            >
              Portfolio
            </button>
            <Button
              variant="outline"
              className="rounded-full border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f5f2ed] uppercase tracking-widest text-xs px-6"
              onClick={() => goHome("#contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {currentService ? (
        <ServicePage
          service={currentService}
          onBackHome={() => goHome("#services")}
          onContact={() => goHome("#contact")}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitStatus={submitStatus}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
        />
      ) : (
        <HomePage
          mobileSection={mobileSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileSection={setMobileSection}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitStatus={submitStatus}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          onOpenService={openService}
        />
      )}

      <footer className="py-8 px-4 sm:px-6 border-t border-[#1a1a1a]/10 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} Zen Consultants. All rights reserved.</p>
      </footer>
    </div>
  );
}
