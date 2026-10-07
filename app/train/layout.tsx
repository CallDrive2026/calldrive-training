import { requireTrainingAccess } from "@/lib/tenant";

export default async function TrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireTrainingAccess();
  return <>{children}</>;
}
