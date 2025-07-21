import { useState } from "react";
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
  CheckCircle 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for charts
const monthlySpendData = [
  { month: "Jan", amount: 127 },
  { month: "Feb", amount: 142 },
  { month: "Mar", amount: 156 },
  { month: "Apr", amount: 148 },
  { month: "May", amount: 167 },
  { month: "Jun", amount: 159 }
];

const categoryData = [
  { name: "Entertainment", value: 45, color: "#8b5cf6" },
  { name: "Productivity", value: 32, color: "#06b6d4" },
  { name: "Storage", value: 18, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#ef4444" }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your subscription overview.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedPeriod === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("week")}
            >
              Week
            </Button>
            <Button
              variant={selectedPeriod === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("month")}
            >
              Month
            </Button>
            <Button
              variant={selectedPeriod === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("year")}
            >
              Year
            </Button>
          </div>
          
          <Button className="premium-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$159.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↗ +12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">↗ +2</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Due in next 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">$23.00</div>
            <p className="text-xs text-muted-foreground">
              From cancelled subscriptions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spend Chart */}
        <Card className="card-gradient">
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
        <Card className="card-gradient">
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
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment processed</p>
                <p className="text-xs text-muted-foreground">Spotify Premium - $9.99</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">New subscription added</p>
                <p className="text-xs text-muted-foreground">Adobe Creative Cloud - $52.99</p>
              </div>
              <span className="text-xs text-muted-foreground">1d ago</span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Payment reminder sent</p>
                <p className="text-xs text-muted-foreground">Netflix - Due tomorrow</p>
              </div>
              <span className="text-xs text-muted-foreground">3d ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Your next subscription payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div>
                  <p className="font-medium">Netflix</p>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$15.99</p>
                <Badge variant="destructive" className="text-xs">Overdue</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <p className="font-medium">Spotify</p>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$9.99</p>
                <Badge variant="secondary" className="text-xs">Upcoming</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <p className="font-medium">Adobe Creative Cloud</p>
                  <p className="text-sm text-muted-foreground">Due in 5 days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$52.99</p>
                <Badge variant="secondary" className="text-xs">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>Track your subscription spending against your budget</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Month</span>
              <span className="text-sm text-muted-foreground">$159 / $200</span>
            </div>
            <Progress value={79.5} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">79.5% of budget used</span>
              <span className="text-success">$41 remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}