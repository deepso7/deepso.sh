import { cn } from "@/lib/utils";

export const Kbd = ({ className, ...props }: React.ComponentProps<"kbd">) => (
  <kbd
    data-slot="kbd"
    className={cn(
      "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-xs bg-muted px-1 font-sans text-[0.625rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
      className,
    )}
    {...props}
  />
);
