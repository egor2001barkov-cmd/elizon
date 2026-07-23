export function WarehouseVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A2540]/80 to-[#061829] p-8">
      <svg viewBox="0 0 400 240" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="whGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2540" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <rect x="40" y="80" width="320" height="140" fill="#0d2840" rx="4" />
        <rect x="60" y="100" width="80" height="100" fill="#1a3a5c" rx="2" />
        <rect x="160" y="100" width="80" height="100" fill="#1a3a5c" rx="2" />
        <rect x="260" y="100" width="80" height="100" fill="#1a3a5c" rx="2" />
        <polygon points="20,80 200,30 380,80" fill="#0A2540" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${70 + i * 55}, 130)`}>
            <ellipse cx="0" cy="0" rx="18" ry="5" fill="#1e3a5f" />
            <ellipse cx="0" cy="30" rx="18" ry="5" fill="#1e3a5f" />
            <rect x="-12" y="0" width="24" height="30" fill="#0d2840" />
            <ellipse cx="0" cy="5" rx="14" ry="4" fill="none" stroke="#00D4FF" strokeWidth="1.5" opacity="0.7" />
            <ellipse cx="0" cy="12" rx="16" ry="4" fill="none" stroke="#4DE8FF" strokeWidth="1.5" opacity="0.5" />
          </g>
        ))}
        <rect x="170" y="55" width="60" height="20" rx="3" fill="url(#whGrad)" opacity="0.8" />
        <text x="200" y="69" fill="white" fontSize="11" textAnchor="middle" fontFamily="system-ui">
          ELIZON
        </text>
      </svg>
      <p className="mt-4 text-center text-xs text-[#8BA4BC]">Складской комплекс, Москва</p>
    </div>
  );
}