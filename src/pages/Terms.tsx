import React from "react";
import { HeroHeader } from "@/components/blocks/hero-header";
import { Card } from "@/components/ui/card";
import { Shield, Globe, Info } from "lucide-react";

const toc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "user-obligations", label: "User Obligations" },
  { id: "subscriptions", label: "Subscriptions & Plans" },
  { id: "payments", label: "Payments & Billing" },
  { id: "privacy", label: "Privacy & Data Security" },
  { id: "ai", label: "AI & Automated Features" },
  { id: "termination", label: "Termination" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact Us" },
];

export default function Terms() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground mb-4">Last updated: June 2024</p>
          <p className="text-md text-muted-foreground max-w-xl">These Terms & Conditions apply globally to all users of Klyra. Please read them carefully before using our service.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col md:flex-row gap-8">
        {/* Sidebar TOC */}
        <aside className="md:w-64 flex-shrink-0 sticky top-28 self-start hidden md:block">
          <nav className="bg-white/80 dark:bg-neutral-900/80 rounded-xl shadow p-6 border border-primary/10">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> On this page</h3>
            <ul className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block px-2 py-1 rounded hover:bg-primary/10 text-primary font-medium transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 space-y-12">
          <section id="acceptance">
            <h2 className="font-bold text-2xl mb-4">1. Acceptance of Terms</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p>By accessing or using Klyra, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our service.</p>
            </Card>
          </section>
          <section id="user-obligations">
            <h2 className="font-bold text-2xl mb-4">2. User Obligations</h2>
            <p>You agree to provide accurate information, keep your account secure, and use Klyra only for lawful purposes. You are responsible for all activity under your account.</p>
          </section>
          <section id="subscriptions">
            <h2 className="font-bold text-2xl mb-4">3. Subscriptions & Plans</h2>
            <p>Klyra offers free and paid plans. Features and pricing are described on our Pricing page. We reserve the right to change plans or pricing at any time with notice.</p>
          </section>
          <section id="payments">
            <h2 className="font-bold text-2xl mb-4">4. Payments & Billing</h2>
            <p>Paid plans are billed in advance on a recurring basis. You authorize us to charge your payment method. All fees are non-refundable except as required by law.</p>
          </section>
          <section id="privacy">
            <h2 className="font-bold text-2xl mb-4">5. Privacy & Data Security</h2>
            <Card className="p-6 mb-4 flex items-center gap-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <Info className="h-6 w-6 text-primary" />
              <span>Your privacy is important to us. We use industry-standard security to protect your data. Please review our Privacy Policy for details on how we collect, use, and store your information.</span>
            </Card>
          </section>
          <section id="ai">
            <h2 className="font-bold text-2xl mb-4">6. AI & Automated Features</h2>
            <p>Klyra may use AI to provide smart insights and recommendations. AI results are for informational purposes only and should not be considered financial advice.</p>
          </section>
          <section id="termination">
            <h2 className="font-bold text-2xl mb-4">7. Termination</h2>
            <p>We may suspend or terminate your account for violation of these Terms or misuse of the service. You may cancel your account at any time from your settings.</p>
          </section>
          <section id="liability">
            <h2 className="font-bold text-2xl mb-4">8. Limitation of Liability</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p>Klyra is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
            </Card>
          </section>
          <section id="changes">
            <h2 className="font-bold text-2xl mb-4">9. Changes to Terms</h2>
            <p>We may update these Terms at any time. Continued use of Klyra after changes means you accept the new Terms. We will notify users of material changes.</p>
          </section>
          <section id="contact">
            <h2 className="font-bold text-2xl mb-4">10. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at <a href="mailto:support@klyra.com" className="text-primary underline">support@klyra.com</a>.</p>
          </section>
        </main>
      </div>
    </div>
  );
} 