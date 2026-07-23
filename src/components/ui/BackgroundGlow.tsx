export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[#4DB8E8]/[0.07] blur-[120px]" />
      <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/[0.05] blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[700px] rounded-full bg-[#6ECFFF]/[0.04] blur-[110px]" />
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