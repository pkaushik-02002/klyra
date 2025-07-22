# Firebase Integration

This project has been successfully integrated with Firebase for authentication, data storage, and real-time functionality.

## Firebase Services Used

### 1. Authentication
- **Email/Password Authentication**: Users can sign up, sign in, and reset passwords
- **User Management**: User profiles are stored in Firestore
- **Protected Routes**: Unauthenticated users are redirected to login

### 2. Firestore Database
- **Subscriptions Collection**: Stores user subscription data
- **Reminders Collection**: Stores payment reminders
- **Users Collection**: Stores user profile information

### 3. Firebase Configuration
The Firebase configuration is located in `src/lib/firebase.ts` with the following services:
- Authentication (`auth`)
- Firestore Database (`db`)
- Storage (`storage`)
- Analytics (`analytics`)

## Features Implemented

### Authentication
- ✅ User registration with email/password
- ✅ User login with email/password
- ✅ Password reset functionality
- ✅ Protected routes for authenticated users
- ✅ User sign-out functionality
- ✅ User profile display in header

### Subscriptions Management
- ✅ Add new subscriptions with full details
- ✅ View all subscriptions in table/card view
- ✅ Filter subscriptions by category and status
- ✅ Search subscriptions by name
- ✅ Delete subscriptions
- ✅ Update subscription status
- ✅ Real-time data from Firestore

### Dashboard
- ✅ Real-time subscription count
- ✅ Real-time monthly spend calculation
- ✅ Real-time reminder count
- ✅ Dynamic stats based on Firebase data

### Reminders
- ✅ View all reminders
- ✅ Delete reminders
- ✅ Update reminder status
- ✅ Real-time data from Firestore

## Data Structure

### Subscription Document
```typescript
{
  id: string;
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Reminder Document
```typescript
{
  id: string;
  userId: string;
  subscriptionId: string;
  subscriptionName: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Sent" | "Dismissed";
  createdAt: Timestamp;
}
```

### User Profile Document
```typescript
{
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  monthlyBudget?: number;
  currency?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Firebase Security Rules

Make sure to set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Subscriptions - users can only access their own
    match /subscriptions/{subscriptionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Reminders - users can only access their own
    match /reminders/{reminderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Getting Started

1. **Install Dependencies**: The Firebase SDK is already installed
2. **Firebase Configuration**: The configuration is already set up in `src/lib/firebase.ts`
3. **Start Development Server**: Run `npm run dev`
4. **Test Authentication**: Try signing up and logging in
5. **Add Subscriptions**: Use the "Add Subscription" button to create test data

## Next Steps

- [ ] Add Google Authentication
- [ ] Implement real-time notifications
- [ ] Add subscription analytics and insights
- [ ] Implement reminder scheduling
- [ ] Add data export functionality
- [ ] Implement subscription sharing features 