/**
 * Ambient page glow. Heavy CSS blur filters (100px+) are known to freeze /
 * white-screen Safari on low-end phones — use simple soft circles on mobile.
 */
export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Mobile: no filter:blur — solid soft discs only */}
      <div className="absolute -left-1/4 top-0 h-[280px] w-[280px] rounded-full bg-[#4DB8E8]/[0.12] sm:hidden" />
      <div className="absolute -right-1/4 top-1/3 h-[240px] w-[240px] rounded-full bg-[#00D4FF]/[0.08] sm:hidden" />
      <div className="absolute bottom-0 left-1/4 h-[200px] w-[280px] rounded-full bg-[#6ECFFF]/[0.06] sm:hidden" />

      {/* Desktop / large screens: soft blur glows */}
      <div className="absolute -left-1/4 top-0 hidden h-[600px] w-[600px] rounded-full bg-[#4DB8E8]/[0.07] blur-[120px] sm:block" />
      <div className="absolute -right-1/4 top-1/3 hidden h-[500px] w-[500px] rounded-full bg-[#00D4FF]/[0.05] blur-[100px] sm:block" />
      <div className="absolute bottom-0 left-1/3 hidden h-[400px] w-[700px] rounded-full bg-[#6ECFFF]/[0.04] blur-[110px] sm:block" />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #00D4FF 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
