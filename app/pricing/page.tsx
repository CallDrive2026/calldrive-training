"use client";

import { useState } from "react";
import { useAuth, useOrganization, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TIERS = [
  { range: "1–2 rooftops", monthly: 399, annual: 4309.2 },
  { range: "3–4 rooftops", monthly: 329, annual: 3553.2 },
  { range: "5+ rooftops", monthly: 299, annual: 3229.2 },
];

function tierFor(count: number) {
  if (count <= 2) return TIERS[0];
  if (count <= 4) return TIERS[1];
  return TIERS[2];
}

export default function PricingPage() {
  const { isSignedIn } = useAuth();
  const { organization } = useOrganization();
  const [rooftopCount, setRooftopCount] = useState(1);
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [loading, setLoading] = useState(false);

  const tier = tierFor(rooftopCount);
  const perRooftop = interval === "month" ? tier.monthly : tier.annual;
  const total = perRooftop * rooftopCount;

  const startCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rooftopCount, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Simple, rooftop-based pricing</h1>
      <p className="text-neutral-500 mb-8">
        Start with a 7-day free trial. Cancel anytime. Save 10% with annual
        billing.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {TIERS.map((t) => (
          <div key={t.range} className="border rounded-lg p-5">
            <div className="text-sm text-neutral-500 mb-1">{t.range}</div>
            <div className="text-2xl font-bold">
              ${t.monthly}
              <span className="text-sm font-normal text-neutral-500">
                /rooftop/mo
              </span>
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              ${t.annual.toFixed(2)}/rooftop billed annually
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">
            How many rooftops?
          </label>
          <Input
            type="number"
            min={1}
            value={rooftopCount}
            onChange={(e) =>
              setRooftopCount(Math.max(1, Number(e.target.value) || 1))
            }
            className="w-32"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={interval === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setInterval("month")}
          >
            Monthly
          </Button>
          <Button
            type="button"
            variant={interval === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setInterval("year")}
          >
            Annual (save 10%)
          </Button>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm text-neutral-500">Estimated total</div>
          <div className="text-2xl font-bold">
            ${total.toFixed(2)}{" "}
            <span className="text-sm font-normal text-neutral-500">
              /{interval === "month" ? "month" : "year"}
            </span>
          </div>
        </div>

        {isSignedIn && organization ? (
          <Button
            className="w-full bg-[#B4443A] hover:bg-[#963831]"
            disabled={loading}
            onClick={startCheckout}
          >
            {loading ? "Redirecting..." : "Start 7-Day Free Trial"}
          </Button>
        ) : isSignedIn ? (
          <a href="/onboarding">
            <Button className="w-full bg-[#B4443A] hover:bg-[#963831]">
              Set up your dealership account
            </Button>
          </a>
        ) : (
          <SignInButton mode="modal">
            <Button className="w-full bg-[#B4443A] hover:bg-[#963831]">
              Sign in to start your trial
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
