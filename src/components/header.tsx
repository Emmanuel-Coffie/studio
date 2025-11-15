'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from './ui/switch';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#ai-review', label: 'AI Review' },
  { href: '#contact', label: 'Contact' },
];

function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
  
    return (
        <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <Switch
                id="theme-switch"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Toggle theme"
            />
            <Moon className="h-5 w-5" />
        </div>
    );
  }

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          'font-medium transition-colors hover:text-primary',
          inSheet ? 'block py-2 text-lg' : 'text-sm'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    ))
  );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-white/10 bg-background/80 backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-semibold tracking-wider text-foreground">
            Aura Folio
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks />
          <ThemeToggle />
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-3/4 bg-background/80 backdrop-blur-lg border-l-white/10">
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                   <Link href="/" className="flex items-center gap-2" aria-label="Home" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo className="h-6 w-6 text-primary" />
                      <span className="font-headline text-lg font-semibold tracking-wider text-foreground">
                        Aura Folio
                      </span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavLinks inSheet />
                </nav>
                <div className="mt-auto pt-6">
                    <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
