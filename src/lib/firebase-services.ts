import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  User
} from "firebase/auth";
import { db, auth, googleProvider } from "./firebase";

// Types
export interface Subscription {
  id?: string;
  userId: string;
  name: string;
  category: string;
  price: number;
  billing: "Monthly" | "Yearly" | "Weekly";
  nextDue: string;
  status: "Active" | "Paused" | "Cancelled";
  logo?: string;
  description?: string;
  website?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface Reminder {
  id?: string;
  userId: string;
  subscriptionId: string;
  subscriptionName: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Sent" | "Dismissed";
  createdAt?: any;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  monthlyBudget?: number;
  currency?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Authentication Services
export const authService = {
  // Sign up
  async signUp(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // Create user profile in Firestore
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email,
        displayName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      console.log("Starting Google sign-in popup...");
      console.log("Current domain:", window.location.origin);
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in successful:", result.user.email);
      
      // Check if user profile exists in Firestore
      const userProfile = await userService.getUserProfile(result.user.uid);
      
      if (!userProfile) {
        console.log("Creating new user profile for Google user");
        try {
          // Create user profile in Firestore for new Google users
          await addDoc(collection(db, "users"), {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          console.log("User profile created successfully");
        } catch (error) {
          console.error("Error creating user profile:", error);
          // Don't throw the error, just log it
        }
      } else {
        console.log("User profile already exists");
      }
      
      return result.user;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    }
  }
};

// Subscription Services
export const subscriptionService = {
  // Get all subscriptions for a user
  async getSubscriptions(userId: string): Promise<Subscription[]> {
    try {
      const q = query(
        collection(db, "subscriptions"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const subscriptions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscription[];
      return subscriptions;
    } catch (error) {
      throw error;
    }
  },

  // Get single subscription
  async getSubscription(id: string): Promise<Subscription | null> {
    try {
      const docRef = doc(db, "subscriptions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Subscription;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Add new subscription
  async addSubscription(subscription: Omit<Subscription, "id">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "subscriptions"), {
        ...subscription,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Update subscription
  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<void> {
    try {
      const docRef = doc(db, "subscriptions", id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw error;
    }
  },

  // Delete subscription
  async deleteSubscription(id: string): Promise<void> {
    try {
      const docRef = doc(db, "subscriptions", id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Get subscriptions by category
  async getSubscriptionsByCategory(userId: string, category: string): Promise<Subscription[]> {
    try {
      const q = query(
        collection(db, "subscriptions"),
        where("userId", "==", userId),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscription[];
    } catch (error) {
      throw error;
    }
  },

  // Get total monthly spend
  async getTotalMonthlySpend(userId: string): Promise<number> {
    try {
      const subscriptions = await this.getSubscriptions(userId);
      return subscriptions
        .filter(sub => sub.status === "Active")
        .reduce((total, sub) => {
          if (sub.billing === "Monthly") return total + sub.price;
          if (sub.billing === "Yearly") return total + (sub.price / 12);
          if (sub.billing === "Weekly") return total + (sub.price * 4);
          return total;
        }, 0);
    } catch (error) {
      throw error;
    }
  }
};

// Reminder Services
export const reminderService = {
  // Get all reminders for a user
  async getReminders(userId: string): Promise<Reminder[]> {
    try {
      const q = query(
        collection(db, "reminders"),
        where("userId", "==", userId),
        orderBy("dueDate", "asc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reminder[];
    } catch (error) {
      throw error;
    }
  },

  // Add new reminder
  async addReminder(reminder: Omit<Reminder, "id">): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, "reminders"), {
        ...reminder,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  },

  // Update reminder
  async updateReminder(id: string, updates: Partial<Reminder>): Promise<void> {
    try {
      const docRef = doc(db, "reminders", id);
      await updateDoc(docRef, updates);
    } catch (error) {
      throw error;
    }
  },

  // Delete reminder
  async deleteReminder(id: string): Promise<void> {
    try {
      const docRef = doc(db, "reminders", id);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  },

  // Get pending reminders
  async getPendingReminders(userId: string): Promise<Reminder[]> {
    try {
      const q = query(
        collection(db, "reminders"),
        where("userId", "==", userId),
        where("status", "==", "Pending"),
        orderBy("dueDate", "asc")
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reminder[];
    } catch (error) {
      throw error;
    }
  }
};

// User Profile Services
export const userService = {
  // Get user profile
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      console.log("Getting user profile for uid:", uid);
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        console.log("User profile found:", doc.data());
        return { id: doc.id, ...doc.data() } as UserProfile;
      }
      console.log("No user profile found for uid:", uid);
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = doc(db, "users", querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      throw error;
    }
  }
}; 