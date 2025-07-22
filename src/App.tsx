import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Landing from "./pages/Landing";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Reminders from "./pages/Reminders";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="subscription-tracker-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const AppRoutes = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("AppRoutes - current user:", user?.email);

  // Handle redirect when user state changes (for Google auth)
  React.useEffect(() => {
    console.log("AppRoutes - User state effect triggered, user:", user?.email);
    if (user) {
      console.log("AppRoutes - User state changed, checking if we need to redirect...");
      // If user is authenticated and we're on a public route, redirect to dashboard
      const currentPath = window.location.pathname;
      console.log("AppRoutes - Current path:", currentPath);
      if (currentPath === "/" || currentPath === "/login" || currentPath === "/signup") {
        console.log("AppRoutes - Redirecting authenticated user to dashboard");
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate("/app");
      }
    } else {
      console.log("AppRoutes - No user found, staying on current page");
    }
  }, [user, navigate, toast]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/docs" element={<Documentation />} />
      {/* Dashboard Routes */}
      <Route path="/app" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="insights" element={<Insights />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;