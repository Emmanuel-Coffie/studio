import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      <div className="container px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("mx-auto mb-12 max-w-2xl text-center", className)} {...props}>
            {children}
        </div>
    )
}

export function SectionTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className={cn("font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl", className)} {...props}>
            {children}
        </h2>
    )
}

export function SectionDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("mt-4 text-lg text-muted-foreground", className)} {...props}>
            {children}
        </p>
    )
}
