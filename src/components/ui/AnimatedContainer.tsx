
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "scale";
  delay?: number;
  fullHeight?: boolean;
}

const AnimatedContainer = ({
  children,
  animation = "fade",
  delay = 0,
  fullHeight = false,
  className,
  ...props
}: AnimatedContainerProps) => {
  const getAnimationClass = () => {
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-up";
      case "slide-down":
        return "animate-slide-down";
      case "scale":
        return "animate-scale-in";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      className={cn(
        getAnimationClass(),
        fullHeight && "h-full",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
