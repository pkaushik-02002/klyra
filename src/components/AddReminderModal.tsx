import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell } from "lucide-react";
import { useReminders } from "@/hooks/use-firebase";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useToast } from "@/hooks/use-toast";

interface AddReminderModalProps {
  userId: string;
}

export function AddReminderModal({ userId }: AddReminderModalProps) {
  const { addReminder } = useReminders(userId);
  const { subscriptions } = useSubscriptions(userId);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subscriptionId: "",
    subscriptionName: "",
    dueDate: "",
    amount: "",
    status: "Pending" as "Pending" | "Sent" | "Dismissed"
  });

  const statusOptions = ["Pending", "Sent", "Dismissed"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subscriptionId || !formData.dueDate || !formData.amount) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    
    try {
      await addReminder({
        userId,
        subscriptionId: formData.subscriptionId,
        subscriptionName: formData.subscriptionName,
        dueDate: formData.dueDate,
        amount: parseFloat(formData.amount),
        status: formData.status
      });

      toast({
        title: "Reminder added!",
        description: "Your reminder has been successfully added.",
      });

      setOpen(false);
      setFormData({
        subscriptionId: "",
        subscriptionName: "",
        dueDate: "",
        amount: "",
        status: "Pending"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add reminder. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionChange = (subscriptionId: string) => {
    const subscription = subscriptions.find(sub => sub.id === subscriptionId);
    setFormData({
      ...formData,
      subscriptionId,
      subscriptionName: subscription?.name || "",
      amount: subscription?.price?.toString() || ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="premium-button">
          <Bell className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Reminder</DialogTitle>
          <DialogDescription>
            Create a reminder for an upcoming subscription payment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subscription">Subscription *</Label>
            <Select value={formData.subscriptionId} onValueChange={handleSubscriptionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subscription" />
              </SelectTrigger>
              <SelectContent>
                {subscriptions
                  .filter(sub => sub.status === "Active")
                  .map(subscription => (
                    <SelectItem key={subscription.id} value={subscription.id!}>
                      {subscription.name} - ${subscription.price}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="15.99"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <Select value={formData.status} onValueChange={(value: "Pending" | "Sent" | "Dismissed") => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Reminder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 