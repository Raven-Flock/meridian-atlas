import type { Point, RegionId } from "./types";

export type PlateId =
  | "face"
  | "side"
  | "neck"
  | "chest"
  | "abdomen"
  | "back"
  | "arm"
  | "hand"
  | "leg"
  | "foot"
  | "sole"
  | "palm";

export type Mark = { plate: PlateId; x: number; y: number; tip: string };

export type Finding = { quick: string; how: string; alt?: string };

const POSTURE: Record<RegionId, string> = {
  "head-face": "Face a mirror, or use a finger on the landmark the chart names.",
  neck: "Sit tall and turn the head a little if you need a muscle to stand out.",
  chest: "Find the midline first, then count ribs or cun outward. Do not press into the rib cage.",
  abdomen: "Lie or stand so the navel is easy to find. Count cun up or down the midline, then out to the side.",
  back: "The knobs you feel on the spine are spinous processes. Count from the big knob at the base of the neck (C7) when the chart names a vertebra.",
  "shoulder-arm": "Let the arm hang, then bend the elbow if the crease is the landmark.",
  hand: "Rest the hand flat so the crease, the web, or the nail the chart names is visible.",
  "hip-leg": "Sit or stand so the kneecap, the shin bone, or the ankle bone is easy to feel.",
  foot: "Sit and cross the ankle over the knee if you need to see the top, the side, or the sole.",
  ear: "The hollows around the ear show more clearly when the mouth opens slightly.",
};

type Special = Finding;

