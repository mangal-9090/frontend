import * as React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`bg-white p-6 shadow-md rounded-md ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={`border-b pb-2 mb-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={className}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}
