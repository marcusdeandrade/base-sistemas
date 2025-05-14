import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
} 