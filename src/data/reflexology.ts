export type ReflexView = "foot" | "hand";
export type ReflexSide = "left" | "right";
export type ZoneSide = "left" | "right" | "both";

export type ReflexSystem =
  | "head"
  | "nervous"
  | "respiratory"
  | "cardio"
  | "endocrine"
  | "digestive"
  | "urinary"
  | "musculo"
  | "reproductive";

export type ZoneShape =
  | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { type: "roundrect"; x: number; y: number; width: number; height: number; rx: number }
  | { type: "path"; d: string; at: { x: number; y: number } }
  | { type: "group"; shapes: ZoneShape[] };

export type ReflexZone = {
  id: string;
  name: string;
  side: ZoneSide;
  view: ReflexView;
  shape: ZoneShape;
  organs: string[];
  system: ReflexSystem;
  traditional: string;
  note: string;
  keywords: string[];
};

export const REFLEX_DISCLAIMER =
  "For learning only. Not medical advice, diagnosis, or treatment. Consult a licensed practitioner.";

export const REFLEX_SHORT = "Educational only — not medical advice.";

export const TRADITION_NOTE =
  "Different traditions place some points differently. These maps follow the common Western educational layout associated with Eunice Ingham, not a Chinese reflexology chart.";

export const SYSTEMS: { id: ReflexSystem; label: string }[] = [
  { id: "head", label: "Head and senses" },
  { id: "nervous", label: "Nervous system" },
  { id: "respiratory", label: "Chest and lungs" },
  { id: "cardio", label: "Heart" },
  { id: "endocrine", label: "Endocrine" },
  { id: "digestive", label: "Digestion" },
  { id: "urinary", label: "Urinary" },
  { id: "musculo", label: "Spine and limbs" },
  { id: "reproductive", label: "Reproductive" },
];

const SYSTEM_LABEL: Record<ReflexSystem, string> = Object.fromEntries(SYSTEMS.map((item) => [item.id, item.label])) as Record<
  ReflexSystem,
  string
>;

export function systemLabel(id: ReflexSystem) {
  return SYSTEM_LABEL[id];
}

type Shape = ZoneShape;

const e = (cx: number, cy: number, rx: number, ry: number): Shape => ({ type: "ellipse", cx, cy, rx, ry });
const box = (x: number, y: number, width: number, height: number, rx: number): Shape => ({
  type: "roundrect",
  x,
  y,
  width,
  height,
  rx,
});

type Spec = {
  key: string;
  name: string;
  side: ZoneSide;
  organs: string[];
  system: ReflexSystem;
  traditional: string;
  note: string;
  keywords?: string[];
  foot?: Shape;
  hand?: Shape;
};

