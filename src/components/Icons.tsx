/**
 * Icon set — inline SVG only (no icon font, no emoji, no external requests).
 * All icons are decorative by default; the labelling lives on the parent
 * control, so every icon carries aria-hidden.
 */

type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  focusable: "false" as const,
});

export function ShieldIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M12 2 3 6v6c0 5.2 3.8 9.9 9 11 5.2-1.1 9-5.8 9-11V6l-9-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoMark({ className, size = 30 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path d="M12 2 3 6v6c0 5.2 3.8 9.9 9 11 5.2-1.1 9-5.8 9-11V6l-9-4Z" fill="#3B76F0" />
      <path
        d="m9 12 2 2 4-4.5"
        stroke="#0A0C10"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.1 8.1 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 4 3.5.5.2.9.4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-.9.1-1Z" />
    </svg>
  );
}

export function PhoneIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M12 3v5M12 16v5M3 12h5M16 12h5M6.3 6.3 9 9M15 15l2.7 2.7M17.7 6.3 15 9M9 15l-2.7 2.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DropletIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M12 3s6 5.6 6 9.6a6 6 0 1 1-12 0C6 8.6 12 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LayersIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="m12 3 9 5-9 5-9-5 9-5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m3 13 9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function GlobeIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.6 3.7 5.7 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.7-3.7-9S9.5 5.6 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function ArrowIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} fill="currentColor" className={className}>
      <path d="M16.5 3c.3 2.2 1.6 3.6 3.7 3.8v2.4c-1.2.1-2.4-.2-3.6-.9v5.9c0 4.3-3.9 7.1-7.6 5.6-2.3-.9-3.6-3.1-3.5-5.5.1-2.6 2.1-4.8 4.7-5.1.4 0 .8-.1 1.2 0v2.6c-.4 0-.7.1-1 .2-1.2.3-2 1.4-1.9 2.6.1 1.3 1.2 2.3 2.5 2.3 1.4 0 2.5-1.1 2.5-2.5V3h2.9Z" />
    </svg>
  );
}

export function MenuIcon({ className, size = 26 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, size = 26 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
