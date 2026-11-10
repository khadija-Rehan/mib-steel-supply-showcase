import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  showText = true,
}: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 shrink-0", className)}>
      <img
        src="/mib-monogram.png"
        alt="Muhammad Irfan Brothers MIB logo"
        className={cn(
          "h-9 w-auto shrink-0 object-contain drop-shadow-[0_1px_4px_rgba(255,255,255,0.12)] sm:h-10",
          iconClassName,
        )}
      />
      {showText && (
        <div
          className={cn(
            "flex flex-col font-display leading-[1.12] text-foreground select-none",
            textClassName,
          )}
        >
          <span className="text-xs font-semibold tracking-tight text-foreground sm:text-[13px]">
            Muhammad
          </span>
          <span className="text-xs font-semibold tracking-tight text-foreground sm:text-[13px]">
            Irfan Brothers
          </span>
        </div>
      )}
    </div>
  );
}

