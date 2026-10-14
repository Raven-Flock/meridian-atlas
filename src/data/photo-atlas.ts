import type { Point } from "./types";

export type AtlasLabel = { text: string; x: number; y: number };
export type AtlasGuide = { x1: number; y1: number; x2: number; y2: number; text: string };

export type PhotoMark = {
  plate: string;
  x: number;
  y: number;
  labels: AtlasLabel[];
  guide?: AtlasGuide;
  note: string;
  hidden?: string;
};

export type Pathway = {
  plate: "body-front" | "body-back";
  route: Array<[number, number]>;
  note: string;
};

const NOTE = "Photograph of the region. The dot is the charted area. Use the steps to finish the measurement.";

const HIDDEN: Record<string, string> = {
  st17: "ST17 is the center of the nipple. It is a landmark on the chart, not a point to press or needle. No photo is shown.",
  ren1: "REN1 is on the perineum, midway between the anus and the genitals. No photo is shown. Licensed practice only.",
  du1: "DU1 is midway between the tip of the coccyx and the anus. No photo is shown. Licensed practice only.",
};

const PLATE_LABELS: Record<string, AtlasLabel[]> = {
  hand: [
    { text: "wrist", x: 62, y: 14 },
    { text: "thumb", x: 12, y: 58 },
  ],
  palm: [
    { text: "wrist crease", x: 74, y: 16 },
    { text: "thenar", x: 28, y: 36 },
  ],
  arm: [
    { text: "elbow crease", x: 76, y: 16 },
    { text: "wrist", x: 76, y: 80 },
  ],
  "arm-outer": [
    { text: "elbow", x: 76, y: 16 },
    { text: "wrist", x: 76, y: 80 },
  ],
  shoulder: [
    { text: "shoulder tip", x: 62, y: 18 },
    { text: "armpit crease", x: 22, y: 58 },
  ],
  knee: [
    { text: "kneecap", x: 78, y: 44 },
    { text: "shin", x: 28, y: 78 },
  ],
  popliteal: [
    { text: "knee crease", x: 74, y: 42 },
    { text: "calf", x: 74, y: 70 },
  ],
  "ankle-in": [
    { text: "inner ankle bone", x: 28, y: 58 },
    { text: "Achilles", x: 74, y: 74 },
  ],
  "ankle-out": [
    { text: "outer ankle bone", x: 76, y: 54 },
    { text: "Achilles", x: 36, y: 64 },
  ],
  foot: [
    { text: "ankle", x: 62, y: 12 },
    { text: "big toe", x: 14, y: 82 },
  ],
  sole: [
    { text: "ball of the foot", x: 74, y: 28 },
    { text: "heel", x: 70, y: 82 },
  ],
  face: [
    { text: "eyebrow", x: 22, y: 38 },
    { text: "nostril", x: 70, y: 58 },
  ],
  side: [
    { text: "temple", x: 16, y: 40 },
    { text: "ear", x: 72, y: 52 },
  ],
  neck: [
    { text: "jaw", x: 18, y: 28 },
    { text: "neck muscle", x: 78, y: 48 },
  ],
  abdomen: [
    { text: "navel", x: 66, y: 52 },
    { text: "midline", x: 36, y: 28 },
  ],
  chest: [
    { text: "notch", x: 64, y: 40 },
    { text: "collarbone", x: 22, y: 50 },
  ],
  back: [
    { text: "spine", x: 62, y: 22 },
    { text: "neck knob", x: 36, y: 14 },
  ],
  "low-back": [
    { text: "spine", x: 34, y: 36 },
    { text: "waist", x: 74, y: 58 },
  ],
  hip: [
    { text: "hip", x: 22, y: 36 },
    { text: "thigh", x: 70, y: 68 },
  ],
};

type Pin = {
  plate: string;
  x: number;
  y: number;
  guide?: AtlasGuide;
  extra?: string;
  labels?: AtlasLabel[];
};

