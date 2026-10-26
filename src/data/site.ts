export const brand = {
  // The wordmark itself is the brand identity, so it stays as it is.
  name: 'Horizon Properties',
  short: 'Horizon',
  tagline: 'املاک ممتاز در بهترین موقعیت‌ها',
  description:
    'هورایزن پراپرتیز نمایندهٔ خانه‌های استثنایی و سرمایه‌گذاری‌های سنجیده در سراسر ایالات متحده است؛ با تعداد محدودی مشتری در هر سال کار می‌کند.',
}

export interface NavLink {
  label: string
  to: string
  /** Section id used for active-state matching on the home page. */
  section?: string
}

export const navLinks: NavLink[] = [
  { label: 'خانه', to: '/' },
  { label: 'املاک', to: '/properties' },
  { label: 'جست‌وجوی املاک', to: '/search' },
  { label: 'درباره ما', to: '/#about', section: 'about' },
  { label: 'خدمات', to: '/#services', section: 'services' },
  { label: 'تیم', to: '/#team', section: 'team' },
  { label: 'تماس', to: '/#contact', section: 'contact' },
]

export const contact = {
  phoneDisplay: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  addressLines: ['هورایزن پراپرتیز', 'خیابان کانگرس، شمارهٔ ۲۴۰۰، واحد ۱۲', 'آستین، تگزاس ۷۸۷۰۱'],
  hours: 'دوشنبه تا شنبه، ۹ صبح تا ۶ عصر (وقت مرکزی)',
}

/** Swap these three URLs for the real profiles before launch. */
export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Facebook', href: 'https://www.facebook.com' },
]

export interface Service {
  title: string
  description: string
  meta: string
}

export const services: Service[] = [
  {
    title: 'فروش خانه‌های لوکس',
    description:
      'نمایندگی خانه‌های شاخص از نظر معماری؛ از یک معرفی محرمانه و خارج از فهرست تا رسیدن به مرحلهٔ انتقال سند.',
    meta: 'نمایندگی خریدار و فروشنده',
  },
  {
    title: 'سرمایه‌گذاری ملکی',
    description:
      'راهبرد پرتفوی، تحلیل بازده و شناسایی فرصت‌های خرید برای دارایی‌های مسکونی درآمدزا.',
    meta: 'خرید و راهبرد پرتفوی',
  },
  {
    title: 'بازاریابی ملک',
    description:
      'تولید فیلم، عکاسی و محتوای تحریریه‌ای که خانه را در برابر خریداران درست قرار می‌دهد، نه بزرگ‌ترین تعداد.',
    meta: 'عکاسی، فیلم و رسانه',
  },
  {
    title: 'مشاورهٔ املاک',
    description:
      'مشاورهٔ مستقل دربارهٔ زمان‌بندی، ساختار معامله و مذاکره، پیش از آنکه سرمایه‌تان را به ملکی گره بزنید.',
    meta: 'مشاورهٔ پیش از خرید',
  },
  {
    title: 'ارزیابی ملک',
    description:
      'کارشناسی مبتنی بر شواهد؛ بر پایهٔ معاملات مشابه، ارزش زمین و کیفیت ساخت.',
    meta: 'کارشناسی و شواهد بازار',
  },
  {
    title: 'خدمات جابه‌جایی',
    description:
      'معرفی محله، آشنایی با مدرسه‌ها و پشتیبانی اقامت برای مشتریانی که از خارج کشور نقل مکان می‌کنند.',
    meta: 'جابه‌جایی و استقرار',
  },
]

export const whyUs = {
  label: 'چرا هورایزن',
  title: 'راهی آرام‌تر برای خرید و فروش ملک',
  body: 'هر سال تعداد محدودی مشتری را می‌پذیریم. یعنی همان کسی که ملاقات می‌کنید، مذاکره را هم به نام شما انجام می‌دهد و هر ملکی که معرفی می‌کنیم، پیش‌تر خودمان دیده، اندازه گرفته و قیمت‌گذاری کرده‌ایم.',
  reasons: [
    {
      title: 'تسلط بر معماری',
      description:
        'نقشه و متریال را می‌خوانیم، پس می‌توانیم دربارهٔ اینکه یک ساختمان واقعاً چیست صحبت کنیم — نه فقط اندازه‌اش.',
    },
    {
      title: 'محرمانگی، اصل کار ماست',
      description:
        'بخش قابل‌توجهی از معاملات ما هرگز در فهرست عمومی منتشر نمی‌شود. محرمانگی بخشی از خدمت است.',
    },
    {
      title: 'یک مشاور، تا پایان کار',
      description:
        'همان مشاوری که ملک را به شما نشان می‌دهد، مذاکره را انجام می‌دهد و تا انتقال سند در کنار شما می‌ماند.',
    },
  ],
  stats: [
    { value: '۱۸', label: 'سال حضور در بازارهای ممتاز' },
    { value: '۱٬۲۴۰+', label: 'خانهٔ معرفی‌شده' },
    { value: '۱٫۴ میلیارد دلار', label: 'ارزش معاملات' },
    { value: '۹۸٪', label: 'مشتریانی که ما را معرفی می‌کنند' },
  ],
}

export const heroCopy = {
  headline: ['خانه‌های استثنایی', 'و سرمایه‌گذاری هوشمند'],
  standfirst:
    'املاک ممتاز در بهترین موقعیت‌ها. با اطمینان خانهٔ رویایی یا سرمایه‌گذاری مناسب خود را پیدا کنید.',
}

export const aboutCopy = {
  label: 'دربارهٔ ما',
  title: 'ما چه کسانی هستیم',
  body: 'در هورایزن پراپرتیز، مردم را به خانه‌های فوق‌العاده و سرمایه‌گذاری‌های هوشمند وصل می‌کنیم. درستی، شفافیت و رضایت مشتری، قلب همهٔ کار ما است.',
  secondary:
    'با پایه‌گذاری در آستین و فعالیت در سراسر ایالات متحده، به خریداران، فروشندگان و سرمایه‌گذاران در حوزهٔ ملک مسکونی مشاوره می‌دهیم؛ از نخستین بازدید تا امضای نهایی.',
  stats: [
    { value: '۱۸', label: 'سال مشاوره به مشتریان' },
    { value: '۶', label: 'مشاور، نه بیشتر' },
  ],
}

export const ctaCopy = {
  title: 'آماده‌اید ملک ایده‌آل خود را پیدا کنید؟',
  body: 'بگذارید کارشناسان ما شما را به خانه یا سرمایه‌گذاری درست برسانند.',
  action: 'تماس بگیرید',
}
