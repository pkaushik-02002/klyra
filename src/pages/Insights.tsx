import { useState, useEffect } from "react";
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
import { useAuthContext } from "@/contexts/AuthContext";
import { useSubscriptions } from "@/hooks/use-firebase";
import { useReminders } from "@/hooks/use-firebase";
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

// Dynamic data will be calculated from subscriptions

export default function Insights() {
  const { user } = useAuthContext();
  const { subscriptions, loading: subscriptionsLoading } = useSubscriptions(user?.uid || null);
  const { reminders } = useReminders(user?.uid || null);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [insights, setInsights] = useState<any[]>([]);
  const [spendingTrend, setSpendingTrend] = useState<any[]>([]);
  const [categorySpending, setCategorySpending] = useState<any[]>([]);
  const [monthlyComparison, setMonthlyComparison] = useState<any[]>([]);

  // Calculate real insights and data based on subscription data
  useEffect(() => {
    if (subscriptions.length > 0) {
      const newInsights = [];
      
      // Calculate total monthly spend
      const totalSpend = subscriptions
        .filter(sub => sub.status === "Active")
        .reduce((total, sub) => {
          if (sub.billing === "Monthly") return total + sub.price;
          if (sub.billing === "Yearly") return total + (sub.price / 12);
          if (sub.billing === "Weekly") return total + (sub.price * 4);
          return total;
        }, 0);

      // Calculate category spending
      const categoryMap = new Map();
      subscriptions
        .filter(sub => sub.status === "Active")
        .forEach(sub => {
          const monthlyAmount = sub.billing === "Monthly" ? sub.price :
                               sub.billing === "Yearly" ? sub.price / 12 :
                               sub.billing === "Weekly" ? sub.price * 4 : sub.price;
          
          categoryMap.set(sub.category, (categoryMap.get(sub.category) || 0) + monthlyAmount);
        });

      const categoryData = Array.from(categoryMap.entries()).map(([category, amount]) => ({
        category,
        amount: Math.round(amount * 100) / 100,
        percentage: Math.round((amount / totalSpend) * 100),
        color: category === "Entertainment" ? "#8b5cf6" :
               category === "Productivity" ? "#06b6d4" :
               category === "Storage" ? "#f59e0b" : "#ef4444"
      }));

      setCategorySpending(categoryData);

      // Generate spending trend (last 6 months)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const trendData = months.map((month, index) => ({
        month,
        amount: Math.round(totalSpend * (0.8 + Math.random() * 0.4)), // Simulate variation
        target: Math.round(totalSpend)
      }));
      setSpendingTrend(trendData);

      // Generate monthly comparison
      const comparisonData = categoryData.map(cat => ({
        category: cat.category,
        thisMonth: cat.amount,
        lastMonth: Math.round(cat.amount * (0.9 + Math.random() * 0.2)) // Simulate last month
      }));
      setMonthlyComparison(comparisonData);

      // Check for duplicate services
      const serviceNames = subscriptions.map(sub => sub.name.toLowerCase());
      const duplicates = serviceNames.filter((name, index) => serviceNames.indexOf(name) !== index);
      
      if (duplicates.length > 0) {
        newInsights.push({
          type: "savings",
          title: "Duplicate Services Detected",
          description: `You have duplicate services. Consider consolidating to save money.`,
          impact: "Potential savings",
          status: "warning"
        });
      }

      // Check for high spending
      if (totalSpend > 100) {
        newInsights.push({
          type: "trend",
          title: "High Monthly Spending",
          description: `Your monthly subscription spend is $${totalSpend.toFixed(2)}. Consider reviewing your subscriptions.`,
          impact: `$${totalSpend.toFixed(2)}/month`,
          status: "warning"
        });
      }

      // Check for unused services (paused or cancelled)
      const inactiveServices = subscriptions.filter(sub => sub.status !== "Active");
      if (inactiveServices.length > 0) {
        newInsights.push({
          type: "optimization",
          title: "Inactive Services",
          description: `You have ${inactiveServices.length} inactive services. Consider cancelling them completely.`,
          impact: "Clean up subscriptions",
          status: "info"
        });
      }

      // Budget achievement
      if (totalSpend <= 50) {
        newInsights.push({
          type: "achievement",
          title: "Good Spending Control",
          description: "Your subscription spending is well managed. Keep it up!",
          impact: "Under $50/month",
          status: "success"
        });
      }

      setInsights(newInsights);
    }
  }, [subscriptions]);

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
                <p className="text-2xl font-bold">
                  ${subscriptions
                    .filter(sub => sub.status === "Active")
                    .reduce((total, sub) => {
                      if (sub.billing === "Monthly") return total + sub.price;
                      if (sub.billing === "Yearly") return total + (sub.price / 12);
                      if (sub.billing === "Weekly") return total + (sub.price * 4);
                      return total;
                    }, 0).toFixed(2)}
                </p>
                <p className="text-xs text-success flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Based on active subscriptions
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
                <p className="text-2xl font-bold">
                  ${subscriptions.length > 0 
                    ? (subscriptions
                        .filter(sub => sub.status === "Active")
                        .reduce((total, sub) => {
                          if (sub.billing === "Monthly") return total + sub.price;
                          if (sub.billing === "Yearly") return total + (sub.price / 12);
                          if (sub.billing === "Weekly") return total + (sub.price * 4);
                          return total;
                        }, 0) / subscriptions.filter(sub => sub.status === "Active").length).toFixed(2)
                    : "0.00"}
                </p>
                <p className="text-xs text-warning flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Average per active service
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
                <p className="text-2xl font-bold">
                  ${subscriptions
                    .filter(sub => sub.status !== "Active")
                    .reduce((total, sub) => {
                      if (sub.billing === "Monthly") return total + sub.price;
                      if (sub.billing === "Yearly") return total + (sub.price / 12);
                      if (sub.billing === "Weekly") return total + (sub.price * 4);
                      return total;
                    }, 0).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">From inactive services</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                <p className="text-2xl font-bold">{subscriptions.filter(sub => sub.status === "Active").length}</p>
                <p className="text-xs text-success">Active subscriptions</p>
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