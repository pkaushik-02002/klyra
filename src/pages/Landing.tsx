import { ArrowRight, CheckCircle, Star, Zap, Shield, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl">SubTracker</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button className="premium-button" onClick={() => navigate("/signup")}>
                Start Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6">
              🚀 Track unlimited subscriptions for free
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Track. Save.{" "}
              <span className="text-gradient">Stay In Control.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Never miss a payment or waste money on unused subscriptions. 
              Get real-time insights and smart reminders to optimize your spending.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="premium-button text-lg px-8 py-4"
                onClick={() => navigate("/signup")}
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate("/app")}
              >
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need to manage subscriptions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to save you time and money
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient hover-lift">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Spend Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your monthly spending across all subscriptions with live updates and detailed breakdowns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient hover-lift">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Renewal Reminders</h3>
                <p className="text-muted-foreground">
                  Get notified before payments are due with customizable alerts via email and SMS.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient hover-lift">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-6 w-6 text-info" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Monthly Insights</h3>
                <p className="text-muted-foreground">
                  Discover spending patterns, unused services, and opportunities to save money.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="card-gradient hover-lift">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <div className="text-4xl font-bold mb-2">$0</div>
                  <p className="text-muted-foreground">Forever free</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Up to 10 subscriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Basic reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Monthly reports</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="card-gradient hover-lift border-primary shadow-premium relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <div className="text-4xl font-bold mb-2">$4.99</div>
                  <p className="text-muted-foreground">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Unlimited subscriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Smart notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Export data</span>
                  </li>
                </ul>
                <Button className="premium-button w-full" onClick={() => navigate("/signup")}>
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>
            
            {/* Elite Plan */}
            <Card className="card-gradient hover-lift">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Elite</h3>
                  <div className="text-4xl font-bold mb-2">$9.99</div>
                  <p className="text-muted-foreground">Per month</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Custom categories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by thousands of users
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "SubTracker saved me over $200 last month by helping me identify subscriptions I wasn't using!"
                </p>
                <div className="font-semibold">Sarah M.</div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The insights feature is incredible. I finally understand where my money goes each month."
                </p>
                <div className="font-semibold">Mike D.</div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Clean interface, smart reminders, and great value. Highly recommend!"
                </p>
                <div className="font-semibold">Lisa K.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl">SubTracker</span>
              </div>
              <p className="text-muted-foreground">
                Take control of your subscriptions and save money every month.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Get tips on saving money and managing subscriptions.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="premium-input" />
                <Button className="premium-button">Subscribe</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              © 2024 SubTracker. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}