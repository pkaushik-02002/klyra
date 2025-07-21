import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  Calendar,
  DollarSign
} from "lucide-react";

// Mock subscription data
const subscriptions = [
  {
    id: "1",
    name: "Netflix", 
    category: "Entertainment",
    price: 15.99,
    billing: "Monthly",
    nextDue: "2024-01-15",
    status: "Active",
    logo: "N"
  },
  {
    id: "2", 
    name: "Spotify Premium",
    category: "Entertainment", 
    price: 9.99,
    billing: "Monthly",
    nextDue: "2024-01-18",
    status: "Active",
    logo: "S"
  },
  {
    id: "3",
    name: "Adobe Creative Cloud",
    category: "Productivity",
    price: 52.99,
    billing: "Monthly", 
    nextDue: "2024-01-20",
    status: "Active",
    logo: "A"
  },
  {
    id: "4",
    name: "Google Drive",
    category: "Storage",
    price: 9.99,
    billing: "Monthly",
    nextDue: "2024-01-25",
    status: "Active", 
    logo: "G"
  },
  {
    id: "5",
    name: "Figma Pro",
    category: "Productivity",
    price: 12.00,
    billing: "Monthly",
    nextDue: "2024-01-30",
    status: "Paused",
    logo: "F"
  }
];

const categories = ["All", "Entertainment", "Productivity", "Storage", "Other"];
const statuses = ["All", "Active", "Paused", "Cancelled"];

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || sub.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || sub.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalMonthlySpend = filteredSubscriptions
    .filter(sub => sub.status === "Active")
    .reduce((sum, sub) => sum + sub.price, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-white";
      case "Paused": return "bg-warning text-white";
      case "Cancelled": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage all your subscriptions in one place
          </p>
        </div>
        
        <Button className="premium-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Subscriptions</p>
                <p className="text-2xl font-bold">{filteredSubscriptions.length}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                <p className="text-2xl font-bold">${totalMonthlySpend.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-bold">3 days</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscriptions..."
                className="pl-9 premium-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* View Toggle */}
            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions List */}
      {viewMode === "table" ? (
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Your Subscriptions</CardTitle>
            <CardDescription>
              {filteredSubscriptions.length} subscription{filteredSubscriptions.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">
                          {subscription.logo}
                        </div>
                        {subscription.name}
                      </div>
                    </TableCell>
                    <TableCell>{subscription.category}</TableCell>
                    <TableCell>${subscription.price}</TableCell>
                    <TableCell>{subscription.billing}</TableCell>
                    <TableCell>{formatDate(subscription.nextDue)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="card-gradient hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                      {subscription.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{subscription.name}</h3>
                      <p className="text-sm text-muted-foreground">{subscription.category}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-semibold">${subscription.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Billing</span>
                    <span className="text-sm">{subscription.billing}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Next Due</span>
                    <span className="text-sm">{formatDate(subscription.nextDue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}