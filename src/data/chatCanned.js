// Small pools of canned, bilingual copy used to simulate the "other side" of a
// conversation in this backend-less demo (auto-accept, opening notes, auto-replies).
export const simulatedOpeningNotes = {
  en: [
    "Hey! I've been wanting to read this one — happy to swap whenever suits you.",
    'Hi there! Loved your listing, would love to trade for it.',
    "Hello! I'm heading your way this week, could we meet up?",
  ],
  he: [
    'היי! מזמן רציתי לקרוא את הספר הזה, נשמח להחליף מתי שנוח לך.',
    'שלום! אהבתי את הפרסום שלך, ישמח אותי להחליף.',
    'היי! אני מגיע/ה לאזור שלך השבוע, אפשר להיפגש?',
  ],
}

export const chatCannedReplies = {
  en: [
    'Sounds great, when works for you?',
    'Awesome, thanks! Where should we meet?',
    "Perfect, I'm flexible on timing.",
    'Great choice of book, looking forward to it!',
    "Let's do it — I'll be around most evenings.",
  ],
  he: [
    'נשמע מעולה, מתי נוח לך?',
    'תודה, איפה נפגש?',
    'מושלם, אני גמיש/ה בזמנים.',
    'בחירה מעולה, מחכה לזה!',
    'סבבה, אני פנוי/ה רוב הערבים.',
  ],
}

export function pickRandom(pool) {
  return pool[Math.floor(Math.random() * pool.length)]
}
