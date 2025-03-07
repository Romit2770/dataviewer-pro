import React from "react";
import { ArrowUpRight, Beaker, Calculator, CheckCircle, Clock, FlaskConical } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import TrendChart from "@/components/dashboard/TrendChart";
import RecentSamples from "@/components/dashboard/RecentSamples";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { sampleData, trendData } from "@/lib/data";

const Dashboard = () => {
  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your samples and analysis results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Samples"
          value="235"
          description="Last 30 days"
          icon={<FlaskConical className="h-4 w-4 text-primary" />}
          trend={{ value: "12%", positive: true }}
          delay={100}
        />
        <MetricCard
          title="Completed"
          value="189"
          description="80.4% completion rate"
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          trend={{ value: "5%", positive: true }}
          delay={200}
        />
        <MetricCard
          title="In Progress"
          value="28"
          description="11.9% of total samples"
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          trend={{ value: "2%", positive: false }}
          delay={300}
        />
        <MetricCard
          title="Analysis Rate"
          value="18.2"
          description="Samples per day"
          icon={<Calculator className="h-4 w-4 text-blue-500" />}
          trend={{ value: "8%", positive: true }}
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TrendChart 
            title="Sample Analysis Trends" 
            description="Number of samples processed over time"
            data={trendData}
            delay={500}
          />
        </div>

        <DashboardCard title="Sample Type Distribution" animation="slide-up" delay={600}>
          <div className="flex flex-col gap-4">
            {[
              { type: "Water", count: 78, percentage: 33, color: "bg-blue-500" },
              { type: "Soil", count: 65, percentage: 28, color: "bg-amber-600" },
              { type: "Air", count: 42, percentage: 18, color: "bg-sky-400" },
              { type: "Tissue", count: 30, percentage: 13, color: "bg-green-500" },
              { type: "Other", count: 20, percentage: 8, color: "bg-purple-500" },
            ].map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.type}</span>
                  <span className="font-medium">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color}`} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <RecentSamples samples={sampleData.slice(0, 5)} delay={700} />
    </div>
  );
};

export default Dashboard;
