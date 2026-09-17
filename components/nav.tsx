"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Home, LogIn, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOGO_IMAGE_URL } from "@/lib/scenarios";
import { getEmployee, clearEmployee, isManager, setManager, LoggedInEmployee } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Manager Dashboard", icon: BarChart3 },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [employee, setEmployeeState] = useState<LoggedInEmployee | null>(null);
  const [manager, setManagerState] = useState(false);

  useEffect(() => {
    setEmployeeState(getEmployee());
    setManagerState(isManager());
  }, [pathname]);

  const signOut = () => {
    clearEmployee();
    setManager(false);
    setEmployeeState(null);
    setManagerState(false);
    router.push("/");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_IMAGE_URL} alt="CallDrive" className="h-16 w-16 object-contain shrink-0" />
          <div className="leading-tight">
            <div className="font-bold text-xl text-[#B91C1C] tracking-tight">CallDrive</div>
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
                pathname === l.href && "bg-neutral-100 text-[#B91C1C]"
              )}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}

          <div className="ml-2 pl-3 border-l flex items-center gap-2">
            {employee || manager ? (
              <>
                <span className="flex items-center gap-1 text-sm text-neutral-600">
                  <User className="h-4 w-4" />
                  {manager ? "Manager" : employee?.name}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-1" /> Sign out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-1" /> Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
