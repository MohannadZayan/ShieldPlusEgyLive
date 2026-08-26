import type { Locale } from "@/lib/business";
import { MediaTile } from "./MediaTile";

/**
 * Work gallery — the client's own photography and studio footage only.
 * No stock imagery: every car here is one ShieldPlusEGY actually worked on.
 *
 * Alt text describes what is visibly in the frame and stops there. It does not
 * name which film or service each car received, because that was not supplied
 * per-car and guessing would be a fabricated claim.
 */

type Item = {
  src: string;
  width?: number;
  height?: number;
  alt?: Record<Locale, string>;
};

const ITEMS: Item[] = [
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
    src: "/media/work-mercedes-e-class.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "White Mercedes-Benz E-Class AMG Line, front end reflecting the studio lighting",
      ar: "مرسيدس E-Class AMG Line بيضاء، والواجهة الأمامية بتعكس إضاءة المركز",
    },
  },
  {
    src: "/media/work-skoda-kodiaq.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "Black Škoda Kodiaq with the illuminated grille lit up, seen head-on",
      ar: "سكودا كودياك سوداء بشبكة أمامية مضيئة، مصوّرة من الأمام",
    },
  },
  {
    src: "/media/work-bmw-x1.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "Black BMW X1 in a showroom, ceiling lights mirrored across the bonnet",
      ar: "BMW X1 سوداء في المعرض، وإضاءة السقف منعكسة على الكابوت",
    },
  },
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
    src: "/media/work-suv-front.jpeg",
    width: 960,
    height: 1280,
    alt: {
      en: "Bronze SUV front quarter, showing the headlight, wheel arch and alloy wheel",
      ar: "الربع الأمامي لسيارة SUV برونزية، يظهر فيه الكشاف وقوس العجلة والجنط",
    },
  },
  { src: "/media/studio-bmw-x7.mp4" },
  { src: "/media/washing-rinse.mp4" },
  { src: "/media/studio-1.mp4" },
  { src: "/media/studio-2.mp4" },
];

export function Gallery({ locale }: { locale: Locale }) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
      {ITEMS.map((item, i) => (
        <MediaTile
          key={item.src}
          src={item.src}
          alt={item.alt?.[locale]}
          width={item.width}
          height={item.height}
          locale={locale}
          delay={i * 70}
        />
      ))}
    </div>
  );
}