const SPECS: Spec[] = [
  {
    key: "lungs",
    name: "Lungs and chest",
    side: "both",
    organs: ["Lungs", "Chest"],
    system: "respiratory",
    traditional: "Western charts draw the chest and lungs across the ball of the foot and the upper palm.",
    note: "A broad area, not a single spot. The left chart also carries the heart zone over part of this region.",
    keywords: ["chest", "breath", "lung"],
    foot: e(140, 196, 42, 24),
    hand: e(148, 196, 36, 22),
  },
  {
    key: "liver",
    name: "Liver",
    side: "right",
    organs: ["Liver"],
    system: "digestive",
    traditional: "Ingham-style charts place the liver on the right foot and the right palm, filling much of the upper arch.",
    note: "Shown only on the right side in this layout. It is a study region, not a sign about the organ.",
    keywords: ["hepatic", "right"],
    foot: e(158, 246, 32, 22),
    hand: e(164, 240, 30, 20),
  },
  {
    key: "stomach",
    name: "Stomach",
    side: "both",
    organs: ["Stomach"],
    system: "digestive",
    traditional: "Charts draw the stomach on both feet, larger on the left, in the upper arch under the ball. The palm uses the same idea at center.",
    note: "On the left side this region sits near the spleen and pancreas zones.",
    keywords: ["belly", "digestion"],
    foot: e(118, 252, 22, 14),
    hand: e(132, 246, 20, 12),
  },
  {
    key: "small-intestine",
    name: "Small intestine",
    side: "both",
    organs: ["Small intestine"],
    system: "digestive",
    traditional: "The small intestine is drawn in the central arch of both feet and in the lower center of both palms.",
    note: "It sits inside the large-intestine area on these maps.",
    keywords: ["bowel", "gut", "intestine"],
    foot: e(142, 300, 28, 16),
    hand: e(148, 286, 24, 14),
  },
  {
    key: "colon",
    name: "Large intestine",
    side: "both",
    organs: ["Large intestine", "Colon"],
    system: "digestive",
    traditional: "Western charts frame the colon around the small intestine. Ascending colon is emphasized on the right; descending colon on the left.",
    note: "One zone stands for that whole teaching, so the right and left drawings are not identical organs.",
    keywords: ["colon", "bowel", "ascending", "descending", "transverse"],
    foot: {
      type: "path",
      at: { x: 142, y: 300 },
      d: "M108 278 C108 266 176 266 178 284 C180 318 162 328 142 328 C114 328 104 310 108 278 Z M122 288 C122 282 162 282 164 292 C166 308 154 314 142 314 C124 314 116 302 122 288 Z",
    },
    hand: {
      type: "path",
      at: { x: 148, y: 286 },
      d: "M118 268 C118 258 178 258 180 274 C182 304 166 314 148 314 C124 314 114 296 118 268 Z M130 278 C130 272 164 272 166 282 C168 296 158 302 148 302 C132 302 124 290 130 278 Z",
    },
  },
  {
    key: "lower-back",
    name: "Lower back",
    side: "both",
    organs: ["Lower back", "Lumbar area"],
    system: "musculo",
    traditional: "The heel of the foot is taught as the lower back and pelvic floor of the map. On the hand, the same idea sits just above the wrist.",
    note: "A region name from the charts. It does not describe a back injury.",
    keywords: ["lumbar", "waist", "back"],
    foot: e(140, 336, 36, 12),
    hand: e(148, 318, 32, 11),
  },
  {
    key: "pelvis",
    name: "Pelvis",
    side: "both",
    organs: ["Pelvis"],
    system: "musculo",
    traditional: "Charts place the pelvis in the heel and, on the hand, along the wrist crease.",
    note: "Reproductive zones overlap the inner part of this area on many Western plates.",
    keywords: ["hip bowl", "wrist"],
    foot: e(136, 364, 40, 14),
    hand: e(144, 340, 36, 12),
  },
  {
    key: "spine",
    name: "Spine",
    side: "both",
    organs: ["Spine", "Thoracic spine", "Lumbar spine"],
    system: "musculo",
    traditional: "The inner edge is the spine: cervical toward the big toe or thumb, lumbar toward the heel or wrist.",
    note: "Follow the inner border — the big-toe side of the foot, the thumb side of the hand.",
    keywords: ["backbone", "vertebra", "medial", "thoracic", "lumbar"],
    foot: box(56, 206, 16, 140, 8),
    hand: box(84, 210, 14, 110, 7),
  },
  {
    key: "outer-limb",
    name: "Outer shoulder, arm, and leg",
    side: "both",
    organs: ["Shoulder", "Arm", "Hip", "Knee", "Leg"],
    system: "musculo",
    traditional: "The outer edge runs from shoulder at the ball or upper palm down toward the hip, knee, and leg. On the hand this edge is the little-finger side and is read mainly as shoulder and arm.",
    note: "One strip stands for that sequence so the zones stay large enough to tap.",
    keywords: ["lateral", "elbow", "hip", "knee", "shoulder", "arm"],
    foot: box(188, 204, 16, 140, 8),
    hand: box(192, 196, 14, 110, 7),
  },
  {
    key: "head",
    name: "Head and brain",
    side: "both",
    organs: ["Head", "Brain"],
    system: "head",
    traditional: "The big toe and the thumb are the head and brain on Western foot and hand charts.",
    note: "The center of this pad is the pituitary zone, drawn on top of it.",
    keywords: ["skull", "toe", "thumb", "brain"],
    foot: e(74, 132, 24, 30),
    hand: e(58, 206, 20, 28),
  },
  {
    key: "sinuses",
    name: "Sinuses",
    side: "both",
    organs: ["Sinuses"],
    system: "head",
    traditional: "The tips of the smaller toes, and the fingertips, are taught as the sinus area.",
    note: "The big toe and thumb are kept for the head and brain, not this zone.",
    keywords: ["sinus", "nose", "fingertip", "toe tip"],
    foot: {
      type: "group",
      shapes: [e(118, 110, 11, 12), e(150, 108, 10, 12), e(178, 118, 10, 11), e(202, 136, 9, 10)],
    },
    hand: {
      type: "group",
      shapes: [e(116, 82, 10, 12), e(144, 68, 10, 14), e(170, 84, 9, 12), e(194, 108, 8, 10)],
    },
  },
  {
    key: "solar-plexus",
    name: "Solar plexus",
    side: "both",
    organs: ["Solar plexus"],
    system: "nervous",
    traditional: "A band across the foot where the ball meets the arch, and across the center of the palm.",
    note: "Charts treat it as a nerve center in the map. This app does not describe pressing it.",
    keywords: ["celiac", "diaphragm", "center"],
    foot: e(132, 228, 34, 12),
    hand: e(146, 226, 30, 11),
  },
  {
    key: "pancreas",
    name: "Pancreas",
    side: "left",
    organs: ["Pancreas"],
    system: "endocrine",
    traditional: "Western charts place the pancreas on the left foot and left palm, beside the stomach zone.",
    note: "Left side only in this edition.",
    keywords: ["left"],
    foot: e(142, 266, 22, 10),
    hand: e(150, 258, 20, 9),
  },
  {
    key: "shoulders",
    name: "Shoulders",
    side: "both",
    organs: ["Shoulders"],
    system: "musculo",
    traditional: "The outer ball of the foot and the outer upper palm are the shoulder area, where the outer-edge strip begins.",
    note: "The long outer strip continues this zone toward the hip and leg on the foot.",
    keywords: ["shoulder"],
    foot: e(190, 186, 16, 14),
    hand: e(196, 176, 14, 14),
  },
  {
    key: "kidneys",
    name: "Kidneys",
    side: "both",
    organs: ["Kidneys"],
    system: "urinary",
    traditional: "Both feet and both palms carry a kidney zone in the arch, just above the bladder line.",
    note: "Ureters are the narrow link drawn from here toward the bladder.",
    keywords: ["kidney", "renal"],
    foot: e(102, 278, 16, 13),
    hand: e(116, 268, 14, 12),
  },
  {
    key: "bladder",
    name: "Bladder",
    side: "both",
    organs: ["Bladder"],
    system: "urinary",
    traditional: "The bladder sits on the inner lower arch of the foot and the inner lower palm.",
    note: "Paired with the kidney zone and the short ureter strip.",
    keywords: ["urinary"],
    foot: e(86, 328, 16, 13),
    hand: e(108, 308, 14, 11),
  },
  {
    key: "reproductive",
    name: "Reproductive organs",
    side: "both",
    organs: ["Reproductive organs", "Uterus", "Prostate"],
    system: "reproductive",
    traditional: "Heel and inner ankle areas on the foot, and the inner wrist crease on the hand, are taught as reproductive reflexes. Charts often split uterus or prostate toward the inner heel and ovary or testis toward the outer heel.",
    note: "Drawn here as one educational region on the inner heel or wrist. Not a fertility or pregnancy guide.",
    keywords: ["uterus", "prostate", "ovary", "testis", "womb", "pelvic"],
    foot: e(74, 358, 14, 12),
    hand: e(104, 336, 14, 11),
  },
  {
    key: "thyroid",
    name: "Thyroid",
    side: "both",
    organs: ["Thyroid"],
    system: "endocrine",
    traditional: "The base of the big toe, where it meets the ball, and the base of the thumb, are the usual thyroid place on these charts.",
    note: "A small region between the neck zone and the chest.",
    keywords: ["neck", "gland"],
    foot: e(88, 184, 18, 12),
    hand: e(90, 200, 16, 11),
  },
  {
    key: "neck",
    name: "Neck",
    side: "both",
    organs: ["Neck"],
    system: "musculo",
    traditional: "The neck is the crease at the base of the big toe and the base of the thumb.",
    note: "Cervical spine continues from here down the inner edge.",
    keywords: ["throat", "cervical"],
    foot: e(86, 162, 16, 10),
    hand: e(82, 186, 14, 10),
  },
  {
    key: "eyes",
    name: "Eyes",
    side: "both",
    organs: ["Eyes"],
    system: "head",
    traditional: "At the base of the second and third toes, and at the base of the index and middle fingers.",
    note: "Sense-organ zones share this ridge with the ears. The map is not an eye chart.",
    keywords: ["eye", "vision"],
    foot: e(134, 158, 22, 11),
    hand: e(132, 152, 20, 10),
  },
  {
    key: "ears",
    name: "Ears",
    side: "both",
    organs: ["Ears"],
    system: "head",
    traditional: "At the base of the fourth and fifth toes, and at the base of the ring and little fingers.",
    note: "Placed on the outer part of the toe or finger ridge.",
    keywords: ["ear", "hearing"],
    foot: e(186, 164, 18, 10),
    hand: e(180, 158, 16, 10),
  },
  {
    key: "adrenals",
    name: "Adrenals",
    side: "both",
    organs: ["Adrenal glands"],
    system: "endocrine",
    traditional: "A small zone just above the kidney on the upper arch and on the central palm.",
    note: "Easy to confuse with the kidney zone. It sits slightly higher and closer to the solar plexus.",
    keywords: ["adrenal", "gland"],
    foot: e(104, 242, 12, 10),
    hand: e(118, 236, 11, 9),
  },
  {
    key: "heart",
    name: "Heart",
    side: "left",
    organs: ["Heart"],
    system: "cardio",
    traditional: "Western foot charts draw the heart mainly on the left foot, in the ball under the toes. The left palm carries the matching zone.",
    note: "Left side only. The right chart leaves this part of the ball as lung and chest.",
    keywords: ["cardiac", "left", "chest"],
    foot: e(112, 186, 20, 16),
    hand: e(124, 186, 18, 14),
  },
  {
    key: "spleen",
    name: "Spleen",
    side: "left",
    organs: ["Spleen"],
    system: "digestive",
    traditional: "The spleen is a left-sided zone in the upper arch of the foot and the matching part of the left palm.",
    note: "Left only, near the stomach. Not drawn on the right chart.",
    keywords: ["left"],
    foot: e(176, 240, 14, 12),
    hand: e(180, 234, 14, 11),
  },
  {
    key: "gallbladder",
    name: "Gallbladder",
    side: "right",
    organs: ["Gallbladder"],
    system: "digestive",
    traditional: "A small zone tucked into the liver area on the right foot and right palm.",
    note: "Right side only. Charts nest it against the liver rather than giving it a separate region of the sole.",
    keywords: ["gall bladder", "bile", "right"],
    foot: e(186, 228, 11, 9),
    hand: e(186, 220, 10, 8),
  },
  {
    key: "sciatic",
    name: "Sciatic nerve",
    side: "both",
    organs: ["Sciatic nerve"],
    system: "nervous",
    traditional: "Foot charts draw a band across the heel for the sciatic nerve. This hand map does not add a separate sciatic zone.",
    note: "Foot only. The band sits along the bottom of the heel, under the pelvis zone.",
    keywords: ["sciatica", "nerve", "heel"],
    foot: box(100, 386, 80, 14, 7),
  },
  {
    key: "ureters",
    name: "Ureters",
    side: "both",
    organs: ["Ureters"],
    system: "urinary",
    traditional: "Narrow strips linking the kidney zone to the bladder zone on both feet and both hands.",
    note: "Thin on purpose. If the strip is hard to tap, choose it from the zone list.",
    keywords: ["ureter", "kidney", "bladder"],
    foot: box(108, 288, 12, 30, 6),
    hand: box(124, 276, 10, 24, 5),
  },
  {
    key: "cervical",
    name: "Cervical spine",
    side: "both",
    organs: ["Cervical spine", "Neck"],
    system: "musculo",
    traditional: "The top of the inner edge, at the base of the big toe or thumb, is the cervical spine. The rest of that edge continues as the longer spine zone.",
    note: "The uppermost part of the medial line, not the whole back.",
    keywords: ["neck", "spine", "cervical"],
    foot: box(48, 168, 16, 36, 8),
    hand: box(78, 168, 14, 26, 7),
  },
  {
    key: "pituitary",
    name: "Pituitary",
    side: "both",
    organs: ["Pituitary"],
    system: "endocrine",
    traditional: "Western charts mark the pituitary in the center of the big-toe pad and the center of the thumb pad.",
    note: "A small zone sitting on the head-and-brain area. Other traditions do not all use this spot.",
    keywords: ["gland", "big toe", "thumb", "master"],
    foot: e(74, 116, 10, 10),
    hand: e(54, 192, 9, 9),
  },
];