const SPECIAL: Record<string, Special> = {
  li4: {
    quick: "In the web between thumb and index finger, level with the middle of the bone that leads to the index finger.",
    how: "Squeeze the thumb against the side of the index finger so the muscle bulges. The point is at the highest point of that bulge. On the chart it is the radial side of the hand, at the midpoint of the 2nd metacarpal.",
    alt: "From the end of the crease where the thumb joins the hand, slide toward the index finger until you are halfway along that bone.",
  },
  li11: {
    quick: "At the outer end of the elbow crease, halfway between the biceps tendon and the outer bony knob.",
    how: "Bend the elbow to 90 degrees. The crease ends on the thumb side of the arm. The point sits in that outer end of the crease, midway between the biceps tendon and the lateral epicondyle.",
    alt: "With the elbow bent, the hollow just in front of the outer elbow bone is the spot.",
  },
  lu5: {
    quick: "On the elbow crease, just to the thumb side of the biceps tendon.",
    how: "Bend the elbow slightly. The biceps tendon stands up in the middle of the crease. The point is in the depression on the radial side of that tendon.",
  },
  lu7: {
    quick: "A thumb-width and a half above the wrist crease, just beyond the bony point of the radius.",
    how: "Cross the webs of your thumbs and index fingers. The index finger of the other hand often lands in a small notch just proximal to the styloid process of the radius. That notch is about 1.5 cun above the wrist crease.",
    alt: "Feel the bump on the thumb side of the wrist, then slide just toward the elbow into the hollow.",
  },
  lu9: {
    quick: "On the thumb side of the wrist crease, in the hollow beside the pulse.",
    how: "Lay the palm up. Find the wrist crease on the radial side. The point is in the depression on the radial side of the radial artery, where the pulse is felt.",
  },
  pc6: {
    quick: "Three finger-widths up from the wrist crease, between the two central tendons.",
    how: "Turn the palm up and flex the wrist so two tendons rise in the centre. Lay the index, middle, and ring fingers across the wrist from the crease. The point is between those tendons, at about 2 cun.",
    alt: "Two thumb-widths above the wrist crease is the same band.",
  },
  ht7: {
    quick: "On the wrist crease, little-finger side, in the hollow next to the tendon.",
    how: "Palm up. Follow the wrist crease toward the little finger. The point is in the depression on the radial side of the flexor carpi ulnaris tendon.",
    alt: "The tendon is the cord just before the outer edge of the wrist. The hollow is on its thumb side.",
  },
  si3: {
    quick: "On the little-finger edge of the hand, at the end of the palm crease.",
    how: "Make a loose fist. A crease ends on the ulnar border, just behind the knuckle of the little finger. The point is in that depression, proximal to the head of the 5th metacarpal.",
  },
  st36: {
    quick: "One finger-width outside the sharp edge of the shin, about four finger-widths below the kneecap.",
    how: "Find the lower border of the patella. Measure 3 cun down the leg. The point is 1 finger-breadth lateral to the anterior crest of the tibia, in the muscle beside the bone.",
    alt: "From the outer eye of the knee, the hollow beside the kneecap tendon, drop 3 cun and come one finger out from the shin.",
  },
  st25: {
    quick: "Two cun to the side of the centre of the navel.",
    how: "Find the centre of the umbilicus. Move 2 cun straight to the side, about three finger-widths. The point is level with the navel, not above or below it.",
  },
  sp6: {
    quick: "Four finger-widths above the inner ankle bone, just behind the shin.",
    how: "Find the tip of the medial malleolus. Measure 3 cun straight up. The point is on the posterior border of the tibia, in the soft tissue behind the bone.",
    alt: "The width of your four fingers held together is the usual way to estimate that 3 cun.",
  },
  sp9: {
    quick: "In the hollow just below the inner knob of the knee.",
    how: "Slide a finger up the inner face of the shin until it tucks under the medial condyle of the tibia. The point is in that depression, posterior and inferior to the knob.",
  },
  ki1: {
    quick: "On the sole, in the hollow that forms when you curl the toes, in the front third of the foot.",
    how: "Curl the toes down. A depression appears in line with the second toe, about one third of the way from the toes to the heel. The point is in that hollow.",
  },
  ki3: {
    quick: "In the hollow between the inner ankle bone and the Achilles tendon.",
    how: "Find the tip of the medial malleolus and the Achilles tendon. The point is midway between them, level with the tip of the ankle bone.",
    alt: "It is the inner-ankle mirror of the outer hollow used for BL60.",
  },
  lv3: {
    quick: "On the top of the foot, in the hollow where the bones of the first and second toes meet.",
    how: "Slide a finger from the web between the big toe and the second toe toward the ankle. Stop in the depression just distal to the junction of the 1st and 2nd metatarsal bones.",
    alt: "The groove is easiest to see if you lift the big toe.",
  },
  gb20: {
    quick: "In the hollows under the base of the skull, either side of the big neck muscles.",
    how: "Place the thumbs under the occiput. Slide outward from the midline until the thumb drops into the depression between the sternocleidomastoid and the trapezius.",
  },
  gb21: {
    quick: "At the high point of the shoulder muscle, halfway between the neck and the outer shoulder bone.",
    how: "Feel the big vertebra at the base of the neck (C7, where DU14 sits) and the acromion, the outer tip of the shoulder. GB21 is midway between them, on the crest of the trapezius.",
  },
  gb34: {
    quick: "In the hollow just in front of and below the bony head of the outer lower-leg bone.",
    how: "Find the head of the fibula, the knob on the outer leg just below the knee. The point is in the depression anterior and inferior to that knob.",
  },
  bl40: {
    quick: "In the middle of the crease at the back of the knee.",
    how: "Bend the knee slightly. The popliteal crease crosses the back of the joint. The point is at its midpoint.",
  },
  bl60: {
    quick: "In the hollow between the outer ankle bone and the Achilles tendon.",
    how: "Find the prominence of the lateral malleolus and the Achilles tendon. The point is midway between them, level with the tip of the ankle bone.",
  },
  bl23: {
    quick: "One and a half cun beside the spine, level with the second lumbar knob.",
    how: "The iliac crests, the tops of the hip bones, usually meet the spine near L4. Count two knobs up to L2. BL23 is 1.5 cun lateral to the midline, level with the lower border of that spinous process.",
    alt: "On many people that 1.5 cun is about two finger-widths out from the spine.",
  },
  ren4: {
    quick: "On the midline, four finger-widths below the navel.",
    how: "Find the centre of the umbilicus. Measure 3 cun straight down the anterior midline. The point is on that line, not off to the side.",
  },
  ren6: {
    quick: "On the midline, about two finger-widths below the navel.",
    how: "From the centre of the umbilicus, measure 1.5 cun down the anterior midline. That is one and a half thumb-widths.",
  },
  ren12: {
    quick: "On the midline, halfway between the navel and the bottom of the breastbone.",
    how: "The distance from the umbilicus to the xiphoid is 8 cun on the chart. Ren12 is 4 cun above the navel, on the anterior midline.",
  },
  ren17: {
    quick: "On the breastbone, level with the space between the fourth and fifth ribs.",
    how: "On the midline of the sternum, come level with the 4th intercostal space. On many people that is about midway between the nipples.",
  },
  du20: {
    quick: "On the midline of the top of the head, where the ears would meet if you folded them up.",
    how: "Draw a line over the vertex from the tip of one ear to the other. The point is where that line crosses the midline. On a chart it is also 5 cun behind the anterior hairline.",
    alt: "Feel for a slight hollow on the crown, on the midline.",
  },
  du14: {
    quick: "On the midline, just below the most prominent neck bone.",
    how: "Bend the head forward. The spinous process that sticks out most at the base of the neck is usually C7. The point is on the midline, in the hollow below that knob.",
  },
  yintang: {
    quick: "On the midline, between the eyebrows.",
    how: "Find the glabella, the flat spot between the inner ends of the eyebrows. The extra point sits on the midline there.",
  },
  gb30: {
    quick: "On the side of the buttock, about one third of the way from the outer hip bone to the sacrum.",
    how: "Find the greater trochanter, the bony knob on the side of the hip, and the sacral hiatus near the top of the cleft. The point is at the junction of the lateral third and the medial two thirds of that line.",
    alt: "It is easier to feel when you are lying on your side with the hip slightly flexed.",
  },
};

