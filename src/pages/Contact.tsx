import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Check, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { HeroHeader } from '@/components/blocks/hero-header';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FloatingLabelInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="peer h-14 bg-background/50 border-border/50 backdrop-blur-sm focus:border-[hsl(262,83%,58%)] focus:ring-2 focus:ring-[hsl(262,83%,58%)]/20 transition-all duration-300 pt-6 pb-2"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 pointer-events-none text-muted-foreground ${
          isFocused || value
            ? 'top-2 text-xs text-[hsl(262,83%,58%)]'
            : 'top-1/2 -translate-y-1/2 text-sm'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

interface FloatingLabelTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  required = false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="peer min-h-32 bg-background/50 border-border/50 backdrop-blur-sm focus:border-[hsl(262,83%,58%)] focus:ring-2 focus:ring-[hsl(262,83%,58%)]/20 transition-all duration-300 pt-6 pb-2 resize-none"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-300 pointer-events-none text-muted-foreground ${
          isFocused || value
            ? 'top-3 text-xs text-[hsl(262,83%,58%)]'
            : 'top-6 text-sm'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      <HeroHeader />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(262,83%,58%)]/5 via-transparent to-blue-500/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(262,83%,58%)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-[hsl(262,83%,58%)] to-blue-400 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question, feedback, or partnership idea? We'd love to hear from you.
            </p>
          </motion.div>
        </section>
        {/* Main Content */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-8 bg-background/40 backdrop-blur-xl border-border/50 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingLabelInput
                      id="name"
                      type="text"
                      label="Full Name"
                      value={formData.name}
                      onChange={(value) => updateFormData('name', value)}
                      required
                    />
                    <FloatingLabelInput
                      id="email"
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={(value) => updateFormData('email', value)}
                      required
                    />
                  </div>
                  <FloatingLabelInput
                    id="subject"
                    type="text"
                    label="Subject"
                    value={formData.subject}
                    onChange={(value) => updateFormData('subject', value)}
                    required
                  />
                  <FloatingLabelTextarea
                    id="message"
                    label="Message"
                    value={formData.message}
                    onChange={(value) => updateFormData('message', value)}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full h-14 bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,65%)] text-white font-semibold text-lg transition-all duration-300 disabled:opacity-50"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="submitting"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </motion.div>
                      ) : isSubmitted ? (
                        <motion.div
                          key="submitted"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          Message Sent!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Send Message
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>
              </Card>
            </motion.div>
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/50">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(262,83%,58%)]/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[hsl(262,83%,58%)]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">support@klyra.app</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Social Links */}
              <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/50">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Follow Us</h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 border-border/50 hover:border-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,58%)]/10 transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 border-border/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 border-border/50 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
              {/* Quick Info */}
              <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/50">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Response Time</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage; 