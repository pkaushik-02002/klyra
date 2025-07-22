import React from "react";
import { HeroHeader } from "@/components/blocks/hero-header";
import { Shield, Zap, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Preetham Devulapally",
    role: "Founder",
    avatar: "/images/logos/407336793_6833926710054844_1424313180351365942_n.jpg.jpeg",
  },
  {
    name: "Arjun Ramdhan",
    role: "Co-founder",
    avatar: "/images/logos/1711113831220.jpeg",
  },
];

export default function About() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 min-h-screen">
      <HeroHeader />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-primary/20 to-background text-center overflow-hidden">
        {/* Animated Gradient or SVG Wave */}
        <div className="absolute inset-0 -z-10">
          <svg viewBox="0 0 1440 320" className="w-full h-40 md:h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#about-gradient)" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
            <defs>
              <linearGradient id="about-gradient" x1="0" y1="0" x2="1440" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9B99FE" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img src="/images/logos/Klyra-official-logo.png" alt="Klyra Logo" title="Klyra Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow-lg">About Klyra</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-medium">
            Empowering you to take control of your subscriptions, save money, and never miss a renewal again.
          </p>
          <p className="text-md md:text-lg text-primary font-semibold mb-8 italic">
            "Clarity. Control. Confidence."
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="relative flex flex-col items-center bg-white/60 dark:bg-neutral-900/70 rounded-2xl shadow-xl p-8 border border-primary/20 backdrop-blur-md transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative mb-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-28 w-28 rounded-full object-cover border-4 border-gradient-to-br from-primary to-purple-500 shadow-lg"
                  />
                </div>
                <h3 className="font-bold text-2xl mb-1 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent drop-shadow">
                  {member.name}
                </h3>
                <span className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {member.role}
                </span>
                {/* Optional: Add a fun fact or quote */}
                {/* <p className="text-muted-foreground text-sm italic mt-2">"Building for the future!"</p> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Shield className="h-10 w-10 text-primary mb-2" />} title="Privacy First" desc="Your data is always secure, encrypted, and never sold. Privacy is our promise." />
            <ValueCard icon={<Star className="h-10 w-10 text-primary mb-2" />} title="User-First" desc="We listen to our users and build features that truly help you save time and money." />
            <ValueCard icon={<Zap className="h-10 w-10 text-primary mb-2" />} title="Continuous Improvement" desc="We’re always learning, iterating, and improving Klyra for you." />
            <ValueCard icon={<Users className="h-10 w-10 text-primary mb-2" />} title="Community" desc="We’re building a supportive community of users who help each other thrive." />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-purple-100 dark:to-purple-900 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to take control?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of users who trust Klyra to manage their subscriptions and save money every month.</p>
          <Button asChild size="lg" className="rounded-xl px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:scale-105 transition-transform duration-200">
            <a href="/signup">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center bg-white/80 dark:bg-neutral-900/80 rounded-xl shadow-md p-6 transition hover:scale-105 hover:shadow-xl">
      {icon}
      <h3 className="font-semibold text-lg mb-1 text-primary drop-shadow">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
} 