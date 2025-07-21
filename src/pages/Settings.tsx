import { useState } from "react";
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

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    currency: "USD"
  });

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
      // TODO: Update profile with Firebase
      console.log("Updating profile:", profileData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
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

  const handleExportData = (format: 'csv' | 'pdf') => {
    // TODO: Implement data export
    toast({
      title: `${format.toUpperCase()} Export`,
      description: "Your data export will be ready shortly and sent to your email.",
    });
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
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatars/01.png" alt="Profile" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
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
                Download your subscription data in various formats
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
                  onClick={() => handleExportData('pdf')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
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