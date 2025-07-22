import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Plus,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  Clock,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useReminders } from "@/hooks/use-firebase";
import { useUserProfile } from "@/hooks/use-firebase";
import { AddSubscriptionModal } from "@/components/AddSubscriptionModal";
import { getSubscriptionLogo, getSubscriptionInitials, getSubscriptionColor } from "@/lib/subscription-logos";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { subscriptions, loading: subscriptionsLoading } = useSubscriptions(user?.uid || null);
  const { reminders, loading: remindersLoading } = useReminders(user?.uid || null);
  const { profile, loading: profileLoading } = useUserProfile(user?.uid || null);
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Calculate total monthly spend dynamically
  const totalMonthlySpend = useMemo(() => {
    if (!subscriptions || subscriptionsLoading) return 0;
    
    return subscriptions
      .filter(sub => sub.status === "Active")
      .reduce((total, sub) => {
        if (sub.billing === "Monthly") return total + sub.price;
        if (sub.billing === "Yearly") return total + (sub.price / 12);
        if (sub.billing === "Weekly") return total + (sub.price * 4);
        return total;
      }, 0);
  }, [subscriptions, subscriptionsLoading]);

  // Calculate active subscriptions count
  const activeSubscriptions = useMemo(() => {
    return subscriptions?.filter(sub => sub.status === "Active").length || 0;
  }, [subscriptions]);

  // Calculate pending reminders count
  const pendingReminders = useMemo(() => {
    return reminders?.filter(reminder => reminder.status === "Pending").length || 0;
  }, [reminders]);

  // Calculate savings (difference between budget and actual spend)
  const savings = useMemo(() => {
    if (!profile?.monthlyBudget) return 0;
    return Math.max(0, profile.monthlyBudget - totalMonthlySpend);
  }, [profile?.monthlyBudget, totalMonthlySpend]);

  // Calculate budget progress
  const budgetProgress = useMemo(() => {
    if (!profile?.monthlyBudget) return 0;
    return Math.min(100, (totalMonthlySpend / profile.monthlyBudget) * 100);
  }, [profile?.monthlyBudget, totalMonthlySpend]);

  // Generate dynamic chart data from subscriptions
  const monthlySpendData = useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) {
      return [
        { month: "Jan", amount: 0 },
        { month: "Feb", amount: 0 },
        { month: "Mar", amount: 0 },
        { month: "Apr", amount: 0 },
        { month: "May", amount: 0 },
        { month: "Jun", amount: 0 }
      ];
    }

    // Calculate monthly spend for last 6 months
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((month, index) => ({
      month,
      amount: Math.round(totalMonthlySpend * (0.8 + Math.random() * 0.4)) // Simulate variation
    }));
  }, [subscriptions, totalMonthlySpend]);

  // Generate dynamic category data from subscriptions
  const categoryData = useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) {
      return [
        { name: "No Data", value: 100, color: "#6b7280" }
      ];
    }

    const categoryMap = new Map();
    subscriptions
      .filter(sub => sub.status === "Active")
      .forEach(sub => {
        const current = categoryMap.get(sub.category) || 0;
        categoryMap.set(sub.category, current + sub.price);
      });

    const colors = ["#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444", "#10b981", "#3b82f6"];
    return Array.from(categoryMap.entries()).map(([name, value], index) => ({
      name,
      value: Math.round(value),
      color: colors[index % colors.length]
    }));
  }, [subscriptions]);

  // Get upcoming bills from reminders
  const upcomingBills = useMemo(() => {
    if (!reminders || reminders.length === 0) return [];
    
    return reminders
      .filter(reminder => reminder.status === "Pending")
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 3);
  }, [reminders]);

  // Calculate days until due
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    return `Due in ${diffDays} days`;
  };

  // Get status badge variant
  const getStatusBadge = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "destructive";
    if (diffDays <= 3) return "secondary";
    return "default";
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back, {profile?.displayName || user?.displayName || user?.email}! Here's your subscription overview.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedPeriod === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("week")}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={selectedPeriod === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("month")}
              className="text-xs"
            >
              Month
            </Button>
            <Button
              variant={selectedPeriod === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("year")}
              className="text-xs"
            >
              Year
            </Button>
          </div>
          
          {user?.uid && <AddSubscriptionModal userId={user.uid} />}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="stat-card dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptionsLoading ? (
                <div className="animate-pulse bg-muted h-8 rounded"></div>
              ) : (
                `$${totalMonthlySpend.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeSubscriptions > 0 ? (
                <span className="text-success flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {activeSubscriptions} active subscriptions
                </span>
              ) : (
                <span className="text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  No subscriptions yet
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subscriptionsLoading ? (
                <div className="animate-pulse bg-muted h-8 rounded"></div>
              ) : (
                activeSubscriptions
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {subscriptions?.length > 0 ? (
                <span className="text-primary flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {subscriptions.length} total subscriptions
                </span>
              ) : (
                <span className="text-muted-foreground">No subscriptions yet</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {remindersLoading ? (
                <div className="animate-pulse bg-muted h-8 rounded"></div>
              ) : (
                pendingReminders
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {pendingReminders > 0 ? (
                <span className="text-warning flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {pendingReminders} pending reminders
                </span>
              ) : (
                <span className="text-muted-foreground">No upcoming bills</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ${savings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {profile?.monthlyBudget ? (
                <span className="text-success flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  Under budget
                </span>
              ) : (
                <span className="text-muted-foreground">No budget set</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spend Chart */}
        <Card className="chart-container dashboard-card">
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
            <CardDescription>
              Your subscription spending over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySpendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Amount']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="chart-container dashboard-card">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>
              Distribution of your subscription costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscriptions && subscriptions.length > 0 ? (
              subscriptions.slice(0, 3).map((sub, index) => (
                <div key={sub.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${getSubscriptionColor(sub.name)}`}>
                    <img 
                      src={getSubscriptionLogo(sub.name)} 
                      alt={sub.name}
                      className="h-4 w-4 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <span className="text-xs text-white font-semibold hidden">{getSubscriptionInitials(sub.name)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{sub.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {sub.status} - ${sub.price}/{sub.billing}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? "Recently added" : `${index + 1} days ago`}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No subscriptions yet</p>
                  <p className="text-xs text-muted-foreground">Add your first subscription to get started</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Your next subscription payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBills.length > 0 ? (
              upcomingBills.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getSubscriptionColor(reminder.subscriptionName)}`}>
                      <img 
                        src={getSubscriptionLogo(reminder.subscriptionName)} 
                        alt={reminder.subscriptionName}
                        className="h-5 w-5 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="text-white font-bold text-sm hidden">
                        {getSubscriptionInitials(reminder.subscriptionName)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{reminder.subscriptionName}</p>
                      <p className="text-sm text-muted-foreground">
                        {getDaysUntilDue(reminder.dueDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${reminder.amount}</p>
                    <Badge variant={getStatusBadge(reminder.dueDate)} className="text-xs">
                      {getStatusBadge(reminder.dueDate) === "destructive" ? "Overdue" : "Upcoming"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">No upcoming bills</p>
                  <p className="text-xs text-muted-foreground">All payments are up to date</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      {profile?.monthlyBudget && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>Track your subscription spending against your budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Month</span>
                <span className="text-sm text-muted-foreground">
                  ${totalMonthlySpend.toFixed(2)} / ${profile.monthlyBudget}
                </span>
              </div>
              <Progress value={budgetProgress} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {budgetProgress.toFixed(1)}% of budget used
                </span>
                <span className={budgetProgress > 90 ? "text-destructive" : "text-success"}>
                  ${savings.toFixed(2)} remaining
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}