export function finding(point: Point): Finding {
  const special = SPECIAL[point.id];
  if (special) return special;
  const loc = point.location.replace(/\s+/g, " ").trim();
  const bits = loc
    .split(/,\s*/)
    .map((bit) => bit.replace(/\.$/, ""))
    .filter(Boolean);
  const quick = bits.length > 1 ? `${bits[0]}.` : loc;
  const cunNote = /\bcun\b/i.test(loc)
    ? " A cun is your own body inch: the width of the thumb at its joint is about 1 cun, not a ruler inch."
    : "";
  const steps =
    bits.length > 1
      ? bits.map((bit, index) => `${index + 1}. ${bit.charAt(0).toUpperCase()}${bit.slice(1)}.`).join(" ")
      : loc;
  const how = `${POSTURE[point.region]} ${steps}${cunNote}`;
  return { quick, how, alt: alternate(point) };
}

function alternate(point: Point): string | undefined {
  const loc = point.location.toLowerCase();
  if (loc.includes("0.1 cun posterior to the nail")) {
    return "It sits at the corner of the nail, on the side the chart names, not under the nail.";
  }
  if (loc.includes("finger-breadth")) {
    return "A finger-breadth here means the width of one finger laid flat, used as a small cun.";
  }
  if (loc.includes("cubital crease") && loc.includes("flexed")) {
    return "The crease is clearest when the elbow is bent about halfway.";
  }
  if (loc.includes("popliteal")) {
    return "Soften the knee. The crease is the fold at the back of the joint.";
  }
  if (loc.includes("hairline")) {
    return "Use the natural hairline of the chart, even if the hair has receded.";
  }
  return undefined;
}

