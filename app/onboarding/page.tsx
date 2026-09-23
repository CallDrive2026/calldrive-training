"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateOrganization, useOrganization } from "@clerk/nextjs";

export default function OnboardingPage() {
  const { organization, isLoaded } = useOrganization();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && organization) {
      router.push("/pricing");
    }
  }, [isLoaded, organization, router]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2">Set up your dealership account</h1>
        <p className="text-neutral-500 mb-6">
          Create your organization to start your 7-day free trial. You can
          add more rooftops and invite your team after.
        </p>
        <CreateOrganization afterCreateOrganizationUrl="/pricing" />
      </div>
    </div>
  );
}
