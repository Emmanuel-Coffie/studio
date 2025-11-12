import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './icons';
import { Button } from './ui/button';

export function Footer() {
  const socialLinks = [
    { href: '#', icon: <Github className="h-5 w-5" />, label: 'GitHub' },
    { href: '#', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
    { href: '#', icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
  ];
  return (
    <footer className="bg-secondary">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-semibold tracking-wider text-foreground">
              Aura Folio
            </span>
          </Link>
          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <Button asChild key={link.label} variant="ghost" size="icon">
                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aura Folio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