function num(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (!match?.[1]) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function clamp(value: number, min = 8, max = 92) {
  return Math.min(max, Math.max(min, value));
}

export function markFor(point: Point): Mark {
  const loc = point.location.toLowerCase();
  const tip = finding(point).quick.replace(/\.$/, "");
  const plate = plateFor(point, loc);
  const spot = place(point, plate, loc);
  return { plate, x: spot.x, y: spot.y, tip };
}

function plateFor(point: Point, loc: string): PlateId {
  if (point.id === "ki1" || loc.includes("sole")) return "sole";
  if (loc.includes("palm") || point.id === "ht8" || point.id === "pc8") return "palm";
  if (point.region === "ear" || loc.includes("tragus") || loc.includes("mastoid") || loc.includes("auricle")) return "side";
  if (loc.includes("temple") || loc.includes("apex of the ear")) return "side";
  if (loc.includes("popliteal") || loc.includes("patella") || loc.includes("kneecap") || loc.includes("fibula")) return "leg";
  if (point.region === "head-face" && (loc.includes("occip") || loc.includes("posterior hairline"))) return "side";
  const byRegion: Record<RegionId, PlateId> = {
    "head-face": "face",
    neck: "neck",
    chest: "chest",
    abdomen: "abdomen",
    back: "back",
    "shoulder-arm": "arm",
    hand: "hand",
    "hip-leg": "leg",
    foot: "foot",
    ear: "side",
  };
  return byRegion[point.region];
}

function place(point: Point, plate: PlateId, loc: string): { x: number; y: number } {
  if (plate === "abdomen" || (plate === "chest" && loc.includes("umbilicus"))) {
    return abdomen(point, loc);
  }
  if (plate === "chest") return chest(point, loc);
  if (plate === "back") return back(point, loc);
  if (plate === "face") return face(point, loc);
  if (plate === "side") return side(point, loc);
  if (plate === "neck") return neck(point, loc);
  if (plate === "arm") return arm(point, loc);
  if (plate === "hand" || plate === "palm") return hand(point, loc, plate);
  if (plate === "leg") return leg(point, loc);
  if (plate === "foot" || plate === "sole") return foot(point, loc, plate);
  return { x: 50, y: 50 };
}

function lateralShift(loc: string) {
  const cun = num(loc, /(\d+(?:\.\d+)?) cun lateral/);
  if (cun == null) {
    if (loc.includes("midline") && !loc.includes("lateral")) return 0;
    return 16;
  }
  return Math.min(cun * 6.5, 36);
}

function abdomen(point: Point, loc: string): { x: number; y: number } {
  const up = num(loc, /(\d+(?:\.\d+)?) cun superior to the umbilicus/);
  const down = num(loc, /(\d+(?:\.\d+)?) cun inferior to the umbilicus/);
  let y = 52;
  if (up != null) y = 52 - up * 6;
  if (down != null) y = 52 + down * 6;
  if (loc.includes("pubic")) y = 84;
  if (point.id === "ren8" || loc.includes("centre of the umbilicus")) y = 52;
  const x = loc.includes("midline") && !loc.includes("lateral") ? 50 : 50 + lateralShift(loc);
  return { x: clamp(x), y: clamp(y, 14, 88) };
}

function chest(point: Point, loc: string): { x: number; y: number } {
  const space = num(loc, /(\d+)(?:st|nd|rd|th) intercostal/);
  let y = space != null ? 18 + (space - 1) * 12 : 40;
  if (loc.includes("clavicle")) y = 14;
  if (loc.includes("suprasternal") || point.id === "ren22") y = 8;
  const midline = loc.includes("midline") && !loc.includes("lateral");
  const x = midline ? 50 : 50 + (num(loc, /(\d+(?:\.\d+)?) cun lateral/) != null ? lateralShift(loc) : 22);
  return { x: clamp(x, 18, 88), y: clamp(y, 10, 78) };
}

const VERTEBRA: Record<string, number> = {
  c7: 8,
  t1: 14,
  t2: 18,
  t3: 22,
  t4: 26,
  t5: 30,
  t6: 34,
  t7: 38,
  t9: 46,
  t10: 50,
  t11: 54,
  t12: 58,
  l1: 64,
  l2: 68,
  l3: 72,
  l4: 76,
  l5: 80,
};

function back(point: Point, loc: string): { x: number; y: number } {
  const bone = loc.match(/\b(c7|t\d+|l\d+)\b/);
  let y = bone ? (VERTEBRA[bone[1]] ?? 40) : 40 + ((point.order % 12) - 6);
  if (loc.includes("sacral foramen")) {
    const which = num(loc, /(\d)(?:st|nd|rd|th) sacral/);
    y = 84 + (which ?? 1) * 3;
  }
  if (loc.includes("coccyx") || point.id === "du1") y = 96;
  if (point.id === "du14") y = 8;
  const cun = num(loc, /(\d+(?:\.\d+)?) cun lateral/);
  const midline = point.channelId === "du" || (loc.includes("midline") && cun == null);
  const x = midline ? 50 : 50 + (cun != null ? Math.min(cun * 8, 28) : 14);
  return { x: clamp(x, 20, 84), y: clamp(y, 6, 94) };
}

function face(point: Point, loc: string): { x: number; y: number } {
  if (point.id === "yintang" || loc.includes("glabella") || loc.includes("between the eyebrows")) return { x: 50, y: 30 };
  if (loc.includes("inner canthus") || point.id === "bl1") return { x: 42, y: 40 };
  if (loc.includes("outer canthus") || point.id === "gb1") return { x: 24, y: 40 };
  if (loc.includes("eyebrow")) return { x: loc.includes("midpoint") ? 34 : 40, y: 34 };
  if (loc.includes("infraorbital") || loc.includes("pupil")) return { x: 36, y: loc.includes("nostril") || loc.includes("ala") ? 52 : 46 };
  if (loc.includes("ala nasi") || loc.includes("nostril")) return { x: 58, y: 54 };
  if (loc.includes("philtrum") || point.id === "du26") return { x: 50, y: 62 };
  if (loc.includes("mentolabial") || point.id === "ren24") return { x: 50, y: 74 };
  if (loc.includes("corner of the mouth")) return { x: 62, y: 66 };
  if (loc.includes("hairline")) return { x: loc.includes("midline") ? 50 : 28, y: 12 };
  if (loc.includes("mandible") || loc.includes("masseter")) return { x: 70, y: 72 };
  return { x: 50, y: 36 + (point.order % 5) * 8 };
}

function side(point: Point, loc: string): { x: number; y: number } {
  if (loc.includes("eyebrow") || point.id === "sj23" || point.id === "gb1") return { x: 28, y: 42 };
  if (loc.includes("tragus") || loc.includes("condyle") || point.id === "si19") return { x: 38, y: 58 };
  if (loc.includes("earlobe") || point.id === "sj17") return { x: 48, y: 70 };
  if (loc.includes("mastoid")) return { x: 62, y: 64 };
  if (loc.includes("occip") || point.id === "gb20" || point.id === "du16") return { x: 78, y: 48 };
  if (loc.includes("temple") || loc.includes("apex of the ear")) return { x: 40, y: 28 };
  return { x: 46, y: 50 };
}

function neck(point: Point, loc: string): { x: number; y: number } {
  if (point.id === "du14" || loc.includes("c7")) return { x: 50, y: 78 };
  if (loc.includes("laryngeal") || loc.includes("anterior border")) return { x: 62, y: 42 };
  if (loc.includes("suprasternal")) return { x: 50, y: 88 };
  return { x: loc.includes("posterior") ? 38 : 58, y: 48 };
}

function arm(point: Point, loc: string): { x: number; y: number } {
  const proximalToWrist = num(loc, /(\d+(?:\.\d+)?) cun proximal to (?:the )?(?:wrist|dorsal wrist)/);
  const distalToElbow = num(loc, /(\d+(?:\.\d+)?) cun distal to li11/);
  const proximalToElbow = num(loc, /(\d+(?:\.\d+)?) cun proximal to li11/);
  let y = 55;
  if (loc.includes("cubital") || loc.includes("elbow")) y = 38;
  if (loc.includes("wrist")) y = 82;
  if (loc.includes("shoulder") || loc.includes("acromion") || loc.includes("deltoid")) y = 16;
  if (proximalToWrist != null) y = 82 - proximalToWrist * 4.2;
  if (distalToElbow != null) y = 38 + distalToElbow * 5;
  if (proximalToElbow != null) y = 38 - proximalToElbow * 4;
  const radial = loc.includes("radial") || loc.includes("thumb");
  const ulnar = loc.includes("ulnar") || loc.includes("little");
  const x = radial ? 34 : ulnar ? 66 : 50;
  return { x, y: clamp(y, 12, 88) };
}

function hand(point: Point, loc: string, plate: PlateId): { x: number; y: number } {
  if (plate === "palm") {
    if (point.id === "pc8") return { x: 48, y: 58 };
    if (point.id === "ht8") return { x: 62, y: 62 };
    return { x: 50, y: 60 };
  }
  if (loc.includes("snuffbox") || point.id === "li5") return { x: 32, y: 28 };
  if (point.id === "li4" || loc.includes("2nd metacarpal")) return { x: 40, y: 48 };
  if (loc.includes("nail")) {
    const radial = loc.includes("radial") || loc.includes("thumb side");
    return { x: radial ? 34 : 70, y: 86 };
  }
  if (loc.includes("wrist")) return { x: loc.includes("ulnar") ? 68 : 36, y: 18 };
  if (loc.includes("web")) return { x: 58, y: 70 };
  return { x: 40 + (point.order % 4) * 10, y: 40 + (point.order % 3) * 12 };
}

function leg(point: Point, loc: string): { x: number; y: number } {
  const belowKnee = num(loc, /(\d+(?:\.\d+)?) cun below the lower border of the patella/);
  const aboveMalleolus = num(loc, /(\d+(?:\.\d+)?) cun (?:superior|proximal) to the (?:tip of the )?(?:medial|lateral) malleolus/);
  let y = 48;
  if (belowKnee != null) y = 30 + belowKnee * 5.2;
  else if (aboveMalleolus != null) y = 88 - aboveMalleolus * 4.5;
  else if (loc.includes("popliteal") || loc.includes("patella") || loc.includes("condyle") || loc.includes("fibula")) y = 24;
  else if (loc.includes("malleolus") || loc.includes("ankle")) y = 86;
  else if (loc.includes("trochanter") || loc.includes("buttock") || loc.includes("iliac")) y = 10;
  const medial = loc.includes("medial") || loc.includes("inner");
  const lateral = loc.includes("lateral") || loc.includes("finger-breadth");
  const x = medial ? 36 : lateral ? 64 : 50;
  return { x, y: clamp(y, 8, 90) };
}

function foot(point: Point, loc: string, plate: PlateId): { x: number; y: number } {
  if (plate === "sole" || point.id === "ki1") return { x: 48, y: 36 };
  if (loc.includes("nail")) return { x: loc.includes("lateral") ? 62 : 40, y: 88 };
  if (loc.includes("web")) return { x: 50, y: 74 };
  if (loc.includes("metatarsal")) return { x: loc.includes("5th") || loc.includes("4th") ? 64 : 42, y: 58 };
  if (loc.includes("malleolus")) return { x: loc.includes("lateral") ? 70 : 30, y: 18 };
  return { x: 48, y: 50 };
}

/** Schematic routes on a 200×280 standing figure. Order runs from the first classical point to the last. */
export const CHANNEL_ROUTES: Record<string, Array<[number, number]>> = {
  lu: [[118, 78], [70, 96], [48, 140], [36, 190], [28, 214]],
  li: [[30, 220], [40, 190], [52, 140], [64, 96], [150, 70], [156, 58]],
  st: [[156, 52], [150, 78], [146, 120], [150, 168], [154, 230], [148, 258]],
  sp: [[132, 258], [128, 220], [124, 168], [118, 130], [110, 100]],
  ht: [[78, 108], [64, 140], [58, 188], [62, 214]],
  si: [[70, 220], [78, 190], [86, 140], [96, 108], [70, 88], [150, 64]],
  bl: [[92, 36], [96, 70], [108, 90], [112, 150], [118, 200], [126, 250]],
  ki: [[108, 262], [100, 230], [96, 180], [108, 150], [112, 100], [124, 78]],
  pc: [[136, 92], [74, 120], [66, 150], [60, 190], [64, 214]],
  sj: [[74, 220], [82, 190], [90, 145], [100, 100], [150, 72], [168, 56]],
  gb: [[168, 48], [176, 70], [160, 100], [168, 140], [160, 190], [150, 250]],
  lv: [[140, 258], [134, 220], [128, 170], [120, 140], [114, 96]],
  ren: [[100, 168], [100, 140], [100, 110], [100, 86], [100, 64]],
  du: [[100, 176], [100, 140], [100, 96], [100, 40], [100, 28], [100, 58]],
};
