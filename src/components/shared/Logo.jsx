// Custom civic-issue logo mark: a location pin with a checkmark —
// "a reported problem, verified/resolved at its location."

export function LogoMark({ size = 36, radius = 10, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx={radius} fill="#F97316" />
      <path
        d="M20 8c-4.42 0-8 3.5-8 8.2 0 5.6 8 15.8 8 15.8s8-10.2 8-15.8c0-4.7-3.58-8.2-8-8.2z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15.8 16.4l3 3 5.4-5.6"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Same glyph without the background badge — for placing directly over
// photos/dark hero sections. `color` sets the pin stroke.
export function LogoGlyph({ size = 36, color = "#F97316", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 6c-5.52 0-10 4.3-10 10 0 7 10 18 10 18s10-11 10-18c0-5.7-4.48-10-10-10z"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 16.4l3.2 3.2 5.8-6"
        fill="none"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LogoMark;
