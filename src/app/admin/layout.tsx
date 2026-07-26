import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "ELIZON Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white antialiased">
      {children}
    </div>
  );
}
