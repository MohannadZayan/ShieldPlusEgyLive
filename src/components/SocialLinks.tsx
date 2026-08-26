import type { ReactNode } from "react";

import { BUSINESS } from "@/lib/business";
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "./Icons";

/**
 * The client's social profiles, in one place so the footer and the contact
 * page can never drift apart. Order is roughly by how active each channel is.
 */
export const SOCIALS: { key: string; label: string; href: string; icon: ReactNode }[] = [
  { key: "instagram", label: "Instagram", href: BUSINESS.social.instagram, icon: <InstagramIcon /> },
  { key: "tiktok", label: "TikTok", href: BUSINESS.social.tiktok, icon: <TikTokIcon /> },
  { key: "facebook", label: "Facebook", href: BUSINESS.social.facebook, icon: <FacebookIcon /> },
  { key: "youtube", label: "YouTube", href: BUSINESS.social.youtube, icon: <YouTubeIcon /> },
  { key: "x", label: "X", href: BUSINESS.social.x, icon: <XIcon /> },
];

/** Row of circular icon buttons. Each carries its own accessible name. */
export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${BUSINESS.name} ${s.label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-hi hover:text-fg"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
