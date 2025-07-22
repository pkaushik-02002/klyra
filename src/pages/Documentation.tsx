import React from "react";
import { HeroHeader } from "@/components/blocks/hero-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Info, CheckCircle, Bell, BarChart, HelpCircle, Users } from "lucide-react";

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "managing", label: "Managing Subscriptions" },
  { id: "reminders", label: "Smart Reminders" },
  { id: "insights", label: "Insights & Analytics" },
  { id: "faq", label: "FAQ" },
  { id: "support", label: "Support" },
];

export default function Documentation() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      <section className="pt-32 pb-8 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Klyra Documentation</h1>
          <p className="text-lg text-muted-foreground mb-6">Everything you need to get the most out of Klyra.</p>
          <div className="flex justify-center mb-4">
            <Input placeholder="Search documentation..." className="max-w-md w-full shadow-md" />
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64 flex-shrink-0 sticky top-28 self-start hidden md:block">
          <nav className="bg-white/80 dark:bg-neutral-900/80 rounded-xl shadow p-6 border border-primary/10">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="block px-2 py-1 rounded hover:bg-primary/10 text-primary font-medium transition-colors">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 space-y-16">
          {/* Getting Started */}
          <section id="getting-started">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Getting Started</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p>Sign up for a free account, connect your subscriptions, and explore your dashboard. Klyra is designed to be intuitive and easy to use from day one.</p>
            </Card>
          </section>
          {/* Managing Subscriptions */}
          <section id="managing">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Managing Subscriptions</h2>
            <Card className="p-6 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Add, edit, or remove subscriptions with just a few clicks.</li>
                <li>Use the dashboard to see all your recurring expenses in one place.</li>
                <li>Tag, categorize, and search your subscriptions for easy management.</li>
              </ul>
            </Card>
          </section>
          {/* Smart Reminders */}
          <section id="reminders">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Smart Reminders</h2>
            <Card className="p-6 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Set up custom reminders for renewals, trials, and upcoming payments.</li>
                <li>Get notified by email or in-app so you never miss a renewal or get surprised by charges.</li>
                <li>Choose your preferred notification timing and channel.</li>
              </ul>
            </Card>
          </section>
          {/* Insights & Analytics */}
          <section id="insights">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><BarChart className="h-6 w-6 text-primary" /> Insights & Analytics</h2>
            <Card className="p-6 mb-4">
              <ul className="list-disc pl-6 space-y-2">
                <li>Unlock powerful analytics to understand your spending patterns.</li>
                <li>Discover savings opportunities and optimize your subscriptions.</li>
                <li>Export your data for personal finance tracking.</li>
              </ul>
            </Card>
          </section>
          {/* FAQ */}
          <section id="faq">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use industry-standard encryption and never sell your data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. You can cancel or downgrade your plan at any time from your settings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>How do I contact support?</AccordionTrigger>
                <AccordionContent>
                  Email us at <a href="mailto:support@subtracker.com" className="text-primary underline">support@subtracker.com</a>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
          {/* Support */}
          <section id="support">
            <h2 className="font-bold text-2xl mb-4 flex items-center gap-2"><Info className="h-6 w-6 text-primary" /> Support</h2>
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
              <p>Need more help? Visit our <a href="mailto:support@subtracker.com" className="text-primary underline">Support</a> or check our <a href="/privacy" className="text-primary underline">Privacy Policy</a> and <a href="/terms" className="text-primary underline">Terms</a>.</p>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
} 