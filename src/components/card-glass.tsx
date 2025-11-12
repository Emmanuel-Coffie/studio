import { cn } from '@/lib/utils';
import * as React from 'react';

const CardGlass = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-lg',
        className
      )}
      {...props}
    />
  )
);
CardGlass.displayName = 'CardGlass';

export { CardGlass };
