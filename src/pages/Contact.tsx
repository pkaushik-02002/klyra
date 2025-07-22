import React, { useState } from "react";
import { HeroHeader } from "@/components/blocks/hero-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background text-center">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
          <Send className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-4">We're here to help! Reach out with questions, feedback, or partnership inquiries.</p>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 pb-24 flex flex-col md:flex-row gap-12">
        {/* Contact Form */}
        <Card className="flex-1 p-8 shadow-lg bg-gradient-to-br from-primary/5 to-purple-100 dark:to-purple-900">
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2 text-primary">Thank you!</h2>
              <p className="text-muted-foreground">Your message has been sent. We'll get back to you soon.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">Send Message</Button>
            </form>
          )}
        </Card>
        {/* Contact Info & Map/Illustration */}
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <Card className="p-6 flex flex-col gap-4 items-start shadow-md">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm">support@subtracker.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm">Remote-first, serving users worldwide</span>
            </div>
          </Card>
          <Card className="p-0 overflow-hidden shadow-md">
            <img
              src="/images/logos/Klyra-official-logo.png"
              alt="Klyra Logo"
              title="Klyra Logo"
              className="w-full h-48 object-cover"
            />
          </Card>
        </div>
      </div>
    </div>
  );
} 