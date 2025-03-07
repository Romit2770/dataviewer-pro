
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedContainer from "../ui/AnimatedContainer";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
  delay?: number;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  delay = 0,
}: MetricCardProps) => {
  return (
    <AnimatedContainer animation="slide-up" delay={delay}>
      <Card className={cn("glass glass-hover", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between space-y-0">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-baseline space-x-2">
                <h2 className="text-3xl font-semibold">{value}</h2>
                {trend && (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      trend.positive
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {trend.positive ? "+" : "-"}
                    {trend.value}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
            <div className="rounded-full p-2 border border-border/50 bg-background/50">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default MetricCard;
