import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

interface GenericButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function GenericButton({
  href,
  children,
  variant = "default",
  size = "lg",
  className,
}: GenericButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={`rounded-full ${className}`}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
