import Link from "next/link";
import { ROLES, LOGO_IMAGE_URL } from "@/lib/scenarios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PilotForm } from "@/components/pilot-form";
import {
  Users,
  Phone,
  Briefcase,
  ArrowRight,
  CheckCircle,
  XCircle,
  Repeat,
  Eye,
  Building2,
} from "lucide-react";

const ICONS = { sales: Briefcase, reception: Phone, service: Users } as const;

const PRACTICE_GAP_IMAGE = "https://g.tlcdn.com/view/ba7568c6f9db499fb4a887963fe021f3.png";
const ROLE_COVERAGE_IMAGE = "https://g.tlcdn.com/view/fbbdc855070b4b9a84c9330d65c00c9a.png";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <div className="relative bg-[#1A0F0F] text-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_IMAGE_URL}
            alt="CallDrive"
            className="h-28 w-28 object-contain drop-shadow-lg shrink-0"
          />
          <p className="uppercase text-xs tracking-[0.35em] font-semibold text-neutral-300">
            Dealership Call Coaching
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Practice the Call Before the Call Counts.
          </h1>
          <p className="text-neutral-200 max-w-2xl text-lg">
            CallDrive gives dealership teams a configurable place to practice the calls that
            shape revenue and retention — from sales and service to reception, department
            routing, inventory questions, and appointment handling.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="#roles">
              <Button size="lg" className="bg-white text-[#B4443A] hover:bg-neutral-100">
                Start Practice
              </Button>
            </Link>
            <Link href="#pilot">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                Apply for a 30-day pilot
              </Button>
            </Link>
          </div>
          <p className="text-neutral-400 text-xs mt-2">
            Built for dealer principals, GMs, GSMs, BDC and internet directors, reception, and
            service leaders.
          </p>
        </div>
      </div>

      {/* THE PRACTICE GAP */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-[#B4443A] uppercase tracking-wide mb-2">
              The practice gap
            </p>
            <h2 className="text-3xl font-bold mb-4">
              Completion reports do not rehearse a live handoff.
            </h2>
            <p className="text-neutral-600 mb-6">
              Dealership call performance is behavioral. CallDrive creates a safe, repeatable
              place to rehearse the moments that decide whether a caller gets clarity,
              confidence, and a useful next step.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="pt-6 space-y-2">
                  <p className="text-sm font-semibold text-green-800">Practice shows up on the phone</p>
                  <ul className="space-y-1.5 text-sm text-green-900/80">
                    <li className="flex gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />Realistic dealership call simulations</li>
                    <li className="flex gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />Repetition for every department</li>
                    <li className="flex gap-2"><CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />Scored behaviors, not just completion</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-neutral-200 bg-neutral-50">
                <CardContent className="pt-6 space-y-2">
                  <p className="text-sm font-semibold text-neutral-500">An LMS stops at completion</p>
                  <ul className="space-y-1.5 text-sm text-neutral-500">
                    <li className="flex gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5" />Passive course completion</li>
                    <li className="flex gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5" />Generic quizzes detached from the phone</li>
                    <li className="flex gap-2"><XCircle className="h-4 w-4 shrink-0 mt-0.5" />A certificate without observable behavior</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PRACTICE_GAP_IMAGE} alt="" className="rounded-xl w-full shadow-sm" />
        </div>
      </div>

      {/* ROLE COVERAGE */}
      <div className="bg-neutral-50 border-y">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-[#B4443A] uppercase tracking-wide mb-2">
              Configurable dealership call flows
            </p>
            <h2 className="text-3xl font-bold mb-3">
              One coaching system for the way your store actually answers.
            </h2>
            <p className="text-neutral-600">
              Coverage follows the caller journey — not a generic sales script.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ROLE_COVERAGE_IMAGE} alt="" className="rounded-xl w-full mb-10 shadow-sm" />
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Sales · BDC · Internet</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-600 space-y-1">
                <p>Turn curiosity into a next step.</p>
                <ul className="list-disc list-inside text-neutral-500 pt-2 space-y-1">
                  <li>Missed-call recovery</li>
                  <li>Price and payment questions</li>
                  <li>Appointment asks</li>
                  <li>Internet-lead follow-up</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reception & Routing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-600 space-y-1">
                <p>Make the first handoff feel intentional.</p>
                <ul className="list-disc list-inside text-neutral-500 pt-2 space-y-1">
                  <li>Warm handoffs</li>
                  <li>Finding the right person quickly</li>
                  <li>Setting expectations while a customer waits</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Service</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-neutral-600 space-y-1">
                <p>Lower the temperature and keep momentum.</p>
                <ul className="list-disc list-inside text-neutral-500 pt-2 space-y-1">
                  <li>Status, recall, and warranty calls</li>
                  <li>Service scheduling</li>
                  <li>Frustrated customers and recovery moments</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* MANAGER PROOF */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-[#B4443A] uppercase tracking-wide mb-2">
              Manager proof
            </p>
            <h2 className="text-3xl font-bold mb-4">See the behavior behind the score.</h2>
            <p className="text-neutral-600 mb-6">
              Every practice call is automatically transcribed and scored — with a clear
              pass/fail, a breakdown by skill area, specific coaching notes, and a ready-to-use
              word track the employee can reference on their next real call.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-[#B4443A] shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600">
                  Managers see what to coach next — not just a number to file away.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Repeat className="h-5 w-5 text-[#B4443A] shrink-0 mt-0.5" />
                <p className="text-sm text-neutral-600">
                  Teams practice the exact calls they receive, as many times as it takes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROLE SELECTOR */}
      <div id="roles" className="bg-neutral-50 border-y scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-xl font-semibold text-center mb-8 text-neutral-700">
            Pick your role to start practicing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map((role) => {
              const Icon = ICONS[role.id];
              return (
                <Link key={role.id} href={`/train/${role.id}`}>
                  <Card className="h-full bg-white hover:shadow-md hover:border-[#B4443A]/40 transition-all cursor-pointer border-t-4 border-t-[#B4443A]">
                    <CardHeader>
                      <div className="h-10 w-10 rounded-lg bg-[#B4443A]/10 flex items-center justify-center mb-2">
                        <Icon className="h-5 w-5 text-[#B4443A]" />
                      </div>
                      <CardTitle>{role.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-neutral-500 mb-4">{role.description}</p>
                      <div className="flex items-center gap-1 text-sm font-medium text-[#B4443A]">
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

      {/* PILOT FORM */}
      <div id="pilot" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-16">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-[#B4443A] uppercase tracking-wide mb-2 flex items-center justify-center gap-2">
            <Building2 className="h-4 w-4" /> Secondary path · 30-day pilot
          </p>
          <h2 className="text-3xl font-bold mb-3">Put the practice loop in front of one team.</h2>
          <p className="text-neutral-600">
            Tell us where inbound-call performance is leaking today. No hard sell — just a
            focused conversation about whether a 30-day pilot fits your store.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <PilotForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
