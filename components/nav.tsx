"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO_IMAGE_URL } from "@/lib/scenarios";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Manager Dashboard", icon: BarChart3 },
  { href: "/org-settings", label: "Team & Billing", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_IMAGE_URL}
            alt="CallDrive"
            className="h-16 w-16 object-contain shrink-0"
          />
          <div className="leading-tight">
            <div className="font-bold text-xl text-[#B4443A] tracking-tight">
              CallDrive
            </div>
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
              Sales Training App
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100",
                pathname === l.href && "bg-neutral-100 text-[#B4443A]"
              )}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}

          <div className="ml-2 pl-3 border-l flex items-center gap-2">
            <SignedIn>
              <OrganizationSwitcher
                afterSelectOrganizationUrl="/train/sales"
                afterCreateOrganizationUrl="/train/sales"
              />
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <Link href="/pricing">
                <Button size="sm" className="bg-[#B4443A] hover:bg-[#963831]">
                  Start Free Trial
                </Button>
              </Link>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
