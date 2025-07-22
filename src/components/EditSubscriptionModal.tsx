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
import { Edit } from "lucide-react";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useToast } from "@/hooks/use-toast";
import { Subscription } from "@/lib/firebase-services";

interface EditSubscriptionModalProps {
  subscription: Subscription;
  userId: string;
}

export function EditSubscriptionModal({ subscription, userId }: EditSubscriptionModalProps) {
  const { updateSubscription } = useSubscriptions(userId);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: subscription.name,
    category: subscription.category,
    price: subscription.price.toString(),
    billing: subscription.billing as "Monthly" | "Yearly" | "Weekly",
    currentBillingDate: "",
    status: subscription.status as "Active" | "Paused" | "Cancelled",
    description: subscription.description || "",
    website: subscription.website || ""
  });

  const categories = ["Entertainment", "Productivity", "Storage", "Other"];
  const billingOptions = ["Monthly", "Yearly", "Weekly"];
  const statusOptions = ["Active", "Paused", "Cancelled"];

  // Function to calculate next billing date based on current billing date and cycle
  const calculateNextBillingDate = (currentDate: string, billingCycle: string): string => {
    if (!currentDate) return "";
    
    const date = new Date(currentDate);
    const nextDate = new Date(date);
    
    switch (billingCycle) {
      case "Weekly":
        nextDate.setDate(date.getDate() + 7);
        break;
      case "Monthly":
        nextDate.setMonth(date.getMonth() + 1);
        break;
      case "Yearly":
        nextDate.setFullYear(date.getFullYear() + 1);
        break;
      default:
        return currentDate;
    }
    
    return nextDate.toISOString().split('T')[0];
  };

  // Calculate next billing date whenever current billing date or billing cycle changes
  const nextBillingDate = calculateNextBillingDate(formData.currentBillingDate, formData.billing);

  // Initialize current billing date when modal opens
  useEffect(() => {
    if (open && subscription.nextDue) {
      // Calculate the current billing date by subtracting one cycle from next due date
      const nextDueDate = new Date(subscription.nextDue);
      let currentBillingDate = new Date(nextDueDate);
      
      switch (subscription.billing) {
        case "Weekly":
          currentBillingDate.setDate(nextDueDate.getDate() - 7);
          break;
        case "Monthly":
          currentBillingDate.setMonth(nextDueDate.getMonth() - 1);
          break;
        case "Yearly":
          currentBillingDate.setFullYear(nextDueDate.getFullYear() - 1);
          break;
      }
      
      setFormData(prev => ({
        ...prev,
        currentBillingDate: currentBillingDate.toISOString().split('T')[0]
      }));
    }
  }, [open, subscription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.currentBillingDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    
    try {
      await updateSubscription(subscription.id!, {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        billing: formData.billing,
        nextDue: nextBillingDate,
        status: formData.status,
        description: formData.description,
        website: formData.website
      });

      toast({
        title: "Subscription updated!",
        description: "Your subscription has been successfully updated.",
      });

      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update subscription. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Subscription</DialogTitle>
          <DialogDescription>
            Update the details of your subscription.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Netflix, Spotify, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="15.99"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing">Billing Cycle *</Label>
              <Select value={formData.billing} onValueChange={(value: "Monthly" | "Yearly" | "Weekly") => setFormData({ ...formData, billing: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {billingOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentBillingDate">Current Billing Date *</Label>
              <Input
                id="currentBillingDate"
                type="date"
                value={formData.currentBillingDate}
                onChange={(e) => setFormData({ ...formData, currentBillingDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value: "Active" | "Paused" | "Cancelled") => setFormData({ ...formData, status: value })}>
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
          </div>

          {nextBillingDate && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Next billing date:</strong> {new Date(nextBillingDate).toLocaleDateString()}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Subscription"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 