const PINS: Record<string, Pin> = {
  li4: {
    plate: "hand",
    x: 38,
    y: 52,
    labels: [
      { text: "web", x: 22, y: 42 },
      { text: "index bone", x: 52, y: 64 },
    ],
  },
  pc6: {
    plate: "arm",
    x: 50,
    y: 69,
    guide: { x1: 50, y1: 80, x2: 50, y2: 69, text: "2 cun" },
    labels: [{ text: "between tendons", x: 72, y: 64 }],
  },
  pc8: { plate: "palm", x: 54, y: 46, labels: [{ text: "center of the palm", x: 72, y: 40 }] },
  lu5: { plate: "arm", x: 42, y: 18, labels: [{ text: "thumb side of tendon", x: 22, y: 28 }] },
  lu7: {
    plate: "arm",
    x: 42,
    y: 74,
    guide: { x1: 42, y1: 80, x2: 42, y2: 74, text: "1.5 cun" },
  },
  lu9: { plate: "arm", x: 40, y: 80 },
  ht7: { plate: "arm", x: 56, y: 78, labels: [{ text: "ulnar wrist", x: 74, y: 72 }] },
  li11: {
    plate: "arm",
    x: 44,
    y: 20,
    extra: " Outer end of the elbow crease. Bend the elbow to see it; this photo shows the inner crease.",
  },
  st36: {
    plate: "knee",
    x: 48,
    y: 72,
    guide: { x1: 58, y1: 56, x2: 48, y2: 72, text: "3 cun" },
    labels: [{ text: "beside the shin", x: 22, y: 68 }],
  },
  gb34: { plate: "knee", x: 42, y: 68, labels: [{ text: "below the outer knee", x: 18, y: 60 }] },
  sp9: { plate: "knee", x: 64, y: 62, labels: [{ text: "inner knee hollow", x: 78, y: 54 }] },
  sp6: {
    plate: "ankle-in",
    x: 50,
    y: 40,
    guide: { x1: 42, y1: 64, x2: 50, y2: 40, text: "3 cun" },
    labels: [{ text: "behind the shin", x: 72, y: 36 }],
  },
  ki3: { plate: "ankle-in", x: 56, y: 66, labels: [{ text: "hollow", x: 74, y: 60 }] },
  ki1: { plate: "sole", x: 50, y: 34, labels: [{ text: "sole hollow", x: 72, y: 38 }] },
  bl40: { plate: "popliteal", x: 48, y: 46 },
  bl60: { plate: "ankle-out", x: 52, y: 62, labels: [{ text: "behind the outer ankle", x: 24, y: 54 }] },
  lv3: { plate: "foot", x: 34, y: 58, labels: [{ text: "groove", x: 52, y: 52 }] },
  yintang: { plate: "face", x: 50, y: 42 },
  li20: { plate: "face", x: 58, y: 59 },
  du26: { plate: "face", x: 50, y: 64, labels: [{ text: "philtrum", x: 70, y: 64 }] },
  gb20: { plate: "side", x: 66, y: 70, labels: [{ text: "skull base", x: 80, y: 62 }] },
  du20: {
    plate: "side",
    x: 52,
    y: 9,
    extra: " On the midline of the crown. This side view shows the top of the head.",
  },
  gb21: { plate: "shoulder", x: 38, y: 14, labels: [{ text: "top of the shoulder muscle", x: 18, y: 24 }] },
  lu1: { plate: "chest", x: 78, y: 62, labels: [{ text: "under the outer collarbone", x: 22, y: 70 }] },
  ren17: {
    plate: "chest",
    x: 50,
    y: 86,
    extra: " On the breastbone, level with the 4th rib space. This photo stops at the upper chest — count the rib spaces down from the notch.",
  },
  ren6: {
    plate: "abdomen",
    x: 51,
    y: 62,
    guide: { x1: 51, y1: 55, x2: 51, y2: 62, text: "1.5 cun" },
  },
  ren4: {
    plate: "abdomen",
    x: 51,
    y: 69,
    guide: { x1: 51, y1: 55, x2: 51, y2: 69, text: "3 cun" },
  },
  st25: { plate: "abdomen", x: 64, y: 55, labels: [{ text: "2 cun from the navel", x: 74, y: 46 }] },
  bl23: {
    plate: "low-back",
    x: 58,
    y: 48,
    labels: [{ text: "level with the waist", x: 74, y: 42 }],
  },
  du14: { plate: "back", x: 53, y: 17 },
  gb30: {
    plate: "hip",
    x: 36,
    y: 46,
    extra: " In the gluteal muscle, one-third of the way from the bony hip toward the tailbone. The shorts cover the exact spot.",
  },
};

