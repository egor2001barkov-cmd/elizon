import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { getCaseBySlug } from "@/lib/data/cases-store";
import { AdminShell } from "../../AdminShell";
import { CaseEditor } from "./CaseEditor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminCaseEditPage({ params }: Props) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { slug } = await params;
  const item = await getCaseBySlug(slug);
  if (!item) notFound();

  return (
    <AdminShell email={session.email}>
      <CaseEditor initial={item} />
    </AdminShell>
  );
}
