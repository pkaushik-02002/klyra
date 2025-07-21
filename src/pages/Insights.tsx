import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as PieChartRecharts,
  Pie,
  Cell
} from "recharts";

// Mock data
const spendingTrend = [
  { month: "Jul", amount: 89, target: 100 },
  { month: "Aug", amount: 127, target: 100 },
  { month: "Sep", amount: 142, target: 100 },
  { month: "Oct", amount: 156, target: 100 },
  { month: "Nov", amount: 148, target: 100 },
  { month: "Dec", amount: 167, target: 100 },
  { month: "Jan", amount: 159, target: 100 }
];

const categorySpending = [
  { category: "Entertainment", amount: 65, percentage: 41, color: "#8b5cf6" },
  { category: "Productivity", amount: 52, percentage: 33, color: "#06b6d4" },
  { category: "Storage", amount: 28, percentage: 18, color: "#f59e0b" },
  { category: "Other", amount: 14, percentage: 8, color: "#ef4444" }
];

const monthlyComparison = [
  { category: "Entertainment", thisMonth: 65, lastMonth: 58 },
  { category: "Productivity", thisMonth: 52, lastMonth: 47 },
  { category: "Storage", thisMonth: 28, lastMonth: 31 },
  { category: "Other", thisMonth: 14, lastMonth: 12 }
];

const insights = [
  {
    type: "savings",
    title: "Duplicate Services Detected",
    description: "You have 2 music streaming services. Consider cancelling one to save $9.99/month.",
    impact: "$119.88/year",
    status: "warning"
  },
  {
    type: "trend",
    title: "Spending Increased",
    description: "Your subscription spending increased by 18% compared to last month.",
    impact: "+$24.50",
    status: "info"
  },
  {
    type: "optimization",
    title: "Unused Service Alert",
    description: "Figma Pro hasn't been used in 30 days. Consider pausing or cancelling.",
    impact: "$12.00/month",
    status: "warning"
  },
  {
    type: "achievement",
    title: "Budget Goal Met",
    description: "You stayed within your monthly budget of $200. Great job!",
    impact: "$41 under budget",
    status: "success"
  }
];

export default function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "savings": return DollarSign;
      case "trend": return TrendingUp;
      case "optimization": return AlertTriangle;
      case "achievement": return CheckCircle;
      default: return BarChart3;
    }
  };

  const getInsightColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "info": return "text-info";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Insights</h1>
          <p className="text-muted-foreground">
            Analyze your subscription spending patterns and discover optimization opportunities
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={selectedPeriod === "3months" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("3months")}
          >
            3 Months
          </Button>
          <Button
            variant={selectedPeriod === "6months" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("6months")}
          >
            6 Months
          </Button>
          <Button
            variant={selectedPeriod === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("year")}
          >
            1 Year
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Spend</p>
                <p className="text-2xl font-bold">$159.00</p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -5.2% vs last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. per Service</p>
                <p className="text-2xl font-bold">$13.25</p>
                <p className="text-xs text-warning flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% vs last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Potential Savings</p>
                <p className="text-2xl font-bold">$21.99</p>
                <p className="text-xs text-muted-foreground">Per month</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget Usage</p>
                <p className="text-2xl font-bold">79.5%</p>
                <p className="text-xs text-success">$41 remaining</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <PieChart className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Spending Trend</CardTitle>
            <CardDescription>Monthly subscription spending over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `$${value}`, 
                    name === 'amount' ? 'Actual' : 'Target'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Distribution of your monthly spending</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartRecharts>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              </PieChartRecharts>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Comparison */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Month-over-Month Comparison</CardTitle>
          <CardDescription>Compare current month spending with previous month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyComparison}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
              <Bar dataKey="thisMonth" fill="hsl(var(--primary))" name="This Month" />
              <Bar dataKey="lastMonth" fill="hsl(var(--muted))" name="Last Month" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Smart Insights & Recommendations</CardTitle>
          <CardDescription>
            AI-powered analysis of your subscription patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className={`h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center ${getInsightColor(insight.status)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {insight.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {insight.impact}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  Take Action
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Category Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Your highest spending categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorySpending.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.category}</span>
                  <span>${category.amount}</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {category.percentage}% of total spending
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Optimization Score</CardTitle>
            <CardDescription>How well you're managing your subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">B+</div>
              <p className="text-sm text-muted-foreground">Good subscription management</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Budget Adherence</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Duplicate Detection</span>
                <div className="flex items-center gap-2">
                  <Progress value={70} className="w-20 h-2" />
                  <span className="text-sm font-medium">70%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Usage Optimization</span>
                <div className="flex items-center gap-2">  
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}