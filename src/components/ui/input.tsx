import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
 return (
  <input
   type={type}
   className={cn(
    "flex h-7 w-full border-b-2 border-input bg-background  py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:text-[#555555] text-[#efeeed] disabled:cursor-not-allowed disabled:opacity-50",
    className
   )}
   ref={ref}
   {...props}
  />
 );
});
Input.displayName = "Input";

export { Input };