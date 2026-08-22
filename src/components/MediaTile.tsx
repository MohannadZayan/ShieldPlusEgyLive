import Image from "next/image";

import type { Locale } from "@/lib/business";
import { asset } from "@/lib/asset";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * A single piece of client media — photo or studio clip — in a portrait frame.
 *
 * All the client's footage is shot vertically on a phone, so every tile uses the
 * same 3/4 box and `object-cover`. That keeps mixed rows from going ragged.
 *
 * Clips are muted, looping and inline: they're ambient B-roll, not a player, so
 * there are no controls and no audio track to manage.
 */
export function MediaTile({
  src,
  alt,
  locale,
  width,
  height,
  delay = 0,
  poster,
  className = "",
  priority = false,
}: {
  src: string;
  /** Required for images. Videos are decorative and labelled by their caption. */
  alt?: string;
  locale: Locale;
  width?: number;
  height?: number;
  delay?: number;
  poster?: string;
  className?: string;
  priority?: boolean;
}) {
  const t = getDict(locale);
  const isVideo = src.endsWith(".mp4");

  return (
    <Reveal
      delay={delay}
      className={`group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card ${className}`}
    >
      {isVideo ? (
        <video
          src={asset(src)}
          poster={poster ? asset(poster) : undefined}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {t.gallery.videoUnsupported}
        </video>
      ) : (
        <Image
          // `unoptimized` images bypass the optimizer route, and with it the
          // automatic basePath prefix — so this needs asset() too.
          src={asset(src)}
          alt={alt ?? ""}
          width={width ?? 960}
          height={height ?? 1280}
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
    </Reveal>
  );
}
