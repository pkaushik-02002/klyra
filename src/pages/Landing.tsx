import { ArrowRight, CheckCircle, Star, Zap, Shield, BarChart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import { CTASection } from "@/components/ui/cta-with-rectangle";
import { Footer7 } from "@/components/ui/footer-7";

// Drawer for mobile nav
function MobileNavDrawer({ open, onClose, onNavigate, theme, setTheme }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-background shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 p-6 min-h-full">
          <div className="flex items-center gap-2 mb-6">
            <img src="/images/logos/Klyra-icon.png" alt="Klyra Logo" title="Klyra Logo" className="h-10 w-10 rounded-lg" />
          </div>
          <Button variant="ghost" className="justify-start w-full" onClick={() => { onNavigate("/#features"); onClose(); }}>Features</Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => { onNavigate("/#pricing"); onClose(); }}>Pricing</Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => { onNavigate("/#testimonials"); onClose(); }}>Testimonials</Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => { onNavigate("/#newsletter"); onClose(); }}>Newsletter</Button>
          <div className="border-t border-border my-4" />
          <Button variant="ghost" className="justify-start w-full" onClick={() => { setTheme(theme === "light" ? "dark" : "light"); onClose(); }}>
            {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />} Toggle Theme
          </Button>
          <Button variant="ghost" className="justify-start w-full" onClick={() => { onNavigate("/login"); onClose(); }}>Log In</Button>
          <Button className="premium-button w-full" onClick={() => { onNavigate("/signup"); onClose(); }}>Start Free</Button>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Helper for navigation (for both nav and drawer)
  const handleNav = (to) => {
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(to);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden max-w-full">
      {/* Only render the new nav/hero section from HeroSection. Remove the old nav bar. */}
      <HeroSection />
      {/* Mobile Drawer rendered at root level */}
      <MobileNavDrawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onNavigate={handleNav}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Features</h2>
            <p className="text-base md:text-lg text-muted-foreground">Discover what makes Klyra the best way to manage your subscriptions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
              <Star className="h-8 w-8 text-yellow-400 mb-2" />
              <h3 className="font-semibold text-lg mb-1">Intuitive & Beautiful Design</h3>
              <p className="text-muted-foreground text-sm">Enjoy a seamless, delightful experience on any device—mobile, tablet, or desktop.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-semibold text-lg mb-1">No More Surprises</h3>
              <p className="text-muted-foreground text-sm">Stay ahead of renewals and price hikes. Klyra keeps you informed and in control.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg mb-1">Actionable Insights</h3>
              <p className="text-muted-foreground text-sm">Get smart analytics to optimize your spending and discover where you can save.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg mb-1">Trusted & Secure</h3>
              <p className="text-muted-foreground text-sm">We use industry-leading security to protect your data. Your privacy is never compromised.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Why Choose Klyra?</h2>
            <p className="text-base md:text-lg text-muted-foreground">We go beyond tracking. Here’s why users love Klyra.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
              <Star className="h-7 w-7 md:h-8 md:w-8 text-yellow-400 mt-1" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1">Intuitive & Beautiful Design</h3>
                <p className="text-sm md:text-base text-muted-foreground">Enjoy a seamless, delightful experience on any device—mobile, tablet, or desktop.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
              <CheckCircle className="h-7 w-7 md:h-8 md:w-8 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1">No More Surprises</h3>
                <p className="text-sm md:text-base text-muted-foreground">Stay ahead of renewals and price hikes. Klyra keeps you informed and in control.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
              <BarChart className="h-7 w-7 md:h-8 md:w-8 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1">Actionable Insights</h3>
                <p className="text-sm md:text-base text-muted-foreground">Get smart analytics to optimize your spending and discover where you can save.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md">
              <Shield className="h-7 w-7 md:h-8 md:w-8 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-base md:text-lg mb-1">Trusted & Secure</h3>
                <p className="text-sm md:text-base text-muted-foreground">We use industry-leading security to protect your data. Your privacy is never compromised.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20">
        <TestimonialsSection
          title="Loved by users worldwide"
          description="Join thousands who trust Klyra to manage their subscriptions and save money."
          testimonials={[
            {
              author: {
                name: "Priya Sharma",
                handle: "@priyasharma",
                avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&crop=face"
              },
              text: "Klyra helped me discover and cancel 3 forgotten subscriptions. The reminders are a lifesaver!"
            },
            {
              author: {
                name: "Alex Kim",
                handle: "@alexkim",
                avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face"
              },
              text: "The dashboard is so clean and easy to use. I love seeing all my subscriptions in one place with Klyra."
            },
            {
              author: {
                name: "Maria Garcia",
                handle: "@mariagarcia",
                avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face"
              },
              text: "I never miss a renewal now. Klyra's notifications are always on time!"
            }
          ]}
        />
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-12 md:py-20">
        <CTASection
          badge={{ text: "Ready to save?" }}
          title="Start taking control of your subscriptions"
          description="Sign up and never miss a renewal again."
          action={{ text: "Get Started", href: "/signup" }}
        />
      </section>

      {/* Footer */}
      <Footer7 />
    </div>
  );
}