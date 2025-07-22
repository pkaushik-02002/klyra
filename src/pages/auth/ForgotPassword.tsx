import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPassword } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await resetPassword(email);
      
      setEmailSent(true);
      toast({
        title: "Reset email sent!",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>

          <Card className="card-gradient shadow-premium text-center">
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">Check your email</CardTitle>
              <CardDescription className="mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </CardDescription>
              
              <div className="space-y-4">
                <Button 
                  className="premium-button w-full"
                  onClick={() => {
                    // Open email client
                    window.location.href = `mailto:${email}`;
                  }}
                >
                  Open Email App
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Try Another Email
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setEmailSent(false);
                  }}
                  className="text-primary hover:underline"
                >
                  try again
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to login */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/login")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>

        <Card className="card-gradient shadow-premium">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Forgot your password?</CardTitle>
            <CardDescription>
              No worries! Enter your email and we'll send you a reset link.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="premium-input pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="premium-button w-full" 
                disabled={loading}
              >
                {loading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertDescription>
            You'll receive an email with instructions to reset your password. 
            The link will expire in 24 hours for security.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}