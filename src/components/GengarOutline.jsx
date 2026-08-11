export default function GengarOutline({ className = '', animated = false, showEyes = false }) {
  return (
    <svg
      className={`${className} ${animated ? 'gengar-outline--animated' : ''}`.trim()}
      viewBox="0 0 1100 900"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="gengar-contour"
        pathLength="1"
        d="M80 840 L190 650 L155 615 L190 580 L120 500 L250 490 L85 105 L420 305 L485 180 L515 245 L550 45 L585 245 L615 180 L680 305 L1015 105 L850 490 L980 500 L910 580 L945 615 L910 650 L1020 840"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {showEyes && (
        <g className="gengar-eyes" fill="#c9184f">
          <path className="gengar-eye gengar-eye--left" d="M350 435 L495 505 L392 486 Z" />
          <path className="gengar-eye gengar-eye--right" d="M750 435 L605 505 L708 486 Z" />
        </g>
      )}
    </svg>
  );
}
