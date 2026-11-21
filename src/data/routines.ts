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
      { pointId: "li4", seconds: 30, how: "Press the muscle between thumb and index finger. Skip this step in pregnancy.", tradition: "A command point taught for the face and for moving qi. Not for self-care in pregnancy." },
    ],
  },
  {
    id: "sleep-wind-down",
    title: "Sleep Wind-Down",
    focus: "Calm & sleep, at the end of the day",
    aim: "A wind-down used in class for ordinary restlessness at night. It will not override pain, caffeine, or a sleep disorder.",
    tags: ["sleep", "evening"],
    steps: [
      { pointId: "ht7", seconds: 45, how: "Gentle steady pressure in the wrist hollow, little-finger side.", tradition: "Studied as a point that calms the spirit before rest." },
      { pointId: "sp6", seconds: 40, how: "Inner leg, a hand’s breadth above the ankle bone. Skip this step in pregnancy.", tradition: "Where three yin channels of the leg are said to meet." },
      { pointId: "anmian", seconds: 40, how: "Behind the ear, halfway toward the hollow under the skull. Mild, both sides if comfortable.", tradition: "An extra point whose name means peaceful sleep. A teaching name, not a promise." },
      { pointId: "yintang", seconds: 45, how: "Finger between the brows while the exhale lengthens.", tradition: "Often paired with the wrist points in quiet evening routines." },
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
      { pointId: "gb20", seconds: 40, how: "Thumbs in the hollows under the skull, into the muscle, slightly toward the eyes.", tradition: "A wind point at the nape, studied for the head." },
      { pointId: "yintang", seconds: 30, how: "Between the brows. Light pressure.", tradition: "An extra point on the midline of the forehead." },
      { pointId: "taiyang", seconds: 35, how: "Slow circles at the temple. Lighten up if you feel a strong pulse.", tradition: "An extra point at the temple, often taught with the brow." },
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
      { pointId: "li4", seconds: 30, how: "Hand point, gentle steady pressure. Skip in pregnancy.", tradition: "Often added when the neck feels tight along with the head." },
      { pointId: "si3", seconds: 30, how: "Loose fist. Press the little-finger side of the hand, just below the knuckle.", tradition: "A Small Intestine point taught for the nape and the spine." },
    ],
  },
  {
    id: "digestion-settle",
    title: "Digestion Settle",
    focus: "Ordinary fullness after eating",
    aim: "A belly-and-wrist sequence for ordinary fullness. Skip it if pain is severe, and wait until you are not still chewing.",
    tags: ["digestion"],
    steps: [
      { pointId: "st36", seconds: 50, how: "Just beside the shin, about four finger-widths below the kneecap. Sit, foot relaxed.", tradition: "A major Stomach point, studied for digestion and everyday energy." },
      { pointId: "pc6", seconds: 40, how: "Inner forearm, between the tendons. Ease off if the fingers tingle.", tradition: "Often taught when the chest or stomach feels unsettled." },
      { pointId: "ren12", seconds: 40, how: "Soft palm on the midline, halfway from the navel to the breastbone. Stop if it is sharp.", tradition: "The front-mu point of the Stomach on the midline." },
      { pointId: "st25", seconds: 30, how: "Two thumb-widths out from the navel, both sides, gentle circles.", tradition: "The front-mu point of the Large Intestine." },
    ],
  },
  {
    id: "energy-lift",
    title: "Energy Lift",
    focus: "Ordinary tiredness, studied quietly",
    aim: "A short routine for everyday low energy. It is not a treatment for fatigue with weight loss, fever, chest pain, or a low mood that will not lift.",
    tags: ["energy"],
    steps: [
      { pointId: "st36", seconds: 50, how: "Beside the shin, below the knee. The longer hold.", tradition: "Classically called a point of longevity in student texts. A teaching phrase, not a claim." },
      { pointId: "li4", seconds: 30, how: "The hand point. Skip in pregnancy.", tradition: "Yuan-source of the Large Intestine, taught for moving qi." },
      { pointId: "du20", seconds: 30, how: "Fingertips on the crown. Almost no pressure.", tradition: "Where the Governing vessel is said to meet the crown." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, beside the Achilles, off the pulse.", tradition: "Source point of the Kidney channel." },
    ],
  },
  {
    id: "stress-release",
    title: "Stress Release",
    focus: "Four points people look up for stress",
    aim: "A familiar four-point study sequence. Not a treatment for anxiety, panic, or depression.",
    tags: ["stress"],
    steps: [
      { pointId: "yintang", seconds: 40, how: "Between the brows. Soft, while the breath slows.", tradition: "An extra point taught for the spirit." },
      { pointId: "li4", seconds: 35, how: "Between thumb and index finger. Skip in pregnancy.", tradition: "Paired in class with LV3 as the “four gates.”" },
      { pointId: "pc6", seconds: 40, how: "Inner wrist, three finger-widths up, between the tendons.", tradition: "Studied for the chest and a tight, worried feeling." },
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
      { pointId: "bl23", seconds: 45, how: "Loose palm on the muscle just beside the spine at the waist, both sides if you can reach.", tradition: "The back-shu point associated with the Kidney." },
      { pointId: "bl40", seconds: 40, how: "Middle of the crease behind the knee. Mild. Do not press a pulse.", tradition: "A command point taught for the back." },
      { pointId: "gb30", seconds: 35, how: "Side of the buttock, about one third of the way from the outer hip bone toward the sacrum. Lie on your side if that is easier, or skip.", tradition: "A Gallbladder point studied for the hip and the side of the low back." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse.", tradition: "Kidney source point, often paired with the waist points in textbooks." },
    ],
  },
  {
    id: "morning-wake",
    title: "Morning Wake-Up",
    focus: "Three points to start the day",
    aim: "A brief morning sequence. It does not replace sleep, food, or care for illness.",
    tags: ["morning", "energy"],
    steps: [
      { pointId: "du20", seconds: 25, how: "Fingertips on the crown. Almost no pressure.", tradition: "The crown point of the Governing vessel." },
      { pointId: "st36", seconds: 45, how: "Beside the shin, below the knee. Steady pressure.", tradition: "A Stomach point taught for everyday vitality." },
      { pointId: "li4", seconds: 30, how: "The hand point. Skip in pregnancy.", tradition: "Taught for clearing the head at the start of the day." },
    ],
  },
  {
    id: "evening-unwind",
    title: "Evening Unwind",
    focus: "A softer close than the sleep routine",
    aim: "Four quiet holds for the end of the day. Not a sleep medicine and not a treatment.",
    tags: ["evening", "sleep"],
    steps: [
      { pointId: "sp6", seconds: 40, how: "Inner leg above the ankle. Skip in pregnancy.", tradition: "Meeting of three leg yin channels." },
      { pointId: "ht7", seconds: 40, how: "Wrist crease, little-finger side. Gentle.", tradition: "Heart source point, studied for the spirit." },
      { pointId: "pc6", seconds: 35, how: "Inner forearm, a quiet press.", tradition: "Often used in evening sequences for the chest." },
      { pointId: "yintang", seconds: 45, how: "Between the brows. Let the exhale be longer than the inhale.", tradition: "A midline extra point for quieting." },
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
      { pointId: "st36", seconds: 45, how: "Beside the shin, below the kneecap.", tradition: "Stomach channel, studied with digestion." },
      { pointId: "ren12", seconds: 40, how: "Soft palm halfway from the navel to the breastbone. Stop if it is sharp.", tradition: "Front-mu of the Stomach." },
      { pointId: "li4", seconds: 30, how: "Optional, on the hand. Skip in pregnancy.", tradition: "Sometimes added when the face also feels unsettled." },
    ],
  },
  {
    id: "tired-eyes",
    title: "Tired Eyes",
    focus: "Screen-tired eyes and a tight brow",
    aim: "Light points around the brow and one on the foot. Not for vision loss, eye pain, or a sudden headache.",
    tags: ["head"],
    steps: [
      { pointId: "bl2", seconds: 30, how: "Fingertip in the inner brow notch, upward, never down into the eye.", tradition: "Bladder channel at the inner brow." },
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
      { pointId: "du20", seconds: 40, how: "Rest on the crown. Do not push.", tradition: "Governing vessel at the crown." },
      { pointId: "ht7", seconds: 40, how: "Wrist hollow, little-finger side.", tradition: "Heart source point." },
    ],
  },
  {
    id: "cold-limbs",
    title: "Cold Hands and Feet",
    focus: "Hands and feet that stay cold",
    aim: "For cold hands and feet when you are otherwise well. Not for a limb that is pale, numb, or suddenly cold on one side.",
    tags: ["energy"],
    steps: [
      { pointId: "st36", seconds: 50, how: "Beside the shin, below the knee.", tradition: "Stomach point taught for everyday warmth and energy." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse.", tradition: "Kidney source point." },
      { pointId: "pc6", seconds: 30, how: "Inner forearm. Gentle.", tradition: "Pericardium point on the wrist." },
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
