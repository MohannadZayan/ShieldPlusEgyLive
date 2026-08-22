import Image from "next/image";

import type { Locale } from "@/lib/business";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Work gallery — client's own photography and studio footage only.
 * No stock imagery: every asset here is a car ShieldPlusEGY actually worked on.
 *
 * Alt text describes what is visibly in each frame and stops there. It does not
 * claim which product was fitted, because that was not supplied per-car.
 */

const PHOTOS = [
  {
    src: "/media/work-range-rover-evoque.jpeg",
    width: 1080,
    height: 1350,
    alt: {
      en: "Grey Range Rover Evoque under the studio lights, front end freshly finished",
      ar: "رينج روفر إيفوك رمادية تحت إضاءة المركز بعد الانتهاء من الواجهة الأمامية",
    },
  },
  {
    src: "/media/work-bmw-x7.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "Black BMW X7 M Sport photographed head-on inside the ShieldPlusEGY studio",
      ar: "BMW X7 إم سبورت سوداء مصوّرة من الأمام داخل مركز شيلد بلس",
    },
  },
  {
    src: "/media/work-suv-front.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "Bronze SUV front quarter, showing the headlight, wheel arch and alloy wheel",
      ar: "الربع الأمامي لسيارة SUV برونزية، يظهر فيه الكشاف وقوس العجلة والجنط",
    },
  },
] as const;

const VIDEOS = [
  { src: "/media/studio-1.mp4" },
  { src: "/media/studio-2.mp4" },
] as const;

export function Gallery({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-5">
      {PHOTOS.map((photo, i) => (
        <Reveal
          key={photo.src}
          delay={i * 90}
          className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card"
        >
          <Image
            src={photo.src}
            alt={photo.alt[locale]}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Reveal>
      ))}

      {VIDEOS.map((video, i) => (
        <Reveal
          key={video.src}
          delay={(PHOTOS.length + i) * 90}
          className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-card"
        >
          {/* Muted, looping, inline — ambient studio footage, not a player.
              Controls are omitted deliberately: there is no audio track to
              manage and nothing to seek. */}
          <video
            src={video.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.gallery.title}
          >
            {t.gallery.videoUnsupported}
          </video>
        </Reveal>
      ))}
    </div>
  );
}
