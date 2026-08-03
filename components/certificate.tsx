"use client";

import { CERTIFICATE_IMAGE_URL } from "@/lib/scenarios";

interface CertificateProps {
  employeeName: string;
  scenarioTitle: string;
  date: string;
}

export function Certificate({ employeeName, scenarioTitle, date }: CertificateProps) {
  return (
    <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden shadow-lg border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CERTIFICATE_IMAGE_URL}
        alt="CallDrive certificate of completion"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10">
        <div className="text-xl md:text-2xl font-bold text-[#152645] drop-shadow-sm">
          {employeeName}
        </div>
        <div className="mt-1 text-sm md:text-base text-neutral-700">
          has successfully completed
        </div>
        <div className="text-base md:text-lg font-semibold text-[#152645]">
          {scenarioTitle}
        </div>
        <div className="mt-2 text-xs md:text-sm text-neutral-600">{date}</div>
      </div>
    </div>
  );
}