function num(text: string, pattern: RegExp): number | null {
  const match = text.match(pattern);
  if (!match?.[1]) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function at(x: number, y: number, bounds?: { x: [number, number]; y: [number, number] }) {
  const xb = bounds?.x ?? [8, 92];
  const yb = bounds?.y ?? [8, 92];
  return {
    x: Math.round(clamp(x, xb[0], xb[1]) * 10) / 10,
    y: Math.round(clamp(y, yb[0], yb[1]) * 10) / 10,
  };
}

type Spot = { plate: string; x: number; y: number; guide?: AtlasGuide; extra?: string; labels?: AtlasLabel[] };

function place(point: Point, loc: string): Spot {
  const pin = PINS[point.id];
  if (pin) return pin;
  if (/sole|plantar/.test(loc) || point.id === "ki1") return { plate: "sole", ...sole(point, loc) };
  if (/on the palm|thenar|between the 2nd and 3rd metacarpal|between the 4th and 5th metacarpal/.test(loc) || point.id === "pc8" || point.id === "ht8" || point.id === "lu10") {
    return { plate: "palm", ...palm(point, loc) };
  }
  if (point.region === "hand" || /snuffbox|metacarpal|nail corner/.test(loc)) {
    return /on the palm|thenar/.test(loc) ? { plate: "palm", ...palm(point, loc) } : { plate: "hand", ...hand(point, loc) };
  }
  if (/popliteal/.test(loc)) return { plate: "popliteal", ...popliteal(point, loc) };
  if (/medial malleolus/.test(loc)) return { plate: "ankle-in", ...ankleIn(loc) };
  if (/lateral malleolus/.test(loc)) return { plate: "ankle-out", ...ankleOut(loc) };
  if (/greater trochanter|glute|sacral hiatus|lateral thigh|superior to the popliteal/.test(loc)) {
    return { plate: "hip", ...hip(point, loc) };
  }
  if (/patella|fibular head|head of the fibula|anterior crest of the tibia|tibial crest|condyle of the tibia/.test(loc)) {
    return { plate: "knee", ...knee(point, loc) };
  }
  if (point.region === "foot") return { plate: "foot", ...foot(point, loc) };
  if (point.region === "hip-leg") return { plate: "knee", ...knee(point, loc) };
  if (/intercostal|mid-axillary/.test(loc)) {
    return { plate: "chest", ...chest(point, loc) };
  }
  if (/posterior hairline|occipital prominence|spinous process of c1/.test(loc)) {
    return { plate: "back", ...upperBack(point, loc) };
  }
  if (/acromion|deltoid|axillary fold|centre of the axilla|center of the axilla|shoulder depression|highest point of the trapezius/.test(loc)) {
    return { plate: "shoulder", ...shoulder(point, loc) };
  }
  if (/scapul|infraspin|suprascapular/.test(loc)) return { plate: "back", ...upperBack(point, loc) };
  if (point.region === "shoulder-arm" || /cubital|forearm|wrist crease|humeral/.test(loc)) {
    return armSpot(point, loc);
  }
  if (/vertex|crown|occiput|\btemple\b|\btragus\b|\bmastoid\b|auricle|apex of the ear|behind the ear|outer canthus and the eyebrow/.test(loc)) {
    return { plate: "side", ...side(point, loc) };
  }
  if (point.region === "ear") return { plate: "side", ...side(point, loc) };
  if (/sternocleidomastoid|laryngeal|anterior border of the neck/.test(loc) || point.region === "neck") {
    return { plate: "neck", ...neck(point, loc) };
  }
  if (point.region === "chest" || /intercostal|clavicle|suprasternal|sternum|mid-axillary/.test(loc)) {
    return { plate: "chest", ...chest(point, loc) };
  }
  if (point.region === "abdomen" || /umbilicus|pubic|inguinal/.test(loc)) return { plate: "abdomen", ...abdomen(point, loc) };
  if (point.region === "back" || /spinous|sacral|vertebra/.test(loc)) return backSpot(point, loc);
  if (point.region === "head-face") return { plate: "face", ...face(point, loc) };
  return { plate: "face", x: 50, y: 46 };
}

function hand(point: Point, loc: string): { x: number; y: number } {
  const box = { x: [14, 78] as [number, number], y: [14, 94] as [number, number] };
  if (/2nd metacarpal/.test(loc)) return at(34, 46, box);
  if (/snuffbox/.test(loc)) return at(30, 22, box);
  if (/nail/.test(loc)) {
    if (/thumb/.test(loc)) return at(28, 80, box);
    if (/index/.test(loc)) return at(40, 86, box);
    if (/middle/.test(loc)) return at(52, 96, box);
    if (/ring|4th/.test(loc)) return at(62, 88, box);
    return at(72, 78, box);
  }
  if (/5th metacarpal|ulnar border/.test(loc)) return at(70, 58, box);
  if (/wrist/.test(loc)) return at(/ulnar/.test(loc) ? 66 : 32, 18, box);
  if (/web/.test(loc)) return at(36, 72, box);
  if (/metacarpophalangeal|head of the 2nd|head of the 5th/.test(loc)) {
    return at(/5th|ulnar/.test(loc) ? 68 : 42, 68, box);
  }
  return at(34 + (point.order % 5) * 8, 40 + (point.order % 4) * 8, box);
}

function palm(point: Point, loc: string): { x: number; y: number } {
  const box = { x: [22, 76] as [number, number], y: [16, 88] as [number, number] };
  if (/2nd and 3rd/.test(loc) || point.id === "pc8") return at(54, 46, box);
  if (/4th and 5th/.test(loc) || point.id === "ht8") return at(66, 52, box);
  if (/thenar|1st metacarpal/.test(loc)) return at(34, 40, box);
  if (/wrist/.test(loc)) return at(52, 18, box);
  return at(52, 48, box);
}

function armSpot(point: Point, loc: string): Spot {
  const wrist = 80;
  const elbow = 17;
  const cun = (wrist - elbow) / 12;
  const box = { x: [34, 66] as [number, number], y: [12, 84] as [number, number] };
  const proximalWrist = num(loc, /(\d+(?:\.\d+)?) cun proximal to (?:the )?(?:wrist|dorsal wrist)/);
  const proximalPoint = num(loc, /(\d+(?:\.\d+)?) cun proximal to (?:lu9|ht7|pc7|si5|li5)/);
  const distalElbow = num(loc, /(\d+(?:\.\d+)?) cun distal to li11/);
  const proximalElbow = num(loc, /(\d+(?:\.\d+)?) cun proximal to li11/);
  let y = 48;
  let guide: AtlasGuide | undefined;
  if (proximalWrist != null) y = wrist - proximalWrist * cun;
  else if (proximalPoint != null) y = wrist - proximalPoint * cun;
  else if (distalElbow != null) y = elbow + distalElbow * cun;
  else if (proximalElbow != null) y = elbow - proximalElbow * cun;
  else if (/cubital|elbow|epicondyle|olecranon/.test(loc)) y = elbow;
  else if (/wrist/.test(loc)) y = wrist;
  let x = 50;
  if (/radial|thumb side|radius/.test(loc)) x = 40;
  else if (/ulnar|little/.test(loc)) x = 62;
  const yang = point.channelId === "li" || point.channelId === "si" || point.channelId === "sj";
  if (point.channelId === "li") x = 38;
  if (point.channelId === "si") x = 62;
  if (point.channelId === "sj") x = 44;
  const spot = at(x, y, box);
  if (proximalWrist != null || proximalPoint != null) {
    guide = { x1: spot.x, y1: wrist, x2: spot.x, y2: spot.y, text: `${proximalWrist ?? proximalPoint} cun` };
  }
  return {
    plate: "arm",
    ...spot,
    guide,
    extra: yang
      ? " Outer forearm. This photo shows the inner side — keep the same distance from the elbow crease and the wrist, then roll the arm over."
      : undefined,
  };
}

function shoulder(point: Point, loc: string): { x: number; y: number; extra?: string } {
  const box = { x: [24, 78] as [number, number], y: [10, 82] as [number, number] };
  if (/trapezius|du14 and the acromion/.test(loc) || point.id === "gb21") return { ...at(38, 14, box) };
  if (/posterior and inferior to the acromion/.test(loc)) return { ...at(62, 24, box) };
  if (/acromion|shoulder depression/.test(loc)) return { ...at(48, 28, box) };
  if (/posterior axillary/.test(loc)) {
    return { ...at(48, 50, box), extra: " On the back edge of the armpit. This photo shows the front of the shoulder." };
  }
  if (/axill/.test(loc)) {
    const below = num(loc, /(\d+(?:\.\d+)?) cun inferior to the (?:anterior |posterior )?axillary/);
    if (below != null) return { ...at(40 + below * 5, 58 + below * 5, box) };
    return { ...at(36, 56, box), extra: " In the armpit crease. Press the muscle, not the pulse." };
  }
  if (/deltoid/.test(loc)) return { ...at(60, 48, box) };
  const above = num(loc, /(\d+(?:\.\d+)?) cun proximal to li11/);
  if (above != null) return { ...at(52, 70 - above * 6, box) };
  return { ...at(52, 36, box) };
}

function knee(point: Point, loc: string): { x: number; y: number; guide?: AtlasGuide } {
  const box = { x: [34, 76] as [number, number], y: [12, 90] as [number, number] };
  const belowPat = num(loc, /(\d+(?:\.\d+)?) cun below the lower border of the patella/);
  const aboveMal = num(loc, /(\d+(?:\.\d+)?) cun superior to the tip of the (?:medial |lateral )?malleolus/);
  if (belowPat != null) {
    const lateral = /lateral|finger-breadth|fibula/.test(loc);
    const medial = /medial/.test(loc) && !lateral;
    const spot = at(lateral ? 46 : medial ? 70 : 56, 56 + belowPat * 6, box);
    return { ...spot, guide: { x1: 58, y1: 56, x2: spot.x, y2: spot.y, text: `${belowPat} cun` } };
  }
  if (aboveMal != null) {
    const lateral = /lateral|fibula/.test(loc);
    return { ...at(lateral ? 46 : 66, 56 + (16 - aboveMal) * 5.5, box) };
  }
  if (/head of the fibula|fibular head/.test(loc)) return { ...at(40, 64, box) };
  if (/medial condyle|medial end/.test(loc)) return { ...at(72, 58, box) };
  if (/patella/.test(loc)) return { ...at(58, 52, box) };
  return { ...at(52, 62, box) };
}

function popliteal(point: Point, loc: string): { x: number; y: number } {
  const box = { x: [30, 72] as [number, number], y: [28, 88] as [number, number] };
  if (/midpoint/.test(loc)) return at(48, 46, box);
  if (/lateral end/.test(loc)) return at(32, 44, box);
  if (/medial/.test(loc)) return at(68, 46, box);
  const below = num(loc, /(\d+(?:\.\d+)?) cun (?:inferior|distal|below)/);
  if (below != null) return at(48, 46 + below * 5, box);
  return at(48, 46 + (point.order % 5) * 4, box);
}

function ankleIn(loc: string): { x: number; y: number; guide?: AtlasGuide; extra?: string } {
  const box = { x: [30, 70] as [number, number], y: [16, 84] as [number, number] };
  const up = num(loc, /(\d+(?:\.\d+)?) cun superior to the tip of the medial malleolus/);
  if (/between the tip of the medial malleolus and the achilles/.test(loc)) return { ...at(56, 66, box) };
  if (up != null) {
    const spot = at(/posterior/.test(loc) ? 48 : 40, 64 - up * 7, box);
    return { ...spot, guide: { x1: 42, y1: 64, x2: spot.x, y2: spot.y, text: `${up} cun` } };
  }
  if (/posterior and inferior/.test(loc)) return { ...at(52, 74, box) };
  if (/anterior/.test(loc)) return { ...at(34, 70, box) };
  if (/inferior|distal/.test(loc)) return { ...at(40, 76, box) };
  return { ...at(48, 60, box) };
}

function ankleOut(loc: string): { x: number; y: number; guide?: AtlasGuide } {
  const box = { x: [36, 72] as [number, number], y: [14, 86] as [number, number] };
  const up = num(loc, /(\d+(?:\.\d+)?) cun superior to the tip of the lateral malleolus/);
  if (/achilles/.test(loc) || /midway between the prominence of the lateral malleolus/.test(loc)) return { ...at(52, 62, box) };
  if (/anterior and inferior/.test(loc)) return { ...at(50, 72, box) };
  if (/directly inferior|inferior to the lateral malleolus/.test(loc)) return { ...at(58, 70, box) };
  if (up != null) {
    const spot = at(/posterior|fibula/.test(loc) ? 48 : 44, 58 - up * 6.2, box);
    return { ...spot, guide: { x1: 64, y1: 58, x2: spot.x, y2: spot.y, text: `${up} cun` } };
  }
  return { ...at(52, 64, box) };
}

function foot(point: Point, loc: string): { x: number; y: number } {
  const box = { x: [14, 70] as [number, number], y: [12, 92] as [number, number] };
  if (/1st and 2nd metatarsal|junction of the 1st/.test(loc) || point.id === "lv3") return at(34, 58, box);
  if (/nail/.test(loc)) {
    if (/2nd/.test(loc)) return at(32, 90, box);
    if (/3rd/.test(loc)) return at(44, 90, box);
    if (/4th/.test(loc)) return at(54, 86, box);
    if (/5th|little/.test(loc)) return at(64, 80, box);
    return at(16, 86, box);
  }
  if (/web/.test(loc)) return at(30, 76, box);
  if (/extensor|ankle crease|dorsum of the foot.*ankle|level with the lateral malleolus/.test(loc)) return at(48, 16, box);
  if (/5th metatarsal|4th metatarsal/.test(loc)) return at(58, 52, box);
  if (/metatarsal/.test(loc)) return at(36, 52, box);
  return at(40, 48, box);
}

function sole(point: Point, loc: string): { x: number; y: number } {
  if (/anterior|depression|ki1/.test(loc) || point.id === "ki1") return at(46, 32);
  if (/heel/.test(loc)) return at(50, 78);
  return at(48, 40);
}

function face(point: Point, loc: string): { x: number; y: number } {
  if (/glabella|between the eyebrows|yintang/.test(loc) || point.id === "yintang") return at(50, 42);
  if (/inner canthus/.test(loc)) return at(58, 48);
  if (/outer canthus/.test(loc)) return at(72, 48);
  if (/eyebrow/.test(loc)) return at(64, 36);
  if (/ala nasi|nostril|nasolabial/.test(loc)) return at(58, 59);
  if (/infraorbital|pupil/.test(loc)) return at(64, /ala|nostril/.test(loc) ? 58 : 54);
  if (/philtrum/.test(loc)) return at(50, 64);
  if (/mentolabial|chin/.test(loc)) return at(50, 74);
  if (/corner of the mouth/.test(loc)) return at(62, 68);
  if (/hairline/.test(loc)) return at(/midline/.test(loc) ? 50 : 32, 22);
  if (/mandible|masseter/.test(loc)) return at(74, 70);
  if (/forehead/.test(loc)) return at(50, 30);
  return at(50 + ((point.order % 3) - 1) * 8, 36 + (point.order % 4) * 6);
}

function side(point: Point, loc: string): { x: number; y: number; extra?: string } {
  if (/vertex|crown|5 cun posterior to the anterior hairline/.test(loc) || point.id === "du20" || point.id === "sishencong") {
    return { ...at(46, 12), extra: " On the crown. This side view shows the top of the head; the point is on the midline." };
  }
  if (/temple|outer canthus and the eyebrow|taiyang/.test(loc) || point.id === "taiyang") return { ...at(22, 42) };
  if (/tragus|condyle|supratragic|intertragic/.test(loc)) return { ...at(48, 54) };
  if (/behind the ear|earlobe/.test(loc)) return { ...at(58, 68) };
  if (/\bmastoid\b/.test(loc)) return { ...at(68, 60) };
  if (/occiput|skull/.test(loc) || point.id === "gb20") {
    return { ...at(64, 74), extra: " In the hollow under the occiput. Hair may cover the exact spot." };
  }
  if (/apex of the ear/.test(loc)) return { ...at(58, 46) };
  return { ...at(50, 56) };
}

function neck(point: Point, loc: string): { x: number; y: number; extra?: string } {
  if (/occiput|c7|base of the neck/.test(loc)) return { ...at(62, 78), extra: " At the base of the skull, beside the midline." };
  if (/posterior border/.test(loc)) return { ...at(68, 48) };
  if (/laryngeal|anterior border of the sternocleidomastoid|two heads of the sternocleidomastoid/.test(loc)) return { ...at(56, 54) };
  if (/suprasternal/.test(loc)) return { ...at(58, 86) };
  if (/mandible|jaw/.test(loc)) return { ...at(30, 34) };
  return { ...at(point.channelId === "du" ? 62 : 54, 50) };
}

function abdomen(point: Point, loc: string): { x: number; y: number; guide?: AtlasGuide; extra?: string } {
  const navel = { x: 51, y: 55 };
  const cunV = 4.5;
  const cunH = 6.2;
  let y = navel.y;
  let guide: AtlasGuide | undefined;
  const up = num(loc, /(\d+(?:\.\d+)?) cun superior to the umbilicus/);
  const down = num(loc, /(\d+(?:\.\d+)?) cun inferior to the umbilicus/);
  if (/centre of the umbilicus|center of the umbilicus/.test(loc) || point.id === "ren8") y = navel.y;
  if (up != null) y = navel.y - up * cunV;
  if (down != null) y = navel.y + down * cunV;
  if (/lateral to ren2/.test(loc)) y = navel.y + 5 * cunV;
  if (/lateral to ren3/.test(loc)) y = navel.y + 4 * cunV;
  if (/lateral to ren4/.test(loc)) y = navel.y + 3 * cunV;
  const lat = num(loc, /(\d+(?:\.\d+)?) cun lateral/) ?? (/lateral to ren[234]/.test(loc) ? 3 : null);
  const midline = /midline/.test(loc) && lat == null;
  const x = midline ? navel.x : navel.x + (lat ?? 2) * cunH;
  let extra: string | undefined;
  if (y > 73 || /pubic|inguinal|groin|symphysis/.test(loc)) {
    y = Math.min(y, 73);
    extra = " Near the waistband. The clothing covers the pubic bone and groin, so the dot stays on the lower abdomen above the shorts.";
  }
  const spot = at(x, y, { x: [28, 78], y: [16, 74] });
  if ((up != null || down != null) && midline) {
    guide = { x1: navel.x, y1: navel.y, x2: spot.x, y2: spot.y, text: `${up ?? down} cun` };
  }
  return { ...spot, guide, extra };
}

function chest(point: Point, loc: string): { x: number; y: number; extra?: string } {
  const space = num(loc, /(\d+)(?:st|nd|rd|th) intercostal/);
  const lat = num(loc, /(\d+(?:\.\d+)?) cun lateral/);
  let y = 68;
  let extra: string | undefined;
  if (/suprasternal/.test(loc) || point.id === "ren22") y = 42;
  else if (/clavicle/.test(loc) && space == null) y = 52;
  else if (space != null) {
    y = 54 + space * 8;
    if (space >= 4 || /mid-axillary|12th rib|free end/.test(loc)) {
      y = Math.min(y, 86);
      extra = " Count the rib spaces down from the collarbone. This photo stops at the upper chest, above the breasts.";
    }
  }
  const midline = /midline|sternum/.test(loc) && lat == null;
  const x = midline ? 50 : 50 + (lat ?? 4) * 5.2;
  return { ...at(x, y, { x: [18, 84], y: [36, 88] }), extra };
}

const UPPER_BONE: Record<string, number> = {
  c7: 16,
  t1: 22,
  t2: 28,
  t3: 34,
  t4: 40,
  t5: 46,
  t6: 52,
  t7: 58,
  t8: 64,
};

const LOWER_BONE: Record<string, number> = {
  t9: 14,
  t10: 20,
  t11: 26,
  t12: 34,
  l1: 42,
  l2: 48,
  l3: 56,
  l4: 64,
  l5: 70,
};

function backSpot(point: Point, loc: string): Spot {
  const bone = loc.match(/\b(c7|t\d+|l\d+)\b/)?.[1];
  const sacral = /sacral|coccyx/.test(loc);
  const lowBone = bone != null && (bone.startsWith("l") || ["t9", "t10", "t11", "t12"].includes(bone));
  if (lowBone || sacral) return { plate: "low-back", ...lowBack(point, loc, bone, sacral) };
  return { plate: "back", ...upperBack(point, loc) };
}

function lateralX(loc: string, point: Point, midlineX: number) {
  const lat = num(loc, /(\d+(?:\.\d+)?) cun lateral/);
  if (/half a thumb/.test(loc)) return midlineX + 8;
  if (point.channelId === "du" || (/midline/.test(loc) && lat == null)) return midlineX;
  if (lat != null) return midlineX + Math.min(lat * 7, 24);
  if (/scapul/.test(loc)) return midlineX + 20;
  return midlineX + 10;
}

function upperBack(point: Point, loc: string): { x: number; y: number; extra?: string } {
  if (/posterior hairline|occipital prominence|spinous process of c1/.test(loc)) {
    const lat = num(loc, /(\d+(?:\.\d+)?) cun lateral/);
    return {
      ...at(50 + (lat ?? 0) * 6, 13, { x: [40, 72], y: [10, 24] }),
      extra: " At the base of the skull. The photo shows the nape; count from the midline.",
    };
  }
  const bone = loc.match(/\b(c7|t\d+|l\d+)\b/)?.[1];
  let y = bone ? (UPPER_BONE[bone] ?? 40) : 36;
  let extra: string | undefined;
  if (bone && !(bone in UPPER_BONE)) {
    y = 64;
    extra = " Lower on the back than this crop. Count down from the big knob at the base of the neck.";
  }
  if (/scapul|infraspin|suprascapular/.test(loc)) {
    y = /inferior angle/.test(loc) ? 58 : /spine|suprascapular/.test(loc) ? 32 : 44;
  }
  const x = lateralX(loc, point, 50);
  return { ...at(x, y, { x: [36, 78], y: [12, 66] }), extra };
}

function lowBack(point: Point, loc: string, bone: string | undefined, sacral: boolean): { x: number; y: number; extra?: string } {
  let y = bone ? (LOWER_BONE[bone] ?? 48) : 48;
  let extra: string | undefined;
  if (sacral || /coccyx/.test(loc)) {
    y = 70;
    extra = " On the sacrum, at the top of the shorts. The clothing covers the cleft. Count the sacral holes down from the waist.";
  }
  const x = lateralX(loc, point, 48);
  if (/12th rib|free end of the 12th/.test(loc)) return { ...at(76, 28, { x: [32, 82], y: [12, 72] }) };
  return { ...at(x, y, { x: [32, 80], y: [12, 72] }), extra };
}

function hip(point: Point, loc: string): { x: number; y: number; extra?: string } {
  const above = num(loc, /(\d+(?:\.\d+)?) cun superior to the popliteal/);
  if (above != null) return { ...at(42, 88 - above * 5, { x: [28, 62], y: [36, 88] }) };
  if (/greater trochanter|glute|sacral hiatus/.test(loc) || point.id === "gb30") {
    return {
      ...at(36, 46, { x: [28, 58], y: [36, 70] }),
      extra: " In the hip muscle. The shorts cover the buttock; find the bony hip at the side, then move back toward the tailbone.",
    };
  }
  if (/iliac/.test(loc)) {
    return {
      ...at(40, 42),
      extra: " At the front of the hip bone, just above the waistband.",
    };
  }
  return { ...at(40, 60, { x: [28, 62], y: [40, 86] }) };
}

function labelsFor(plate: string, x: number, y: number, extra?: AtlasLabel[]) {
  const pool = [...(extra ?? []), ...(PLATE_LABELS[plate] ?? [])];
  const kept: AtlasLabel[] = [];
  for (const label of pool) {
    const nearDot = Math.hypot(label.x - x, label.y - y) < 12;
    const nearOther = kept.some((item) => Math.hypot(item.x - label.x, item.y - label.y) < 14);
    if (!nearDot && !nearOther) kept.push(label);
    if (kept.length >= 3) break;
  }
  return kept;
}

export function photoMark(point: Point): PhotoMark {
  const hidden = HIDDEN[point.id];
  if (hidden || /centre of the nipple|center of the nipple/.test(point.location) || /perineum/.test(point.location)) {
    return {
      plate: "",
      x: 50,
      y: 50,
      labels: [],
      note: hidden ?? "No photo is shown for this intimate landmark.",
      hidden: hidden ?? "No photo is shown for this intimate landmark.",
    };
  }
  if (/coccyx and the anus/.test(point.location)) {
    return { plate: "", x: 50, y: 50, labels: [], note: HIDDEN.du1, hidden: HIDDEN.du1 };
  }
  const spot = place(point, point.location.toLowerCase());
  const note = NOTE + (spot.extra ?? "");
  return {
    plate: spot.plate,
    x: spot.x,
    y: spot.y,
    labels: labelsFor(spot.plate, spot.x, spot.y, spot.labels),
    guide: spot.guide,
    note,
  };
}

const PATH_NOTE =
  "Pathway in classical order, drawn on a clothed figure. The line continues under clothing. It is a map, not a measuring tool. Tap a dot, then use the finding steps.";

/** Percent routes on the clothed standing photos. Person's left is the right side of the picture. */
export function pathwayFor(channelId: string): Pathway | null {
  const front: Record<string, Array<[number, number]>> = {
    lu: [
      [64, 30],
      [68, 26],
      [70, 38],
      [69, 48],
      [70, 52],
    ],
    li: [
      [71, 53],
      [70, 48],
      [70, 36],
      [68, 26],
      [62, 19],
      [57, 12],
    ],
    st: [
      [56, 11],
      [58, 16],
      [60, 23],
      [62, 33],
      [61, 44],
      [60, 58],
      [60, 70],
      [61, 87],
      [63, 93],
    ],
    sp: [
      [60, 94],
      [59, 87],
      [58, 72],
      [57, 55],
      [58, 42],
      [60, 32],
    ],
    ht: [
      [66, 34],
      [68, 42],
      [70, 52],
    ],
    ki: [
      [61, 94],
      [59, 87],
      [57, 74],
      [56, 52],
      [58, 38],
      [61, 30],
    ],
    pc: [
      [60, 33],
      [67, 41],
      [69, 50],
      [70, 53],
    ],
    lv: [
      [59, 94],
      [58, 86],
      [57, 72],
      [55, 50],
      [58, 34],
    ],
    ren: [
      [50, 58],
      [50, 44],
      [50, 34],
      [50, 22],
      [50, 15],
    ],
    gb: [
      [62, 11],
      [70, 18],
      [73, 26],
      [71, 38],
      [67, 52],
      [64, 70],
      [63, 87],
      [64, 93],
    ],
  };
  const back: Record<string, Array<[number, number]>> = {
    bl: [
      [56, 8],
      [58, 17],
      [60, 30],
      [59, 46],
      [58, 60],
      [60, 74],
      [61, 88],
    ],
    du: [
      [50, 52],
      [50, 36],
      [50, 18],
      [50, 8],
    ],
    si: [
      [74, 55],
      [72, 44],
      [68, 30],
      [62, 20],
      [58, 15],
    ],
    sj: [
      [73, 55],
      [71, 42],
      [67, 28],
      [60, 16],
    ],
  };
  if (front[channelId]) return { plate: "body-front", route: front[channelId], note: PATH_NOTE };
  if (back[channelId]) return { plate: "body-back", route: back[channelId], note: PATH_NOTE + " Foot points on this view stop at the shoe." };
  return null;
}
