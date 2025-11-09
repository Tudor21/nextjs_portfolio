import * as React from "react"
import { Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin text-muted-foreground",
  {
    variants: {
      size: {
        default: "size-4",
        sm: "size-3",
        lg: "size-6",
        xl: "size-8",
        "2xl": "size-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  className?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }

