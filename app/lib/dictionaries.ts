import { PROGRAMS, TEACHERS, REVIEWS, FAQ_ITEMS, JOURNEY_STEPS, KIDS_FEATURES, ADULT_FEATURES, PROVIDER } from "@/app/lib/data";

// Helper to fully translate data:
const PROGRAMS_EN = [
  { ...PROGRAMS[0], title: "HSK in 3 months", tag: "bestseller", features: ["HSK 1–6 preparation", "HAO custom materials", "Weekly mock tests"] },
  { ...PROGRAMS[1], title: "Chinese for Kids", tag: "from 7 years", features: ["Playful learning format", "Adapted materials", "Patient teachers"] },
  { ...PROGRAMS[2], title: "Chinese for Work", tag: "career & business", features: ["Business Chinese", "Negotiations and documents", "Professional vocabulary"] },
  { ...PROGRAMS[3], title: "Chinese for Travel", tag: "borderless", features: ["Spoken Chinese", "Travel phrases", "Culture and traditions"] },
  { ...PROGRAMS[4], title: "One-on-one Classes", tag: "for your goal", features: ["Personal program", "Flexible schedule", "Maximum results"] },
  { ...PROGRAMS[5], title: "Mini-groups", tag: "same level", features: ["Small groups", "Live communication", "Affordable price"] },
];

const TEACHERS_EN = [
  { ...TEACHERS[0], role: "Certified Teacher", spec: "HSK and University Admission", desc: "Works with schoolchildren, students, and adults. Helps prepare for language exams and admission to Chinese universities. Students reach HSK 1 in 3 months with regular classes." },
  { ...TEACHERS[1], role: "Certified Teacher", spec: "Exam Preparation", desc: "Works with children and high school students. Helps improve school grades and prepare for exams. Many students reach solid A and B grades in just one semester." },
  { ...TEACHERS[2], role: "Certified Teacher", spec: "Chinese for Kids", desc: "Works with children from 7 years old. Knows how to engage a child and make lessons fun and easy to understand. Kids start speaking from the very first lessons." },
  { ...TEACHERS[3], role: "Certified Teacher", spec: "Chinese for Work and Business", desc: "Works with adult students. Helps learn Chinese for work, business, and communicating with partners. After 2 months, students confidently use basic phrases at work." },
  { ...TEACHERS[4], role: "Qualified Teacher", spec: "HSK 2–3 and Spoken Language", desc: "Works with students and adults. Prepares for the HSK exam and helps learn the language for work. Students successfully pass HSK 2–3 and start speaking more confidently in just a few months." },
];

const REVIEWS_EN = [
  { ...REVIEWS[0], role: "34 y.o., Moscow · HSK 6 Preparation", text: "I have been studying with a native speaker for two months now, and I am thrilled. My goal is HSK 6, Siqin and I chose a comfortable pace, and I feel real progress every lesson. The lessons are entirely in Chinese — scary at first, but then you realize it is the fastest track." },
  { ...REVIEWS[1], role: "28 y.o., St. Petersburg · One-on-one classes", text: "I deliberately looked for a native speaker — I didn't want to study from textbooks without live speech. After a trial lesson with Dai Wei, I didn't hesitate long. He is responsive, attentive, and a demanding teacher. After a month, I started understanding spoken language much better." },
  { ...REVIEWS[2], role: "41 y.o., Yekaterinburg · HSK 4 Preparation", text: "I study with Siqin, preparing for HSK 4. The lessons are structured, the pace is comfortable — and most importantly, I hear my progress. I've always wanted to study with a native speaker, and now I understand why: it's a completely different level of immersion." },
  { ...REVIEWS[3], role: "29 y.o., Kazan · Speaking practice", text: "I came with a specific request: improve my speaking skills and prepare for an oral exam. Over a month in, and there's a noticeable result: I speak more confidently, freeze less searching for words. The platform is convenient, I don't miss classes." },
  { ...REVIEWS[4], role: "Artem's dad, Ufa · Chinese for kids, 7 y.o.", text: "Alua found an approach to my son from the very first lesson. She tailored the material to his age and interests — the lessons are positive, dynamic, without boredom. Artem reminds me himself that there is a lesson today. For a seven-year-old child, this is the best review you can give." },
  { ...REVIEWS[5], role: "25 y.o., Novosibirsk · Classes with Kainin", text: "I really like how the lessons are structured: each session begins with a review of past material, so it doesn't fly out of your head after a week. Kai Nin is friendly, attentive — and keeps the pace. The lessons are a pleasure." },
];

const FAQ_ITEMS_EN = [
  { q: "Can I study at a convenient time?", a: "Yes. We create schedules individually — we adapt to you, not the other way around." },
  { q: "How long is one lesson?", a: "A standard lesson is 60 minutes. A 45-minute format is available upon request." },
  { q: "What kind of teachers do you have?", a: "Native speakers with over 3 years of teaching experience and international certificates. Everyone passes a strict selection — only 1 out of 10 makes it to the end." },
  { q: "How long does it take to start speaking?", a: "First phrases — right from the first lesson. Confident basic spoken language — in 2–3 months with classes 2-3 times a week." },
  { q: "What materials are used?", a: "HAO's custom materials, adapted to each level and goal. No boring textbooks — only what really works." },
  { q: "Is the course suitable for children?", a: "Yes. There are separate programs for children from 7 years old with a playful format and teachers who specialize specifically in working with children." },
];

const JOURNEY_STEPS_EN = [
  { num: "1", title: "Setting a Goal", desc: "Determine your goal: travel, career, studying in China, or simply an interest in the language." },
  { num: "2", title: "Matching Teacher & Program", desc: "We match a teacher, program, and convenient schedule individually for you." },
  { num: "3", title: "Live Lessons on Platform", desc: "Study online with a teacher, get homework and feedback." },
  { num: "4", title: "Lots of Dialogues", desc: "Speaking practice from the very first lessons — this is how the language sticks best." },
  { num: "5", title: "HSK Exams & University", desc: "We prepare for HSK 1–6 and admission to Chinese universities." },
];

const KIDS_FEATURES_EN = [
  "Online lessons with a native speaker",
  "Playful learning platform",
  "Homework with feedback",
  "Curator support",
  "Programs from 7 years old",
  "Preparation for school HSK",
];

const ADULT_FEATURES_EN = [
  "Online lessons with a native speaker",
  "Interactive platform: assignments and tests",
  "Homework checks with feedback",
  "Curator available anytime",
  "Flexible schedule",
  "HSK 1–6 preparation",
];

const PROVIDER_EN = {
  title: "Service Provider:",
  name: "IP Helispali K.G.",
  innOgrnip: "TIN/OGRNIP: 667302881017/308667334600021",
  city: "Yekaterinburg",
  faqLabel: "FAQ",
  faqHref: "#faq",
};

export const dictionaries = {
  ru: {
    header: {
      logoAlt: "HAO логотип",
      title: "НАО",
      subtitle: "онлайн школа китайского языка"
    },
    nav: {
      programs: "Форматы занятий",
      teachers: "Преподаватели",
      reviews: "Отзывы",
      pricing: "Стоимость",
      cta: "Записаться на занятие",
      menu: "Меню"
    },
    hero: {
      title1: "Китайский",
      title2: "язык будущего",
      subtitle: "Китайский онлайн\nс преподавателями из Китая для\nшкольников и взрослых.",
      desc: "Более 500 учеников уже говорят по-китайски.",
      cta: "Записаться на бесплатный урок",
      programs: "Консультация по поступлению в Китайский ВУЗ",
      benefit1: "обучение\nза рубежом",
      benefit2: "высокий\nдоход",
      benefit3: "карьерный\nрост"
    },
    programs_sec: {
      title: "Программы для любых целей",
      desc: "Занимайтесь онлайн с преподавателями прямо из Китая",
      bestseller: "курс-бестселлер",
      from7: "от 7 лет",
      career: "карьера и бизнес",
      borderless: "без границ",
      foryou: "под вашу цель",
      samelevel: "с одним уровнем",
      more: "Подробнее",
      teacher_name: "Сицин",
      teacher_spec: "HSK и поступление в вузы"
    },
    teachers_sec: {
      title: "Вы сможете подобрать преподавателя под ваши цели и задачи",
      desc: "Преподаватели проходят строгий отбор: опыт от 3 лет, международные сертификаты, многие живут в Китае.",
      aria: "Преподаватель"
    },
    journey: {
      tag: "от нуля до результата",
      title: "Путь ученика"
    },
    reviews_sec: {
      title: "Отзывы наших студентов",
      prev: "Предыдущий",
      next: "Следующий",
      review_aria: "Отзыв"
    },
    pricing_sec: {
      title: "Тарифы",
      desc: "Выберите подходящий формат — первый урок бесплатно",
      kids: "Для детей",
      adults: "Для взрослых",
      from: "от",
      per_lesson: "за урок",
      cta: "Записаться на бесплатный урок",
      trial: "Пробный урок — бесплатно. Без обязательств."
    },
    faq_sec: {
      title: "Часто задаваемые вопросы"
    },
    footer_sec: {
      contacts: "Контакты:",
      email: "Email:",
      phone: "Телефон:",
      policy: "Политика конфиденциальности",
      terms: "Пользовательское соглашение/оферта",
      rights: "© 2026 HAO — онлайн школа китайского языка"
    },
    modal: {
      title: "Записаться на консультацию",
      name: "Имя",
      email: "Email (необязательно)",
      phone_placeholder: "+7 (000) 000-00-00",
      submit: "Записаться",
      sending: "Отправляем...",
      agreement: "Нажимая \"Записаться\" вы соглашаетесь с политикой конфиденциальности",
      success_title: "Заявка отправлена!",
      success_desc: "Мы свяжемся с вами в ближайшее время.",
      close: "Закрыть",
      error_send: "Ошибка отправки",
      error_conn: "Ошибка соединения"
    },
    data: { PROGRAMS, TEACHERS, REVIEWS, FAQ_ITEMS, JOURNEY_STEPS, KIDS_FEATURES, ADULT_FEATURES, PROVIDER }
  },
  en: {
    header: {
      logoAlt: "HAO logo",
      title: "HAO",
      subtitle: "online Chinese language school"
    },
    nav: {
      programs: "Programs",
      teachers: "Teachers",
      reviews: "Reviews",
      pricing: "Pricing",
      cta: "Sign Up",
      menu: "Menu"
    },
    hero: {
      title1: "Chinese",
      title2: "language of the future",
      subtitle: "Learn Chinese online\nwith native teachers from China\nfor kids and adults.",
      desc: "Over 500 students already speak Chinese.",
      cta: "Sign up for a free lesson",
      programs: "Consultation on admission to a Chinese University",
      benefit1: "study\nabroad",
      benefit2: "high\nincome",
      benefit3: "career\ngrowth"
    },
    programs_sec: {
      title: "Programs for any goal",
      desc: "Study online with native teachers directly from China",
      bestseller: "bestseller",
      from7: "from 7 years",
      career: "career & business",
      borderless: "borderless",
      foryou: "for your goal",
      samelevel: "same level",
      more: "Learn more",
      teacher_name: "Siqin",
      teacher_spec: "HSK and university admission"
    },
    teachers_sec: {
      title: "We will match a teacher to your specific goals",
      desc: "Teachers pass strict selection: 3+ years experience, international certificates, many living in China.",
      aria: "Teacher"
    },
    journey: {
      tag: "from zero to results",
      title: "Student Journey"
    },
    reviews_sec: {
      title: "Student Reviews",
      prev: "Previous",
      next: "Next",
      review_aria: "Review"
    },
    pricing_sec: {
      title: "Pricing",
      desc: "Choose a suitable format — first lesson is free",
      kids: "For kids",
      adults: "For adults",
      from: "from",
      per_lesson: "per lesson",
      cta: "Sign up for a free lesson",
      trial: "Trial lesson is free. No obligations."
    },
    faq_sec: {
      title: "Frequently Asked Questions"
    },
    footer_sec: {
      contacts: "Contacts:",
      email: "Email:",
      phone: "Phone:",
      policy: "Privacy Policy",
      terms: "Terms of Service/Offer",
      rights: "© 2026 HAO — online Chinese language school"
    },
    modal: {
      title: "Sign up for counseling",
      name: "Name",
      email: "Email (optional)",
      phone_placeholder: "+1 (000) 000-0000",
      submit: "Sign Up",
      sending: "Sending...",
      agreement: "By clicking \"Sign Up\" you agree to our privacy policy",
      success_title: "Application sent!",
      success_desc: "We will contact you shortly.",
      close: "Close",
      error_send: "Submit error",
      error_conn: "Connection error"
    },
    data: { 
      PROGRAMS: PROGRAMS_EN, 
      TEACHERS: TEACHERS_EN, 
      REVIEWS: REVIEWS_EN, 
      FAQ_ITEMS: FAQ_ITEMS_EN, 
      JOURNEY_STEPS: JOURNEY_STEPS_EN, 
      KIDS_FEATURES: KIDS_FEATURES_EN, 
      ADULT_FEATURES: ADULT_FEATURES_EN, 
      PROVIDER: PROVIDER_EN 
    }
  }
};

export type Lang = keyof typeof dictionaries;
export const getDictionary = (lang: Lang) => dictionaries[lang];
