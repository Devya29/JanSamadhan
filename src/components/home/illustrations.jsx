import { SAFFRON, GREEN, BLUE, MUSTARD, TEAL, INK, BORDER } from "@/lib/civicTheme";

// Hero illustration: several small "complaint" chips converging into one
// "issue" card, flowing to an authority badge, ending in a resolved check.
// This is the entire product concept in one picture.
export function HeroIllustration() {
  return (
    <svg viewBox="0 0 460 380" className="w-full h-auto" role="img" aria-label="Multiple citizen complaints converge into one civic issue, which authorities resolve">
      {/* complaint chips */}
      {[0, 1, 2].map((i) =>
      <g key={i} transform={`translate(0, ${40 + i * 58})`}>
          <rect x="0" y="0" width="150" height="42" rx="10" fill="#fff" stroke={BORDER} strokeWidth="1.5" />
          <circle cx="20" cy="21" r="5" fill={[BLUE, MUSTARD, TEAL][i]} />
          <rect x="36" y="13" width="96" height="6" rx="3" fill="#E7E1D6" />
          <rect x="36" y="24" width="66" height="6" rx="3" fill="#EFEAE0" />
        </g>
      )}
      {/* connecting lines */}
      {[0, 1, 2].map((i) =>
      <path key={i} d={`M150 ${61 + i * 58} C 200 ${61 + i * 58}, 200 150, 235 150`} stroke={BORDER} strokeWidth="2" fill="none" />
      )}
      {/* issue card */}
      <g transform="translate(235, 110)">
        <rect x="0" y="0" width="150" height="80" rx="14" fill={SAFFRON} />
        <rect x="18" y="18" width="90" height="8" rx="4" fill="rgba(255,255,255,0.9)" />
        <rect x="18" y="34" width="114" height="7" rx="3.5" fill="rgba(255,255,255,0.55)" />
        <circle cx="128" cy="58" r="14" fill="rgba(255,255,255,0.18)" />
        <text x="128" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">18</text>
      </g>
      {/* line to authority */}
      <path d="M310 190 C 330 190, 330 260, 350 260" stroke={BORDER} strokeWidth="2" fill="none" />
      {/* authority badge */}
      <g transform="translate(280, 250)">
        <rect x="0" y="0" width="130" height="60" rx="12" fill="#fff" stroke={BORDER} strokeWidth="1.5" />
        <rect x="16" y="14" width="22" height="22" rx="6" fill={INK} />
        <rect x="46" y="16" width="66" height="7" rx="3.5" fill="#E7E1D6" />
        <rect x="46" y="30" width="46" height="6" rx="3" fill="#EFEAE0" />
      </g>
      {/* resolved check */}
      <circle cx="415" cy="280" r="18" fill={GREEN} />
      <path d="M407 280 l6 6 l12 -13" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M410 280 C 380 280, 380 280, 355 280" stroke={BORDER} strokeWidth="2" fill="none" strokeDasharray="3 4" />
    </svg>);

}

// A deliberately simplified, abstract landmass shape — not a precise map —
// with a few pulsing markers, used only to establish Indian context subtly.
export function AbstractIndiaIllustration() {
  const dots = [
  { x: 190, y: 90, delay: "0s" },
  { x: 150, y: 180, delay: "0.4s" },
  { x: 230, y: 230, delay: "0.8s" },
  { x: 170, y: 300, delay: "1.2s" },
  { x: 250, y: 140, delay: "0.6s" }];

  return (
    <svg viewBox="0 0 360 380" className="w-full h-auto" role="img" aria-label="Abstract map with civic report locations">
      <path
        d="M180 20 C 230 25, 260 60, 255 100 C 290 110, 300 150, 280 180 C 300 210, 290 250, 260 260 C 265 300, 230 340, 190 350 C 160 360, 120 340, 110 300 C 80 290, 70 250, 90 220 C 60 200, 60 150, 90 130 C 85 90, 120 50, 160 40 C 165 30, 172 22, 180 20 Z"
        fill="#F1F5F9"
        stroke={BORDER}
        strokeWidth="2" />
      
      {dots.map((d, i) =>
      <g key={i}>
          <circle cx={d.x} cy={d.y} r="14" fill={SAFFRON} opacity="0.18" className="jc-dot-pulse" style={{ animationDelay: d.delay, transformOrigin: `${d.x}px ${d.y}px` }} />
          <circle cx={d.x} cy={d.y} r="5" fill={SAFFRON} />
        </g>
      )}
    </svg>);

}