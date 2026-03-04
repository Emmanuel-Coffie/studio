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
  { href: '#ai-catalyst', label: 'AI Catalyst' },
  { href: '#contact', label: 'Contact' },
];

function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-20 h-6" />;
    }
  
    return (
        <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            <Switch
                id="theme-switch"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label="Toggle theme"
            />
            <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
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
          inSheet ? 'block py-4 text-xl border-b border-white/5' : 'text-sm'
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
        'sticky top-0 z-50 w-full transition-all duration-300 h-16 sm:h-20 flex items-center',
        isScrolled
          ? 'border-b border-white/10 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Home">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-base sm:text-lg font-semibold tracking-wider text-foreground">
            Aura Folio
          </span>
        </Link>
        
        <nav className="hidden items-center gap-8 md:flex">
          <NavLinks />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs bg-background/95 backdrop-blur-xl border-l-white/10 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                   <Link href="/" className="flex items-center gap-2" aria-label="Home" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo className="h-6 w-6 text-primary" />
                      <span className="font-headline text-lg font-semibold tracking-wider text-foreground">
                        Aura Folio
                      </span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <nav className="flex flex-col p-6">
                  <NavLinks inSheet />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
