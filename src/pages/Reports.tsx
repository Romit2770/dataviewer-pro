
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Download, Filter, RefreshCw } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { monthlyData, testTypeData, resultsDistribution } from "@/lib/data";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A259FF"];

const Reports = () => {
  const [reportType, setReportType] = useState("monthly");
  const [timeRange, setTimeRange] = useState("6months");

  const filteredMonthlyData = (() => {
    switch (timeRange) {
      case "3months":
        return monthlyData.slice(-3);
      case "6months":
        return monthlyData.slice(-6);
      case "12months":
        return monthlyData;
      default:
        return monthlyData.slice(-6);
    }
  })();

  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reports &amp; Analytics</h1>
        <p className="text-muted-foreground">
          Visualize and analyze sample data over time
        </p>
      </div>

      <div className="mb-8 glass p-4 border border-border/50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Report Options:</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                value={reportType}
                onValueChange={setReportType}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Analysis</SelectItem>
                  <SelectItem value="test-types">Test Types</SelectItem>
                  <SelectItem value="results">Results Distribution</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <AnimatedContainer animation="fade">
        {reportType === "monthly" && (
          <Card className="glass glass-hover">
            <CardHeader>
              <CardTitle>Monthly Sample Analysis</CardTitle>
              <CardDescription>
                Number of samples processed by month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={filteredMonthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="completed" 
                    name="Completed" 
                    fill="#22c55e" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="pending" 
                    name="Pending" 
                    fill="#eab308" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="failed" 
                    name="Failed" 
                    fill="#ef4444" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === "test-types" && (
          <Card className="glass glass-hover">
            <CardHeader>
              <CardTitle>Test Types Distribution</CardTitle>
              <CardDescription>
                Breakdown of sample tests by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={testTypeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="chemical" 
                    name="Chemical" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="biological" 
                    name="Biological" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="physical" 
                    name="Physical" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === "results" && (
          <Card className="glass glass-hover">
            <CardHeader>
              <CardTitle>Results Distribution</CardTitle>
              <CardDescription>
                Distribution of sample results by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={resultsDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      animationDuration={1500}
                    >
                      {resultsDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value, name) => [`${value} samples`, name]}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </AnimatedContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <DashboardCard title="Key Findings" animation="slide-up" delay={100}>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Sample Throughput Increased</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  26% increase in processing speed over the last quarter
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Quality Control Improvement</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Failed samples decreased by 12% after new protocol implementation
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">3</span>
              </div>
              <div>
                <h4 className="text-sm font-medium">Testing Type Shift</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Biological testing has become the most requested type (38% of total)
                </p>
              </div>
            </li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Recent Insights" animation="slide-up" delay={200}>
          <div className="space-y-4">
            <div className="pb-4 border-b border-border/50">
              <h4 className="text-sm font-medium">Chemical Testing Accuracy</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Current: 94.8%</span>
                <span className="text-xs text-green-500">+2.3% from last month</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "94.8%" }}></div>
              </div>
            </div>
            <div className="pb-4 border-b border-border/50">
              <h4 className="text-sm font-medium">Sample Retesting Rate</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Current: 8.2%</span>
                <span className="text-xs text-red-500">+1.5% from last month</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: "8.2%" }}></div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Average Processing Time</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Current: 3.2 days</span>
                <span className="text-xs text-green-500">-0.8 days from last month</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: "76%" }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Recommendations" animation="slide-up" delay={300}>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-semibold">01</span>
              </div>
              <div>
                <p className="text-sm">
                  Implement new quality control measures for soil samples to reduce the 15% failure rate
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-semibold">02</span>
              </div>
              <div>
                <p className="text-sm">
                  Schedule additional training for biological testing to accommodate increased demand
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-xs font-semibold">03</span>
              </div>
              <div>
                <p className="text-sm">
                  Review chemical testing protocols to address recent accuracy variations
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Reports;