function expand(spec: Spec, view: ReflexView, shape: Shape): ReflexZone {
  return {
    id: `${view}-${spec.key}`,
    name: spec.name,
    side: spec.side,
    view,
    shape,
    organs: spec.organs,
    system: spec.system,
    traditional: spec.traditional,
    note: spec.note,
    keywords: spec.keywords ?? [],
  };
}

export const REFLEX_ZONES: ReflexZone[] = SPECS.flatMap((spec) => {
  const zones: ReflexZone[] = [];
  if (spec.foot) zones.push(expand(spec, "foot", spec.foot));
  if (spec.hand) zones.push(expand(spec, "hand", spec.hand));
  return zones;
});

export function getZone(id: string) {
  return REFLEX_ZONES.find((zone) => zone.id === id);
}

export function zonesFor(view: ReflexView, side: ReflexSide) {
  return REFLEX_ZONES.filter((zone) => zone.view === view && (zone.side === "both" || zone.side === side));
}

export function zoneHaystack(zone: ReflexZone) {
  return [zone.name, zone.traditional, zone.note, systemLabel(zone.system), zone.system, ...zone.organs, ...zone.keywords]
    .join(" ")
    .toLowerCase();
}

export function zoneMatches(zone: ReflexZone, query: string, system: ReflexSystem | null) {
  if (system && zone.system !== system) return false;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return zoneHaystack(zone).includes(needle);
}

export function shapeCenter(shape: ZoneShape): { x: number; y: number } {
  if (shape.type === "ellipse") return { x: shape.cx, y: shape.cy };
  if (shape.type === "roundrect") return { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 };
  if (shape.type === "path") return shape.at;
  return shapeCenter(shape.shapes[0]);
}

export function siblingId(id: string, view: ReflexView) {
  return `${view}-${id.replace(/^(foot|hand)-/, "")}`;
}
