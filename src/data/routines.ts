import type { Routine, RoutineTag } from "./types";

export const ROUTINE_DISCLAIMER =
  "Educational only. Not medical advice. For learning and gentle self-care. Consult a licensed practitioner for any health concern.";

export const ROUTINE_TAGS: { id: RoutineTag; label: string }[] = [
  { id: "stress", label: "Stress" },
  { id: "sleep", label: "Sleep" },
  { id: "digestion", label: "Digestion" },
  { id: "head", label: "Head" },
  { id: "energy", label: "Energy" },
  { id: "neck", label: "Neck" },
  { id: "back", label: "Back" },
  { id: "morning", label: "Morning" },
  { id: "evening", label: "Evening" },
];

/** Short acupressure sequences for study. Pressure only. Not a treatment plan. */
export const ROUTINES: Routine[] = [
  {
    id: "calm-settle",
    title: "Calm & Settle",
    focus: "A quiet pause when the mind feels busy",
    aim: "A short sequence taught for settling the spirit. It is a learning routine, not a treatment for anxiety.",
    tags: ["stress"],
    steps: [
      { pointId: "yintang", seconds: 45, how: "Rest one finger between the brows. Gentle steady pressure, about 30–60 seconds.", tradition: "An extra point taught for quieting a restless mind." },
      { pointId: "pc6", seconds: 40, how: "Three finger-widths up from the inner wrist crease, between the tendons. Steady, not hard.", tradition: "Classically linked with the chest and a feeling of inner pressure." },
      { pointId: "ht7", seconds: 40, how: "Hollow on the wrist crease, little-finger side. Stay off any tingling.", tradition: "The Heart channel’s source point, studied for the spirit." },
      { pointId: "pc7", seconds: 30, how: "Middle of the inner wrist crease, between the tendons. Mild.", tradition: "Source point of the Pericardium, taught beside HT7 for the spirit." },
      { pointId: "ren17", seconds: 35, how: "Soft palm on the center of the chest. Stop if it is tender or you are short of breath.", tradition: "The midline chest point, studied with a tight, uneasy feeling." },
      { pointId: "li4", seconds: 30, how: "Press the muscle between thumb and index finger. Skip this step in pregnancy.", tradition: "A command point taught for the face and for moving qi. Not for self-care in pregnancy." },
      { pointId: "lv3", seconds: 40, how: "Thumb in the hollow on the top of the foot, between the first and second bones.", tradition: "Liver source point, often paired with LI4 as the four gates." },
      { pointId: "ki1", seconds: 30, how: "Thumb in the hollow of the sole, in the front third. Stop if it feels too intense.", tradition: "The first Kidney point, taught for grounding a busy mind." },
    ],
  },
  {
    id: "sleep-wind-down",
    title: "Sleep Wind-Down",
    focus: "Calm & sleep, at the end of the day",
    aim: "A wind-down used in class for ordinary restlessness at night. It will not override pain, caffeine, or a sleep disorder.",
    tags: ["sleep", "evening"],
    steps: [
      { pointId: "yintang", seconds: 45, how: "Finger between the brows while the exhale lengthens.", tradition: "Often the first quiet point in an evening routine." },
      { pointId: "anmian", seconds: 40, how: "Behind the ear, halfway toward the hollow under the skull. Mild, both sides if comfortable.", tradition: "An extra point whose name means peaceful sleep. A teaching name, not a promise." },
      { pointId: "ht7", seconds: 45, how: "Gentle steady pressure in the wrist hollow, little-finger side.", tradition: "Studied as a point that calms the spirit before rest." },
      { pointId: "pc6", seconds: 35, how: "Inner forearm, three finger-widths above the wrist, between the tendons.", tradition: "A quieter press, often paired with HT7 at night." },
      { pointId: "pc7", seconds: 30, how: "Middle of the inner wrist crease. Stay off any tingling.", tradition: "Pericardium source point, studied with the spirit." },
      { pointId: "sp6", seconds: 40, how: "Inner leg, a hand’s breadth above the ankle bone. Skip this step in pregnancy.", tradition: "Where three yin channels of the leg are said to meet." },
      { pointId: "ki1", seconds: 30, how: "Thumb in the hollow of the sole. Stop if it feels too intense.", tradition: "The sole point, often the last hold in a wind-down." },
    ],
  },
  {
    id: "head-sinus",
    title: "Head & Sinus Ease",
    focus: "Forehead, temples, and a stuffy face",
    aim: "Points students learn for the head and the openings of the face. Not for a sudden severe headache, high fever, or trouble breathing.",
    tags: ["head"],
    steps: [
      { pointId: "li4", seconds: 40, how: "The hand point, firm but not sharp. Skip in pregnancy.", tradition: "Taught as a command point for the face and mouth." },
      { pointId: "li20", seconds: 30, how: "Beside the nostril, in the groove. Shallow. Do not press into the nose.", tradition: "Where the Large Intestine channel is said to meet the nose." },
      { pointId: "bitong", seconds: 25, how: "Highest point of the crease beside the nose. Very light, both sides.", tradition: "An extra point whose teaching name means nose passage." },
      { pointId: "yintang", seconds: 30, how: "Between the brows. Light pressure.", tradition: "An extra point on the midline of the forehead." },
      { pointId: "bl2", seconds: 25, how: "Inner end of the eyebrow, upward only. Never down into the eye.", tradition: "Bladder channel at the inner brow." },
      { pointId: "gb14", seconds: 25, how: "On the forehead, a thumb-width above the middle of the eyebrow. Light.", tradition: "Gallbladder point on the forehead." },
      { pointId: "taiyang", seconds: 35, how: "Slow circles at the temple. Lighten up if you feel a strong pulse.", tradition: "An extra point at the temple, often taught with the brow." },
      { pointId: "gb20", seconds: 40, how: "Thumbs in the hollows under the skull, into the muscle, slightly toward the eyes.", tradition: "A wind point at the nape, studied for the head." },
    ],
  },
  {
    id: "neck-shoulder",
    title: "Neck & Shoulder Soften",
    focus: "Tightness from sitting, not an injury",
    aim: "A muscle-softening sequence for the nape and shoulder. Not for a neck injury, numbness, or pain running down the arm.",
    tags: ["neck"],
    steps: [
      { pointId: "gb21", seconds: 40, how: "Pinch the top of the shoulder muscle. Do not press down into the chest. Skip in pregnancy. Sit, in case you feel lightheaded.", tradition: "A shoulder point traditionally avoided in pregnancy." },
      { pointId: "gb20", seconds: 40, how: "Skull-base hollows. Mild, into the muscle.", tradition: "Studied for the nape and for wind in the head." },
      { pointId: "bl10", seconds: 30, how: "Just beside the midline under the skull, on the muscle. Broad and mild.", tradition: "Bladder point at the top of the neck, beside the midline." },
      { pointId: "si11", seconds: 40, how: "Middle of the shoulder blade. If you cannot reach, use a ball against a wall or skip.", tradition: "A Small Intestine point in the hollow of the shoulder blade." },
      { pointId: "li10", seconds: 30, how: "Forearm muscle a little below the elbow crease, hand loose.", tradition: "Arm point often added when the shoulder feels tired." },
      { pointId: "si3", seconds: 30, how: "Loose fist. Press the little-finger side of the hand, just below the knuckle.", tradition: "A Small Intestine point taught for the nape and the spine." },
      { pointId: "li4", seconds: 30, how: "Hand point, gentle steady pressure. Skip in pregnancy.", tradition: "Often added when the neck feels tight along with the head." },
    ],
  },
  {
    id: "digestion-settle",
    title: "Digestion Settle",
    focus: "Ordinary fullness after eating",
    aim: "A belly-and-wrist sequence for ordinary fullness. Skip it if pain is severe, and wait until you are not still chewing.",
    tags: ["digestion"],
    steps: [
      { pointId: "ren12", seconds: 40, how: "Soft palm on the midline, halfway from the navel to the breastbone. Stop if it is sharp.", tradition: "The front-mu point of the Stomach on the midline." },
      { pointId: "st25", seconds: 30, how: "Two thumb-widths out from the navel, both sides, gentle circles.", tradition: "The front-mu point of the Large Intestine." },
      { pointId: "ren6", seconds: 35, how: "Warm palm just below the navel. No drilling. Skip strong pressure in pregnancy.", tradition: "A midline point taught as a sea of qi. A teaching name, not a claim." },
      { pointId: "pc6", seconds: 40, how: "Inner forearm, between the tendons. Ease off if the fingers tingle.", tradition: "Often taught when the chest or stomach feels unsettled." },
      { pointId: "st36", seconds: 50, how: "Just beside the shin, about four finger-widths below the kneecap. Sit, foot relaxed.", tradition: "A major Stomach point, studied for digestion and everyday energy." },
      { pointId: "st40", seconds: 35, how: "Midway down the outer shin, two finger-breadths out from the bone.", tradition: "A Stomach point lower on the leg, studied with fullness." },
      { pointId: "sp6", seconds: 40, how: "Inner leg, above the ankle. Skip this step in pregnancy.", tradition: "Meeting of three yin channels of the leg." },
    ],
  },
  {
    id: "energy-lift",
    title: "Energy Lift",
    focus: "Ordinary tiredness, studied quietly",
    aim: "A short routine for everyday low energy. It is not a treatment for fatigue with weight loss, fever, chest pain, or a low mood that will not lift.",
    tags: ["energy"],
    steps: [
      { pointId: "du20", seconds: 30, how: "Fingertips on the crown. Almost no pressure.", tradition: "Where the Governing vessel is said to meet the crown." },
      { pointId: "sishencong", seconds: 35, how: "Four fingertips in a small ring around the crown, about a thumb-width out.", tradition: "A group of extra points around Du20, studied for a clear head." },
      { pointId: "st36", seconds: 50, how: "Beside the shin, below the knee. The longer hold.", tradition: "Classically called a point of longevity in student texts. A teaching phrase, not a claim." },
      { pointId: "li4", seconds: 30, how: "The hand point. Skip in pregnancy.", tradition: "Yuan-source of the Large Intestine, taught for moving qi." },
      { pointId: "ren6", seconds: 40, how: "Warm palm just below the navel. Skip strong pressure in pregnancy.", tradition: "Midline point below the navel, taught for everyday qi." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, beside the Achilles, off the pulse.", tradition: "Source point of the Kidney channel." },
      { pointId: "sp6", seconds: 30, how: "Inner leg above the ankle. Skip in pregnancy.", tradition: "Meeting of three leg yin channels." },
    ],
  },
  {
    id: "stress-release",
    title: "Stress Release",
    focus: "A longer study sequence for a busy mind",
    aim: "A familiar sequence of head, wrist, chest, and foot points. Not a treatment for anxiety, panic, or depression.",
    tags: ["stress"],
    steps: [
      { pointId: "yintang", seconds: 40, how: "Between the brows. Soft, while the breath slows.", tradition: "An extra point taught for the spirit." },
      { pointId: "gb20", seconds: 35, how: "Hollows under the skull. Mild, into the muscle.", tradition: "A nape point often added when stress sits in the neck." },
      { pointId: "ren17", seconds: 30, how: "Soft palm on the center of the chest. Stop if it is tender.", tradition: "Midline of the chest, studied with a tight feeling." },
      { pointId: "pc6", seconds: 40, how: "Inner wrist, three finger-widths up, between the tendons.", tradition: "Studied for the chest and a tight, worried feeling." },
      { pointId: "ht7", seconds: 40, how: "Wrist crease, little-finger side. Gentle.", tradition: "Heart source point, studied for the spirit." },
      { pointId: "li4", seconds: 35, how: "Between thumb and index finger. Skip in pregnancy.", tradition: "Paired in class with LV3 as the “four gates.”" },
      { pointId: "lv3", seconds: 40, how: "Thumb in the hollow on the top of the foot, between the first and second bones.", tradition: "Source point of the Liver channel, taught for constraint." },
    ],
  },
  {
    id: "lower-back",
    title: "Lower Back Ease",
    focus: "A tired, achy waist after sitting",
    aim: "Points along the low back and the leg, for study of that region. Not for an injury, pain down the leg, numbness, or trouble passing urine.",
    tags: ["back"],
    steps: [
      { pointId: "du4", seconds: 40, how: "Warm palm on the midline of the waist. No jackknife.", tradition: "Governing vessel on the low back, called the life gate in textbooks." },
      { pointId: "bl23", seconds: 45, how: "Loose palm on the muscle just beside the spine at the waist, both sides if you can reach.", tradition: "The back-shu point associated with the Kidney." },
      { pointId: "bl25", seconds: 30, how: "A bit lower, still on the muscle beside the spine, about level with the top of the hip bones. Mild.", tradition: "Back-shu point associated with the Large Intestine." },
      { pointId: "yaoyan", seconds: 30, how: "The dimples out to the side of the waist, a palm’s width from the spine. Mild, or skip if you cannot reach.", tradition: "An extra point whose name means lumbar eyes." },
      { pointId: "gb30", seconds: 35, how: "Side of the buttock, about one third of the way from the outer hip bone toward the sacrum. Lie on your side if that is easier, or skip.", tradition: "A Gallbladder point studied for the hip and the side of the low back." },
      { pointId: "bl40", seconds: 40, how: "Middle of the crease behind the knee. Mild. Do not press a pulse.", tradition: "A command point taught for the back." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse.", tradition: "Kidney source point, often paired with the waist points in textbooks." },
    ],
  },
  {
    id: "morning-wake",
    title: "Morning Wake-Up",
    focus: "A fuller start to the day",
    aim: "A brief morning sequence. It does not replace sleep, food, or care for illness.",
    tags: ["morning", "energy"],
    steps: [
      { pointId: "du20", seconds: 25, how: "Fingertips on the crown. Almost no pressure.", tradition: "The crown point of the Governing vessel." },
      { pointId: "sishencong", seconds: 30, how: "Four fingertips in a small ring around the crown.", tradition: "Extra points around the crown, studied for a clear head." },
      { pointId: "gb20", seconds: 30, how: "Hollows under the skull. Mild.", tradition: "A nape point to loosen the night’s stiffness. Not for an injury." },
      { pointId: "li4", seconds: 30, how: "The hand point. Skip in pregnancy.", tradition: "Taught for clearing the head at the start of the day." },
      { pointId: "ren6", seconds: 35, how: "Warm palm just below the navel. Skip strong pressure in pregnancy.", tradition: "Midline point below the navel." },
      { pointId: "st36", seconds: 45, how: "Beside the shin, below the knee. Steady pressure.", tradition: "A Stomach point taught for everyday vitality." },
      { pointId: "ki3", seconds: 35, how: "Inner ankle hollow, off the pulse.", tradition: "Kidney source point." },
    ],
  },
  {
    id: "evening-unwind",
    title: "Evening Unwind",
    focus: "A longer close than a four-point wind-down",
    aim: "Quiet holds for the end of the day. Not a sleep medicine and not a treatment.",
    tags: ["evening", "sleep"],
    steps: [
      { pointId: "yintang", seconds: 45, how: "Between the brows. Let the exhale be longer than the inhale.", tradition: "A midline extra point for quieting." },
      { pointId: "anmian", seconds: 35, how: "Behind the ear, toward the hollow under the skull. Mild.", tradition: "Extra point taught for a peaceful evening. A name, not a promise." },
      { pointId: "ht7", seconds: 40, how: "Wrist crease, little-finger side. Gentle.", tradition: "Heart source point, studied for the spirit." },
      { pointId: "pc6", seconds: 35, how: "Inner forearm, a quiet press.", tradition: "Often used in evening sequences for the chest." },
      { pointId: "sp6", seconds: 40, how: "Inner leg above the ankle. Skip in pregnancy.", tradition: "Meeting of three leg yin channels." },
      { pointId: "lv3", seconds: 30, how: "Top of the foot, between the first and second bones.", tradition: "Liver source point, a quiet last step for the foot." },
      { pointId: "ki1", seconds: 30, how: "Hollow of the sole. Stop if it feels too intense.", tradition: "Kidney point on the sole." },
    ],
  },
  {
    id: "nausea",
    title: "Nausea",
    focus: "Ordinary queasiness or travel",
    aim: "Wrist and leg points students learn for queasiness. Not for severe vomiting, chest pain, or a head injury.",
    tags: ["digestion"],
    steps: [
      { pointId: "pc6", seconds: 60, how: "Three finger-widths up from the wrist crease, between the tendons. Ease off if the fingers tingle.", tradition: "The point most often taught for nausea in class." },
      { pointId: "pc8", seconds: 25, how: "Press the center of the palm with the other thumb, where the middle finger lands in a loose fist.", tradition: "A Pericardium point on the palm, sometimes added with PC6." },
      { pointId: "ren17", seconds: 30, how: "Soft palm on the center of the chest. Stop if it is tender.", tradition: "Midline of the chest, when queasiness sits up high." },
      { pointId: "ren12", seconds: 40, how: "Soft palm halfway from the navel to the breastbone. Stop if it is sharp.", tradition: "Front-mu of the Stomach." },
      { pointId: "st25", seconds: 25, how: "Two thumb-widths out from the navel. Gentle.", tradition: "Front-mu of the Large Intestine." },
      { pointId: "st36", seconds: 45, how: "Beside the shin, below the kneecap.", tradition: "Stomach channel, studied with digestion." },
      { pointId: "li4", seconds: 30, how: "On the hand. Skip in pregnancy.", tradition: "Sometimes added when the face also feels unsettled." },
    ],
  },
  {
    id: "tired-eyes",
    title: "Tired Eyes",
    focus: "Screen-tired eyes and a tight brow",
    aim: "Light points around the brow, the nape, and the foot. Not for vision loss, eye pain, or a sudden headache.",
    tags: ["head"],
    steps: [
      { pointId: "yintang", seconds: 30, how: "Between the brows. Light.", tradition: "Extra point on the forehead midline." },
      { pointId: "bl2", seconds: 30, how: "Fingertip in the inner brow notch, upward, never down into the eye.", tradition: "Bladder channel at the inner brow." },
      { pointId: "yuyao", seconds: 25, how: "Middle of the eyebrow, above the pupil. Very light.", tradition: "An extra point in the middle of the brow." },
      { pointId: "gb14", seconds: 30, how: "Above the middle of the eyebrow, on the bone. Light.", tradition: "Gallbladder point on the forehead." },
      { pointId: "taiyang", seconds: 35, how: "Soft circles at the temple.", tradition: "Extra point at the temple." },
      { pointId: "gb20", seconds: 40, how: "Hollows under the skull. Mild.", tradition: "Nape point often paired with the eyes in textbooks." },
      { pointId: "lv3", seconds: 30, how: "Top of the foot, between the first and second bones.", tradition: "Liver source point, studied with the eyes in traditional language." },
    ],
  },
  {
    id: "clear-head",
    title: "Clear Head",
    focus: "Ordinary fog and a scattered mind",
    aim: "A quiet scalp-and-wrist sequence. Not care for dementia, a new concussion, or a sudden change in speech or face.",
    tags: ["head", "energy"],
    steps: [
      { pointId: "yintang", seconds: 40, how: "Finger between the brows.", tradition: "Extra point on the forehead midline." },
      { pointId: "du24", seconds: 30, how: "Fingertips on the midline, just inside the front hairline. Almost no pressure.", tradition: "Governing vessel at the front of the scalp, called spirit court in textbooks." },
      { pointId: "du20", seconds: 40, how: "Rest on the crown. Do not push.", tradition: "Governing vessel at the crown." },
      { pointId: "sishencong", seconds: 40, how: "Four fingertips in a small ring around the crown.", tradition: "Extra points around Du20." },
      { pointId: "gb20", seconds: 35, how: "Hollows under the skull. Mild.", tradition: "A nape point studied with a heavy head." },
      { pointId: "ht7", seconds: 40, how: "Wrist hollow, little-finger side.", tradition: "Heart source point." },
      { pointId: "li4", seconds: 30, how: "The hand point. Skip in pregnancy.", tradition: "Command point for the face, often added for a foggy head." },
    ],
  },
  {
    id: "cold-limbs",
    title: "Cold Hands and Feet",
    focus: "Hands and feet that stay cold",
    aim: "For cold hands and feet when you are otherwise well. Not for a limb that is pale, numb, or suddenly cold on one side.",
    tags: ["energy"],
    steps: [
      { pointId: "pc8", seconds: 30, how: "Press the center of the palm with the thumb of the other hand. Then switch.", tradition: "Pericardium point in the palm." },
      { pointId: "li4", seconds: 30, how: "Between thumb and index finger. Skip in pregnancy.", tradition: "A hand point added when the fingers stay cold." },
      { pointId: "pc6", seconds: 30, how: "Inner forearm. Gentle.", tradition: "Pericardium point on the wrist." },
      { pointId: "ren6", seconds: 40, how: "Warm palm just below the navel. Skip strong pressure in pregnancy.", tradition: "Midline point below the navel, taught for everyday warmth." },
      { pointId: "st36", seconds: 50, how: "Beside the shin, below the knee.", tradition: "Stomach point taught for everyday warmth and energy." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse.", tradition: "Kidney source point." },
      { pointId: "ki1", seconds: 30, how: "Hollow of the sole. Stop if it feels too intense.", tradition: "The first point of the Kidney channel, on the sole." },
    ],
  },
];

export function getRoutine(id: string) {
  return ROUTINES.find((routine) => routine.id === id);
}

export function routineSeconds(routine: Routine) {
  return routine.steps.reduce((sum, step) => sum + step.seconds, 0);
}

export function routineMinutes(routine: Routine) {
  return Math.max(1, Math.round(routineSeconds(routine) / 60));
}

export function tagLabel(id: RoutineTag) {
  return ROUTINE_TAGS.find((tag) => tag.id === id)?.label ?? id;
}
