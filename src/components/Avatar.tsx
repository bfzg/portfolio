interface AvatarProps {
  src?: string;
}

export default function Avatar({ src }: AvatarProps) {
  if (src) {
    return (
      <div className="w-[280px] h-[280px] rounded-lg overflow-hidden">
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Default avatar illustration matching the design
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="140" cy="80" r="40" fill="#0A0A0A" />
      {/* Hair */}
      <path d="M90 110c0-30 22-50 50-50s50 20 50 50" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="90" y="80" width="100" height="120" rx="50" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="6" />
      {/* Orange accent on shoulder */}
      <rect x="170" y="85" width="30" height="10" rx="2" fill="#D97706" />
      {/* Eyes */}
      <circle cx="120" cy="135" r="7" fill="#0A0A0A" />
      <circle cx="160" cy="135" r="7" fill="#0A0A0A" />
      {/* Mouth */}
      <path d="M125 170c10 15 30 15 40 0" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Shoulders/torso */}
      <path d="M85 230c0-15 25-25 55-25s55 10 55 25v50H85v-50z" fill="#0A0A0A" />
      {/* Arms */}
      <circle cx="75" cy="245" r="12" fill="#0A0A0A" />
      <circle cx="205" cy="245" r="12" fill="#0A0A0A" />
    </svg>
  );
}
