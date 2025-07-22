import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuthContext();

  console.log("ProtectedRoute - loading:", loading, "user:", user?.email, "user object:", user);

  if (loading) {
    console.log("ProtectedRoute - showing loading screen");
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute - User authenticated:", user.email, "rendering children");
  return <>{children}</>;
}; 