"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Home, LogIn, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO_IMAGE_URL } from "@/lib/scenarios";
import {
  Show,
  SignInButton,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const homeLink = { href: "/", label: "Home", icon: Home };
const dealerLinks = [
  { href: "/dashboard", label: "Manager Dashboard", icon: BarChart3 },
  { href: "/org-settings", label: "Team & Billing", icon: Settings },
];

interface Rep {
  name: string;
  dealership: string;
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  // The employee signed in on this browser (employees don't use Clerk).
  const [rep, setRep] = useState<Rep | null>(null);

  useEffect(() => {
    fetch("/api/rep/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setRep(data))
      .catch(() => setRep(null));
  }, [pathname]);

  const repSignOut = async () => {
    await fetch("/api/rep/logout", { method: "POST" });
    setRep(null);
    router.push("/");
    router.refresh();
  };

  // Employees only see training; dealers also see the manager links.
  const links = rep ? [homeLink] : [homeLink, ...dealerLinks];

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
            {rep ? (
              <>
                <span className="flex items-center gap-1 text-sm text-neutral-600">
                  <User className="h-4 w-4" />
                  {rep.name}
                </span>
                <Button variant="outline" size="sm" onClick={repSignOut}>
                  <LogOut className="h-4 w-4 mr-1" /> Sign out
                </Button>
              </>
            ) : (
              <>
                <Show when="signed-in">
                  <OrganizationSwitcher
                    afterSelectOrganizationUrl="/dashboard"
                    afterCreateOrganizationUrl="/pricing"
                  />
                  <UserButton />
                </Show>
                <Show when="signed-out">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      <LogIn className="h-4 w-4 mr-1" /> Employee Sign In
                    </Button>
                  </Link>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      Dealer Sign In
                    </Button>
                  </SignInButton>
                  <Link href="/pricing">
                    <Button size="sm" className="bg-[#B4443A] hover:bg-[#963831]">
                      Start Free Trial
                    </Button>
                  </Link>
                </Show>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
