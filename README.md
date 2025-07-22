# BillWise Control Center - Subscription Tracker

A comprehensive subscription management application built with React, TypeScript, and Firebase.

## Features

### ✅ Authentication
- **Email/Password Authentication**: Sign up, sign in, and password reset
- **Google Authentication**: Sign in and sign up with Google
- **Protected Routes**: Secure access to dashboard features
- **User Profile Management**: Update profile information

### ✅ Subscription Management
- **Add Subscriptions**: Complete form with all subscription details
- **View Subscriptions**: Table and card view with filtering and search
- **Edit Subscriptions**: Update subscription status and details
- **Delete Subscriptions**: Remove subscriptions with confirmation
- **Real-time Data**: Live updates from Firebase Firestore

### ✅ Dashboard & Analytics
- **Real-time Stats**: Live subscription counts and spending
- **Monthly Spend Tracking**: Automatic calculation of monthly costs
- **Upcoming Bills**: Track payment reminders
- **Dynamic Charts**: Visual representation of spending data

### ✅ Reminders System
- **Add Reminders**: Create payment reminders for subscriptions
- **Manage Reminders**: View, edit, and delete reminders
- **Status Tracking**: Track reminder status (Pending, Sent, Dismissed)
- **Due Date Alerts**: Never miss a payment

### ✅ Insights & Analytics
- **Smart Insights**: AI-powered recommendations for subscription optimization
- **Spending Analysis**: Detailed breakdown of subscription costs
- **Duplicate Detection**: Identify and consolidate duplicate services
- **Budget Tracking**: Monitor spending against budget goals

### ✅ Settings & Profile
- **User Profile**: Update personal information and preferences
- **Notification Settings**: Configure email and push notifications
- **Theme Toggle**: Light and dark mode support
- **Data Export**: Export subscription data

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **State Management**: React Context, Custom Hooks
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd billwise-control-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Firebase Configuration

The application is configured with Firebase for:
- User authentication (email/password + Google)
- Real-time data storage (Firestore)
- File storage (Firebase Storage)
- Analytics (Firebase Analytics)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── layout/        # Layout components
│   └── modals/        # Modal components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/               # Firebase configuration and services
├── pages/             # Application pages
│   └── auth/          # Authentication pages
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ea11ea8f-448a-4729-bd24-4340a8f82603) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ea11ea8f-448a-4729-bd24-4340a8f82603) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
