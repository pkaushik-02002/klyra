import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Settings
} from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useReminders } from "@/hooks/use-firebase";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useToast } from "@/hooks/use-toast";
import { AddReminderModal } from "@/components/AddReminderModal";

// Dynamic data will be calculated from subscriptions and reminders

const notificationSettings = [
  {
    id: "email-7days",
    label: "Email reminder 7 days before",
    description: "Get notified a week before payment is due",
    enabled: true,
    icon: Mail
  },
  {
    id: "email-1day", 
    label: "Email reminder 1 day before",
    description: "Last chance reminder before payment",
    enabled: true,
    icon: Mail
  },
  {
    id: "sms-1day",
    label: "SMS reminder 1 day before", 
    description: "Text message reminder (Premium feature)",
    enabled: false,
    icon: MessageSquare,
    premium: true
  },
  {
    id: "push-payment",
    label: "Push notification on payment",
    description: "Instant notification when payment is processed", 
    enabled: true,
    icon: Bell
  }
];

export default function Reminders() {
  const { user } = useAuthContext();
  const { reminders, loading: remindersLoading, deleteReminder, updateReminder } = useReminders(user?.uid || null);
  const { subscriptions } = useSubscriptions(user?.uid || null);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [settings, setSettings] = useState(notificationSettings);
  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ));
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteReminder(id);
      toast({
        title: "Reminder deleted",
        description: "The reminder has been successfully removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete reminder. Please try again.",
      });
    }
  };

  const handleUpdateReminderStatus = async (id: string, newStatus: "Pending" | "Sent" | "Dismissed") => {
    try {
      await updateReminder(id, { status: newStatus });
      toast({
        title: "Status updated",
        description: "The reminder status has been updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update reminder status. Please try again.",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due-soon": return "bg-destructive text-white";
      case "upcoming": return "bg-warning text-white";
      case "scheduled": return "bg-primary text-white";
      default: return "bg-muted";
    }
  };

  const getStatusText = (daysUntil: number) => {
    if (daysUntil <= 1) return "Due tomorrow";
    if (daysUntil <= 7) return `Due in ${daysUntil} days`;
    return `Due in ${daysUntil} days`;
  };

  // Calculate upcoming payments from subscriptions
  useEffect(() => {
    if (subscriptions.length > 0) {
      const today = new Date();
      const payments = subscriptions
        .filter(sub => sub.status === "Active")
        .map(sub => {
          const dueDate = new Date(sub.nextDue);
          const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          let status = "scheduled";
          if (daysUntil <= 1) status = "due-soon";
          else if (daysUntil <= 7) status = "upcoming";
          
          return {
            id: sub.id,
            service: sub.name,
            amount: sub.price,
            dueDate: dueDate,
            daysUntil: daysUntil,
            category: sub.category,
            status: status
          };
        })
        .filter(payment => payment.daysUntil >= 0) // Only future payments
        .sort((a, b) => a.daysUntil - b.daysUntil); // Sort by due date
      
      setUpcomingPayments(payments);
    }
  }, [subscriptions]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reminders</h1>
          <p className="text-muted-foreground">
            Stay on top of your subscription payments and never miss a due date
          </p>
        </div>
        
        {user?.uid && <AddReminderModal userId={user.uid} />}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due This Week</p>
                <p className="text-2xl font-bold">
                  {upcomingPayments.filter(payment => payment.daysUntil <= 7).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">
                  {upcomingPayments.filter(payment => payment.daysUntil <= 30).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Reminders</p>
                <p className="text-2xl font-bold">{reminders.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Your next subscription payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPayments.length > 0 ? (
              upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
                      {payment.service.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{payment.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {payment.dueDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${payment.amount}</p>
                    <Badge className={getStatusColor(payment.status)}>
                      {getStatusText(payment.daysUntil)}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming payments</p>
                <p className="text-sm">Add subscriptions to see payment reminders</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Payment Calendar</CardTitle>
            <CardDescription>Visual overview of your payment schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card className="card-gradient">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Customize how and when you receive payment reminders
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <setting.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={setting.id} className="font-medium">
                      {setting.label}
                    </Label>
                    {setting.premium && (
                      <Badge variant="secondary" className="text-xs">
                        Pro
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                onCheckedChange={() => toggleSetting(setting.id)}
                disabled={setting.premium}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reminder History */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Recent Reminders</CardTitle>
          <CardDescription>Your recent reminder activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
              <Bell className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Payment reminder sent</p>
              <p className="text-xs text-muted-foreground">Netflix payment due tomorrow - Email sent</p>
            </div>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Weekly summary sent</p>
              <p className="text-xs text-muted-foreground">4 payments due this week - Email delivered</p>
            </div>
            <span className="text-xs text-muted-foreground">1d ago</span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">SMS reminder sent</p>
              <p className="text-xs text-muted-foreground">Spotify payment due in 2 days - SMS delivered</p>
            </div>
            <span className="text-xs text-muted-foreground">3d ago</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}