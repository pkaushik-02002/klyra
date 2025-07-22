import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Download, 
  Trash2,
  Moon,
  Sun,
  Globe,
  CreditCard,
  LogOut
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/use-firebase";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useReminders } from "@/hooks/use-firebase";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { user, signOut } = useAuthContext();
  const { profile, updateProfile } = useUserProfile(user?.uid || null);
  const { subscriptions } = useSubscriptions(user?.uid || null);
  const { reminders } = useReminders(user?.uid || null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    timezone: "America/New_York",
    currency: "USD",
    monthlyBudget: ""
  });

  // Update profile data when user profile loads
  useEffect(() => {
    if (profile) {
      setProfileData({
        name: profile.displayName || "",
        email: profile.email || "",
        phone: "",
        timezone: "America/New_York",
        currency: profile.currency || "USD",
        monthlyBudget: profile.monthlyBudget?.toString() || ""
      });
    }
  }, [profile]);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    analytics: true,
    dataSharing: false,
    publicProfile: false
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (user?.uid) {
        await updateProfile({
          displayName: profileData.name,
          currency: profileData.currency,
          monthlyBudget: profileData.monthlyBudget ? parseFloat(profileData.monthlyBudget) : undefined
        });
        
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = (format: 'csv' | 'json') => {
    try {
      const exportData = {
        user: {
          displayName: profile?.displayName || user?.displayName,
          email: profile?.email || user?.email,
          currency: profile?.currency || "USD",
          monthlyBudget: profile?.monthlyBudget || 0,
          exportDate: new Date().toISOString()
        },
        subscriptions: subscriptions.map(sub => ({
          id: sub.id,
          name: sub.name,
          category: sub.category,
          price: sub.price,
          billing: sub.billing,
          nextDue: sub.nextDue,
          status: sub.status,
          description: sub.description,
          website: sub.website,
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt
        })),
        reminders: reminders.map(reminder => ({
          id: reminder.id,
          subscriptionId: reminder.subscriptionId,
          subscriptionName: reminder.subscriptionName,
          dueDate: reminder.dueDate,
          amount: reminder.amount,
          status: reminder.status,
          createdAt: reminder.createdAt
        })),
        summary: {
          totalSubscriptions: subscriptions.length,
          activeSubscriptions: subscriptions.filter(sub => sub.status === "Active").length,
          totalMonthlySpend: subscriptions
            .filter(sub => sub.status === "Active")
            .reduce((total, sub) => {
              if (sub.billing === "Monthly") return total + sub.price;
              if (sub.billing === "Yearly") return total + (sub.price / 12);
              if (sub.billing === "Weekly") return total + (sub.price * 4);
              return total;
            }, 0),
          totalReminders: reminders.length,
          pendingReminders: reminders.filter(r => r.status === "Pending").length
        }
      };

      if (format === 'csv') {
        // Export as CSV
        const csvContent = generateCSV(exportData);
        downloadFile(csvContent, `subscription-data-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
      } else if (format === 'json') {
        // Export as JSON
        const jsonContent = JSON.stringify(exportData, null, 2);
        downloadFile(jsonContent, `subscription-data-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      }

      toast({
        title: "Export Successful",
        description: `Your data has been exported as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
      });
    }
  };

  const generateCSV = (data: any) => {
    const lines = [];
    
    // User info
    lines.push('User Information');
    lines.push(`Name,${data.user.displayName || 'N/A'}`);
    lines.push(`Email,${data.user.email || 'N/A'}`);
    lines.push(`Currency,${data.user.currency}`);
    lines.push(`Monthly Budget,${data.user.monthlyBudget}`);
    lines.push(`Export Date,${data.user.exportDate}`);
    lines.push('');
    
    // Summary
    lines.push('Summary');
    lines.push(`Total Subscriptions,${data.summary.totalSubscriptions}`);
    lines.push(`Active Subscriptions,${data.summary.activeSubscriptions}`);
    lines.push(`Total Monthly Spend,${data.summary.totalMonthlySpend.toFixed(2)}`);
    lines.push(`Total Reminders,${data.summary.totalReminders}`);
    lines.push(`Pending Reminders,${data.summary.pendingReminders}`);
    lines.push('');
    
    // Subscriptions
    lines.push('Subscriptions');
    lines.push('Name,Category,Price,Billing,Next Due,Status,Description,Website');
    data.subscriptions.forEach((sub: any) => {
      lines.push(`${sub.name},${sub.category},${sub.price},${sub.billing},${sub.nextDue},${sub.status},${sub.description || ''},${sub.website || ''}`);
    });
    lines.push('');
    
    // Reminders
    lines.push('Reminders');
    lines.push('Subscription,Due Date,Amount,Status');
    data.reminders.forEach((reminder: any) => {
      lines.push(`${reminder.subscriptionName},${reminder.dueDate},${reminder.amount},${reminder.status}`);
    });
    
    return lines.join('\n');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation modal
    toast({
      variant: "destructive",
      title: "Account Deletion",
      description: "This feature requires additional confirmation.",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/10">
              <AvatarImage 
                src={profile?.photoURL || user?.photoURL} 
                alt={profile?.displayName || user?.displayName || "Profile"} 
              />
              <AvatarFallback className="text-lg bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-semibold">
                {(profile?.displayName || user?.displayName || "U").split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size of 800KB.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="premium-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="premium-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="premium-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={profileData.timezone} 
                  onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Chicago">Central Time</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Preferred Currency</Label>
              <Select 
                value={profileData.currency} 
                onValueChange={(value) => setProfileData({ ...profileData, currency: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyBudget">Monthly Budget</Label>
              <Input
                id="monthlyBudget"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={profileData.monthlyBudget}
                onChange={(e) => setProfileData({ ...profileData, monthlyBudget: e.target.value })}
                className="premium-input w-48"
              />
              <p className="text-xs text-muted-foreground">
                Set your monthly budget to track spending against your limit
              </p>
            </div>

            <Button type="submit" className="premium-button" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Control how you receive notifications about your subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive payment reminders and updates via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get instant notifications in your browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Receive text message reminders
                </p>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive tips, news, and promotional offers
                </p>
              </div>
              <Switch
                id="marketing-notifications"
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance & Privacy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={(value: any) => setTheme(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics</Label>
                <p className="text-xs text-muted-foreground">
                  Help improve the app
                </p>
              </div>
              <Switch
                checked={privacy.analytics}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Data Sharing</Label>
                <p className="text-xs text-muted-foreground">
                  Share anonymized usage data
                </p>
              </div>
              <Switch
                checked={privacy.dataSharing}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
              />
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export or delete your subscription data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Download your subscription data in CSV or JSON format
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportData('csv')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportData('json')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2 text-destructive">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing & Subscription */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing & Subscription
          </CardTitle>
          <CardDescription>
            Manage your SubTracker subscription
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Free Plan</h4>
              <p className="text-sm text-muted-foreground">
                Track up to 10 subscriptions with basic features
              </p>
            </div>
            <Badge variant="secondary">Current Plan</Badge>
          </div>

          <div className="space-y-2">
            <Button className="premium-button w-full">
              Upgrade to Pro
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Unlock unlimited subscriptions and advanced features
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}