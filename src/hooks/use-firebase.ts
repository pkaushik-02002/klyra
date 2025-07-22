import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  authService, 
  subscriptionService, 
  reminderService, 
  userService,
  type Subscription,
  type Reminder,
  type UserProfile
} from "@/lib/firebase-services";

// Authentication Hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener...");
    
    let unsubscribe: (() => void) | undefined;
    
    const setupAuth = async () => {
      // Add a small delay to ensure Firebase is fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Set up the auth state listener
      console.log("Setting up auth state listener...");
      unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user ? user.email : "No user");
        console.log("User object:", user);
        console.log("Current auth state - user:", user?.uid, "email:", user?.email);
        setUser(user);
        setLoading(false);
      });
    };

    setupAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      return await authService.signUp(email, password, displayName);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      return await authService.signIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      throw error;
    }
  };



  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle
  };
};

// Subscriptions Hook
export const useSubscriptions = (userId: string | null) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getSubscriptions(userId);
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const addSubscription = async (subscription: Omit<Subscription, "id">) => {
    if (!userId) throw new Error("User not authenticated");
    
    try {
      const id = await subscriptionService.addSubscription({
        ...subscription,
        userId
      });
      await fetchSubscriptions();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add subscription");
      throw err;
    }
  };

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    try {
      await subscriptionService.updateSubscription(id, updates);
      await fetchSubscriptions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update subscription");
      throw err;
    }
  };

  const deleteSubscription = async (id: string) => {
    try {
      await subscriptionService.deleteSubscription(id);
      await fetchSubscriptions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete subscription");
      throw err;
    }
  };

  const getTotalMonthlySpend = async (): Promise<number> => {
    if (!userId) return 0;
    
    try {
      return await subscriptionService.getTotalMonthlySpend(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate monthly spend");
      return 0;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSubscriptions();
    }
  }, [userId]);

  return {
    subscriptions,
    loading,
    error,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getTotalMonthlySpend,
    refetch: fetchSubscriptions
  };
};

// Reminders Hook
export const useReminders = (userId: string | null) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await reminderService.getReminders(userId);
      setReminders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch reminders");
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: Omit<Reminder, "id">) => {
    if (!userId) throw new Error("User not authenticated");
    
    try {
      const id = await reminderService.addReminder({
        ...reminder,
        userId
      });
      await fetchReminders();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reminder");
      throw err;
    }
  };

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    try {
      await reminderService.updateReminder(id, updates);
      await fetchReminders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update reminder");
      throw err;
    }
  };

  const deleteReminder = async (id: string) => {
    try {
      await reminderService.deleteReminder(id);
      await fetchReminders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete reminder");
      throw err;
    }
  };

  const getPendingReminders = async (): Promise<Reminder[]> => {
    if (!userId) return [];
    
    try {
      return await reminderService.getPendingReminders(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pending reminders");
      return [];
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReminders();
    }
  }, [userId]);

  return {
    reminders,
    loading,
    error,
    addReminder,
    updateReminder,
    deleteReminder,
    getPendingReminders,
    refetch: fetchReminders
  };
};

// User Profile Hook
export const useUserProfile = (userId: string | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUserProfile(userId);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userId) throw new Error("User not authenticated");
    
    try {
      await userService.updateUserProfile(userId, updates);
      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
}; 