import React from "react";
import { HeroHeader } from "@/components/blocks/hero-header";
import { Card } from "@/components/ui/card";
import { Shield, Globe, Info } from "lucide-react";

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "data-collection", label: "Data We Collect" },
  { id: "data-use", label: "How We Use Your Data" },
  { id: "data-sharing", label: "How We Share Data" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "security", label: "Data Security" },
  { id: "user-rights", label: "Your Rights" },
  { id: "gdpr-ccpa", label: "GDPR & CCPA" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes to Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function Privacy() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-4">Last updated: June 2024</p>
          <p className="text-md text-muted-foreground max-w-xl">This Privacy Policy explains how Klyra collects, uses, and protects your personal information globally. Please read it carefully.</p>
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
          <section id="introduction">
            <h2 className="font-bold text-2xl mb-4">1. Introduction</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p>Klyra is committed to protecting your privacy and complying with global data protection laws. This policy explains what data we collect, how we use it, and your rights.</p>
            </Card>
          </section>
          <section id="data-collection">
            <h2 className="font-bold text-2xl mb-4">2. Data We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Data:</strong> Name, email, password, and profile information.</li>
              <li><strong>Subscription Data:</strong> Details of your subscriptions, payment history, and preferences in Klyra.</li>
              <li><strong>Usage Data:</strong> Log data, device information, IP address, browser type, and usage analytics.</li>
              <li><strong>Support Data:</strong> Communications with our support team.</li>
            </ul>
          </section>
          <section id="data-use">
            <h2 className="font-bold text-2xl mb-4">3. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve Klyra services.</li>
              <li>To personalize your experience and deliver relevant content in Klyra.</li>
              <li>To send notifications, reminders, and service updates from Klyra.</li>
              <li>To process payments and manage subscriptions in Klyra.</li>
              <li>To respond to your inquiries and provide support for Klyra.</li>
              <li>To comply with legal obligations and enforce our terms for Klyra.</li>
            </ul>
          </section>
          <section id="data-sharing">
            <h2 className="font-bold text-2xl mb-4">4. How We Share Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do <strong>not</strong> sell your personal data.</li>
              <li>We do not share your personal data with any third parties.</li>
              <li>We may disclose data if required by law or to protect our rights and users.</li>
            </ul>
          </section>
          <section id="cookies">
            <h2 className="font-bold text-2xl mb-4">5. Cookies & Tracking</h2>
            <Card className="p-6 mb-4 flex items-center gap-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <Info className="h-6 w-6 text-primary" />
              <span>We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can manage cookie preferences in your browser.</span>
            </Card>
          </section>
          <section id="security">
            <h2 className="font-bold text-2xl mb-4">6. Data Security</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We use industry-standard security measures (encryption, access controls) to protect your data.</li>
              <li>We regularly review and update our security practices.</li>
              <li>Despite our efforts, no system is 100% secure. Please use strong passwords and protect your account.</li>
            </ul>
          </section>
          <section id="user-rights">
            <h2 className="font-bold text-2xl mb-4">7. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You can access, update, or delete your personal information at any time from your account settings.</li>
              <li>You can opt out of marketing communications.</li>
              <li>You can request a copy of your data or ask us to delete it (subject to legal requirements).</li>
            </ul>
          </section>
          <section id="gdpr-ccpa">
            <h2 className="font-bold text-2xl mb-4">8. GDPR & CCPA</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p><strong>GDPR (EU/UK):</strong> If you are in the EU/UK, you have the right to access, correct, or erase your data, restrict or object to processing, and data portability. You may also lodge a complaint with your local data protection authority.</p>
              <p className="mt-2"><strong>CCPA (California):</strong> California residents have the right to know what personal data is collected, request deletion, and opt out of the sale of personal data.</p>
            </Card>
          </section>
          <section id="children">
            <h2 className="font-bold text-2xl mb-4">10. Children's Privacy</h2>
            <p>Klyra is not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us for removal.</p>
          </section>
          <section id="changes">
            <h2 className="font-bold text-2xl mb-4">11. Changes to Policy</h2>
            <p>We may update this Privacy Policy at any time. Continued use of Klyra after changes means you accept the new policy. We will notify users of material changes.</p>
          </section>
          <section id="contact">
            <h2 className="font-bold text-2xl mb-4">12. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@klyra.com" className="text-primary underline">support@klyra.com</a>.</p>
          </section>
        </main>
      </div>
    </div>
  );
} 