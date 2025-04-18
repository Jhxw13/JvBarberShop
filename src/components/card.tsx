import { cn } from "@/lib/utils";
import React from "react";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("bg-zinc-800 p-4 rounded-xl shadow-md", className)} {...props} />;
};

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("mt-2", className)} {...props} />;
};
