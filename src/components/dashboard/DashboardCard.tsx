
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedContainer from "../ui/AnimatedContainer";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-down" | "scale";
  delay?: number;
}

const DashboardCard = ({
  title,
  children,
  className,
  animation = "fade",
  delay = 0,
}: DashboardCardProps) => {
  return (
    <AnimatedContainer animation={animation} delay={delay}>
      <Card className={cn("overflow-hidden glass glass-hover h-full", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default DashboardCard;
