import Link from "next/link";
import { ROLES, LOGO_IMAGE_URL } from "@/lib/scenarios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Phone, Briefcase, ArrowRight } from "lucide-react";

const ICONS = { sales: Briefcase, reception: Phone, service: Users } as const;

export default function HomePage() {
  return (
    <div>
      <div className="bg-[#152645] text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-6 md:flex-row md:text-left md:justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_IMAGE_URL}
            alt="CallDrive"
            className="h-36 w-36 md:h-40 md:w-40 object-contain drop-shadow-lg shrink-0"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-1">CallDrive</h1>
            <p className="text-neutral-300 uppercase text-xs tracking-[0.3em] font-medium mb-4">
              Sales Training App
            </p>
            <p className="text-neutral-200 max-w-xl">
              Practice today. Close tomorrow. Realistic inbound call simulations,
              scored tests, and progress tracking for sales, reception, and service teams.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold text-center mb-8 text-neutral-700">
          Pick your role to get started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map((role) => {
            const Icon = ICONS[role.id];
            return (
              <Link key={role.id} href={`/train/${role.id}`}>
                <Card className="h-full hover:shadow-md hover:border-[#152645]/40 transition-all cursor-pointer border-t-4 border-t-[#152645]">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-[#152645]/10 flex items-center justify-center mb-2">
                      <Icon className="h-5 w-5 text-[#152645]" />
                    </div>
                    <CardTitle>{role.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-500 mb-4">{role.description}</p>
                    <div className="flex items-center gap-1 text-sm font-medium text-[#152645]">
                      Start training <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
