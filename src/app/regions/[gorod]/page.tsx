import { redirect } from "next/navigation";
import { getLandingBySlug } from "@/lib/data/landing-pages";

interface RegionRedirectProps {
  params: Promise<{ gorod: string }>;
}

export default async function RegionRedirectPage({ params }: RegionRedirectProps) {
  const { gorod } = await params;
  const landing = getLandingBySlug(gorod);

  if (landing?.type === "city") {
    redirect(`/${gorod}`);
  }

  redirect("/catalog");
}