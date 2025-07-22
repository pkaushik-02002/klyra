import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Calendar, 
  DollarSign, 
  Globe, 
  FileText,
  ExternalLink
} from "lucide-react";
import { Subscription } from "@/lib/firebase-services";
import { getSubscriptionLogo, getSubscriptionInitials, getSubscriptionColor } from "@/lib/subscription-logos";

interface ViewSubscriptionModalProps {
  subscription: Subscription;
}

export function ViewSubscriptionModal({ subscription }: ViewSubscriptionModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-white";
      case "Paused": return "bg-warning text-white";
      case "Cancelled": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold ${getSubscriptionColor(subscription.name)}`}>
              <img 
                src={getSubscriptionLogo(subscription.name)} 
                alt={subscription.name}
                className="h-6 w-6 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-sm hidden">{getSubscriptionInitials(subscription.name)}</span>
            </div>
            {subscription.name}
          </DialogTitle>
          <DialogDescription>
            Subscription details and billing information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Price
              </div>
              <div className="text-lg font-semibold">${subscription.price}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Billing Cycle
              </div>
              <div className="text-lg font-semibold">{subscription.billing}</div>
            </div>
          </div>

          {/* Next Due Date */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Next Due Date
            </div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {formatDate(subscription.nextDue)}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Status</div>
            <Badge className={getStatusColor(subscription.status)}>
              {subscription.status}
            </Badge>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="font-medium">{subscription.category}</div>
          </div>

          {/* Description */}
          {subscription.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                Description
              </div>
              <div className="text-sm">{subscription.description}</div>
            </div>
          )}

          {/* Website */}
          {subscription.website && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                Website
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={subscription.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {subscription.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {/* Created/Updated Info */}
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground">
              Subscription ID: {subscription.id}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 