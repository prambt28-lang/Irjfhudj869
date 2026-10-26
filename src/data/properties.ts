import { faInt, faPrice, faArea } from '../lib/format'

export type PropertyType = 'ویلا' | 'عمارت' | 'اقامتگاه' | 'پنت‌هاوس' | 'خانه' | 'ییلاق'

export type PropertyStatus = 'برای فروش' | 'فهرست جدید' | 'اختصاصی'

export interface PropertyImage {
  src: string
  alt: string
}

export interface Property {
  id: string
  name: string
  city: string
  region: string
  country: string
  price: number
  type: PropertyType
  status: PropertyStatus
  beds: number
  baths: number
  sqft: number
  lot: string
  year: number
  featured: boolean
  /** One-line lead used on cards and at the top of the detail page. */
  summary: string
  /** Body copy for the detail page. */
  description: string[]
  features: string[]
  amenities: string[]
  images: PropertyImage[]
  agentId: string
}

export const properties: Property[] = [
  {
    id: 'lakeside-modern-villa',
    name: 'ویلای مدرن کنار دریاچه',
    city: 'آستین',
    region: 'تگزاس',
    country: 'آمریکا',
    price: 2_350_000,
    type: 'ویلا',
    status: 'برای فروش',
    beds: 4,
    baths: 4,
    sqft: 3650,
    lot: '۰٫۶۲ ایکر',
    year: 2021,
    featured: true,
    summary: 'ویلایی آرام و شیشه‌ای، درست روی آب و با اسکلهٔ قایق اختصاصی.',
    description: [
      'ویلای مدرن کنار دریاچه در میان درختان بلوط کهنسال و با نمای کامل رو به غرب آب ساخته شده و بر پایهٔ خطوط افقی بلند طراحی شده است. شیشه‌های سرتاسری در تمام ضلع نشیمن باز می‌شوند و فضای داخلی را به تراسی سرپوشیده و دریاچه پیوند می‌دهند.',
      'فضای داخلی به‌عمد ساده است: کف چوب بلوط روشن، سنگ صیقلی و پالت گرم و خنثی که میدان را به آب واگذار می‌کند. سوئیت اصلی در ضلع مستقل خود قرار دارد، با تراس خصوصی و فضای حمام رو به غروب.',
    ],
    features: [
      'شیشه‌های سرتاسری و جمع‌شونده رو به تراس دریاچه',
      'اسکلهٔ اختصاصی قایق با پهلوگاه سرپوشیده',
      'آشپزخانهٔ حرفه‌ای با جزیرهٔ سنگی صیقلی',
      'سوئیت اصلی با تراس رو به غروب',
      'اتوماسیون کامل خانه و منطقه‌بندی دما',
    ],
    amenities: [
      'استخر بی‌نهایت',
      'اسکلهٔ قایق',
      'سینمای خانگی',
      'اتاق شراب',
      'باشگاه ورزشی',
      'خانهٔ مهمان',
      'شارژ خودرو برقی',
      'امنیت هوشمند',
    ],
    images: [
      { src: '/images/prop-lakeside.webp', alt: 'ویلای شیشه‌ای کنار دریاچه با استخر و تراس چوبی' },
      { src: '/images/gal-living.webp', alt: 'نشیمن باز با پنجره‌های سرتاسری' },
      { src: '/images/gal-kitchen.webp', alt: 'آشپزخانه با جزیرهٔ سنگی و لوازم توکار' },
      { src: '/images/gal-bedroom.webp', alt: 'اتاق خواب اصلی با مبلمان خنثی و نرم' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'pacific-glass-house',
    name: 'خانهٔ شیشه‌ای پاسیفیک',
    city: 'مالیبو',
    region: 'کالیفرنیا',
    country: 'آمریکا',
    price: 4_800_000,
    type: 'اقامتگاه',
    status: 'فهرست جدید',
    beds: 5,
    baths: 5,
    sqft: 5200,
    lot: '۰٫۸۴ ایکر',
    year: 2019,
    featured: true,
    summary: 'اقامتگاهی رو به اقیانوس از شیشه و بتن روشن، چند دقیقه پیاده تا ساحل.',
    description: [
      'خانهٔ شیشه‌ای پاسیفیک روی سکویی ترازشده بالای خط ساحل نشسته و اسکلت بتنی‌اش در دامنهٔ تپه فرو رفته است، تا هر فضای اصلی مستقیم رو به آب باز باشد. پیش‌آمدگی‌های عمیق سقف، شیشه‌ها را سایه می‌اندازند، بی‌آنکه منظره را قطع کنند.',
      'پلان سخاوتمندانه اما ساده است: یک طبقهٔ نشیمن روان، چهار سوئیت مهمان که در شیب پایین می‌آیند و طبقه‌ای زیرین که به سلامتی اختصاص یافته — استخر تمرینی، سونا و اتاق درمان رو به باغ دیوارکشی‌شده.',
    ],
    features: [
      'نمای بدون مانع اقیانوس از همهٔ فضاهای اصلی',
      'اسکلت بتنی پیش‌آمده با سایه‌بان‌های عمیق',
      'طبقهٔ سلامت با استخر تمرینی و سونا',
      'سوئیت‌های مهمان پله‌پله در شیب تپه',
      'پارکینگ دو خودرو به‌همراه محوطهٔ ورودی',
    ],
    amenities: [
      'استخر تمرینی',
      'سونا',
      'اتاق درمان',
      'آشپزخانهٔ فضای باز',
      'تراس آتشدان',
      'باغ طراحی‌شده',
      'پنل خورشیدی',
      'سایه‌بان هوشمند',
    ],
    images: [
      { src: '/images/prop-pacific.webp', alt: 'خانهٔ شیشه‌ای مدرن با استخر در کنار تراس شنی' },
      { src: '/images/gal-lounge.webp', alt: 'نشیمن با صندلی‌های نرم و پنجره‌های بزرگ' },
      { src: '/images/gal-terrace.webp', alt: 'تراس سایه‌دار با نشیمن فضای باز' },
      { src: '/images/gal-bath.webp', alt: 'حمام اسپا با سنگ و چوب روشن' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'desert-horizon-estate',
    name: 'عمارت افق کویر',
    city: 'اسکاتسدیل',
    region: 'آریزونا',
    country: 'آمریکا',
    price: 3_150_000,
    type: 'عمارت',
    status: 'برای فروش',
    beds: 5,
    baths: 6,
    sqft: 6100,
    lot: '۱٫۴ ایکر',
    year: 2022,
    featured: false,
    summary: 'عمارتی کوتاه و کشیده، شکل‌گرفته حول حیاط‌های داخلی، سایه و مناظر بلند کویر.',
    description: [
      'عمارت افق کویر منطق خود را از منظره وام گرفته است: خط سقف بلند و کم‌شیب، دیوارهای ضخیم سایه‌دار و مجموعه‌ای از حیاط‌های داخلی که در گرم‌ترین ماه‌ها پلان را خنک نگه می‌دارند. خاک کوبیده و سنگ گرم، خانه را به زمینش گره می‌زند.',
      'حجم نشیمن از دو سو باز می‌شود و حیاط ورودی سایه‌دار را به تراسی عقب با استخری لبه‌منفی وصل می‌کند که به‌نظر می‌رسد به سمت کوه‌ها سرریز می‌شود.',
    ],
    features: [
      'ساخت با خاک کوبیده و سنگ',
      'سه حیاط سایه‌دار',
      'استخر لبه‌منفی رو به کوه‌ها',
      'بنای مهمان مستقل برای میهمانان',
      'خنک‌سازی غیرفعال و پیش‌آمدگی عمیق سقف',
    ],
    amenities: [
      'استخر لبه‌منفی',
      'بنای مهمان',
      'دوش فضای باز',
      'زمین بازی بوچه',
      'نشیمن آتشدان',
      'گیاهان کویری',
      'کارگاه',
      'جمع‌آوری آب باران',
    ],
    images: [
      { src: '/images/prop-desert.webp', alt: 'عمارت کویری با سقف‌های پله‌ای و استخر' },
      { src: '/images/gal-exterior.webp', alt: 'نمای بیرونی با محوطهٔ گیاه‌کاری‌شده' },
      { src: '/images/gal-dining.webp', alt: 'فضای غذاخوری با میز چوبی گرم' },
      { src: '/images/gal-living.webp', alt: 'فضای نشیمن باز به حیاط داخلی' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'oceanfront-residence',
    name: 'اقامتگاه ساحلی اقیانوس',
    city: 'میامی',
    region: 'فلوریدا',
    country: 'آمریکا',
    price: 5_200_000,
    type: 'اقامتگاه',
    status: 'فهرست جدید',
    beds: 6,
    baths: 7,
    sqft: 7400,
    lot: '۰٫۹ ایکر',
    year: 2020,
    featured: true,
    summary: 'دسترسی مستقیم به ساحل، تراس اختصاصی روی ماسه و هفت‌هزار فوت مربع آرامش.',
    description: [
      'اقامتگاه ساحلی اقیانوس پشت باغی دیوارکشی‌شده و با دسترسی مستقیم به ساحل قرار دارد و به‌شکل زنجیره‌ای از پاویون‌ها سازمان یافته است. نشیمن، غذاخوری و آشپزخانه در یک حجم پیوسته جای گرفته‌اند که به تراس استخر باز می‌شود؛ دو ضلع جداگانه نیز اتاق‌های خانواده و مهمان را در خود دارد.',
      'متریال روشن و بادوام انتخاب شده — کف سنگ آهکی، نجاری چوب بلوط سفید و جزئیات برنزی — برای آنکه در نور دائمی دریا خوب کهنه شوند.',
    ],
    features: [
      'دسترسی مستقیم به ساحل با تراس خصوصی',
      'پلان پاویونی با ضلع‌های جداگانهٔ خواب',
      'کف سنگ آهکی و نجاری بلوط سفید در تمام خانه',
      'آشپزخانهٔ تابستانی و غذاخوری سرپوشیده کنار استخر',
      'شیشه‌های مقاوم و محافظت کامل در برابر طوفان',
    ],
    amenities: [
      'دسترسی به ساحل',
      'استخر و جکوزی',
      'آشپزخانهٔ تابستانی',
      'سوئیت کارکنان',
      'آسانسور',
      'باشگاه ورزشی',
      'پهلوگاه قایق',
      'ژنراتور',
    ],
    images: [
      { src: '/images/prop-oceanfront.webp', alt: 'خانهٔ ساحلی با استخر بی‌نهایت در غروب' },
      { src: '/images/gal-terrace.webp', alt: 'تراس سرپوشیده رو به آب' },
      { src: '/images/gal-living.webp', alt: 'نشیمن روشن با مبلمان کم‌رنگ' },
      { src: '/images/gal-bath.webp', alt: 'حمام سنگی با وان مستقل' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'modern-hillside-retreat',
    name: 'ییلاق مدرن روی تپه',
    city: 'لس‌آنجلس',
    region: 'کالیفرنیا',
    country: 'آمریکا',
    price: 3_750_000,
    type: 'ییلاق',
    status: 'برای فروش',
    beds: 4,
    baths: 4,
    sqft: 4050,
    lot: '۰٫۵ ایکر',
    year: 2018,
    featured: false,
    summary: 'خانه‌ای آرام روی تپه، با پوشش عمودی چوبی و نمای دره.',
    description: [
      'پرده‌ای از تیرهای چوبی عمودی، سمت خیابان ییلاق مدرن روی تپه را سایه می‌اندازد و خانه را خصوصی نگه می‌دارد، در حالی که نور را به عمق پلان هدایت می‌کند. در پشت، خانه کاملاً به سمت دره باز می‌شود و تراس استخر هم‌تراز با کف نشیمن اصلی قرار دارد.',
      'طبقهٔ بالا دو اتاق خواب و یک اتاق کار را در خود دارد؛ طبقهٔ پایین به اتاق رسانه اختصاص یافته که همزمان نقش سوئیت مهمان را هم ایفا می‌کند.',
    ],
    features: [
      'پردهٔ حریم خصوصی از تیرهای چوبی عمودی',
      'نمای کاملاً شیشه‌ای پشت به دره',
      'تراس استخر هم‌تراز با کف نشیمن',
      'اتاق رسانه / سوئیت مهمان با کاربری منعطف',
      'پارکینگ دو خودرو با ورودی مستقیم',
    ],
    amenities: [
      'نمای دره',
      'استخر',
      'اتاق رسانه',
      'اتاق کار',
      'آتشدان فضای باز',
      'گیاهان کم‌آب',
      'سیستم امنیتی',
      'فضای انبار',
    ],
    images: [
      { src: '/images/prop-hillside.webp', alt: 'خانهٔ تپه‌ای با نمای تیرهای چوبی و درخت' },
      { src: '/images/gal-architecture.webp', alt: 'جزئیات معماری خانهٔ تپه‌ای' },
      { src: '/images/gal-kitchen.webp', alt: 'آشپزخانهٔ مینیمال با کابینت توکار' },
      { src: '/images/gal-bedroom.webp', alt: 'اتاق خواب آرام با منسوجات خنثی' },
    ],
    agentId: 'sophia-bennett',
  },
  {
    id: 'palm-garden-residence',
    name: 'اقامتگاه باغ نخل',
    city: 'بورلی هیلز',
    region: 'کالیفرنیا',
    country: 'آمریکا',
    price: 6_400_000,
    type: 'عمارت',
    status: 'اختصاصی',
    beds: 6,
    baths: 8,
    sqft: 8300,
    lot: '۱٫۱ ایکر',
    year: 2023,
    featured: true,
    summary: 'عمارتی نوساز که حول باغی از نخل‌های کهنسال و استخری ۲۵ متری سامان یافته است.',
    description: [
      'اقامتگاه باغ نخل عمارتی نوساز و پشت دروازه است که طوری طراحی شده هر فضای اصلی، نخست باغ کهنسال را ببیند. خانه دور باغ می‌چرخد، نه روبه‌روی آن.',
      'استخری ۲۵ متری در طول نمای عقب کشیده شده و خانهٔ استخر، باشگاه و اقامتگاه مهمان به‌شکل نامحسوس زیر تراس اصلی جای گرفته‌اند.',
    ],
    features: [
      'استخر ۲۵ متری محصور با خانهٔ استخر',
      'فضاهای اصلی رو به باغ',
      'طبقهٔ زیرین با باشگاه، سینما و زیرزمین شراب',
      'اقامتگاه مهمان زیر تراس اصلی',
      'پارکینگ خارج از خیابان برای شش خودرو',
    ],
    amenities: [
      'استخر ۲۵ متری',
      'خانهٔ استخر',
      'باشگاه ورزشی',
      'سینما',
      'زیرزمین شراب',
      'اتاق کارکنان',
      'آسانسور',
      'دروازه‌بانی',
    ],
    images: [
      { src: '/images/prop-palm.webp', alt: 'ویلای سفید با استخر و نشیمن فضای باز' },
      { src: '/images/gal-living.webp', alt: 'نشیمن رو به باغ' },
      { src: '/images/gal-dining.webp', alt: 'اتاق غذاخوری رسمی با میز چوبی' },
      { src: '/images/gal-bath.webp', alt: 'حمام اصلی با سنگ روشن' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'contemporary-lake-house',
    name: 'خانهٔ مدرن کنار دریاچه',
    city: 'دریاچه تاهو',
    region: 'نوادا',
    country: 'آمریکا',
    price: 2_950_000,
    type: 'خانه',
    status: 'برای فروش',
    beds: 4,
    baths: 3,
    sqft: 3400,
    lot: '۰٫۷ ایکر',
    year: 2017,
    featured: false,
    summary: 'حجم‌های روی‌هم‌چیده از سنگ و سرو، فاصله‌ای کوتاه تا ساحل.',
    description: [
      'خانه از سه حجم روی‌هم‌چیده ساخته شده: سنگ در پایه برای زمستان، سرو در بالا برای گرما و طبقهٔ شیشه‌ای آخر که دریاچه را از میان کاج‌ها می‌گیرد.',
      'طبقهٔ نشیمن باز در میانهٔ پلان قرار دارد و تراس سرپوشیده، فصل استفاده را در دو طرف سال چند ماه طولانی‌تر می‌کند.',
    ],
    features: [
      'حجم‌های روی‌هم‌چیده از سنگ، سرو و شیشه',
      'تراس سرپوشیده با آتشدان فضای باز',
      'اتاق اسکی و فضای خشک‌کردن پوتین',
      'گرمایش از کف در تمام طبقهٔ همکف',
      'فضای نگهداری قایق و پارو',
    ],
    amenities: [
      'دسترسی به دریاچه',
      'آتشدان فضای باز',
      'اتاق اسکی',
      'گرمایش از کف',
      'پارکینگ دو خودرو',
      'اتاق خواب‌های دوطبقهٔ مهمان',
      'تراس',
      'بالکن انبار',
    ],
    images: [
      { src: '/images/prop-lakehouse.webp', alt: 'خانهٔ دریاچه با حجم‌های پله‌ای و استخر بازتابنده' },
      { src: '/images/gal-exterior.webp', alt: 'نمای بیرونی خانهٔ دریاچه در نور بعدازظهر' },
      { src: '/images/gal-living.webp', alt: 'نشیمن با سقف چوبی' },
      { src: '/images/gal-terrace.webp', alt: 'تراس سرپوشیده با صندلی' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'architectural-downtown-penthouse',
    name: 'پنت‌هاوس معماری مرکز شهر',
    city: 'آستین',
    region: 'تگزاس',
    country: 'آمریکا',
    price: 1_850_000,
    type: 'پنت‌هاوس',
    status: 'فهرست جدید',
    beds: 3,
    baths: 3,
    sqft: 2750,
    lot: '—',
    year: 2022,
    featured: false,
    summary: 'پنت‌هاوسی در کل یک طبقه، با شیشه‌های ۳۶۰ درجه بالای خط آسمان شهر.',
    description: [
      'پنت‌هاوسی در کل یک طبقه، در برجی شاخص در مرکز شهر، با فضای داخلی سنجیده از سوی معماران همان بنا: چوب روشن، فرورفتگی‌های عمیق و شیشه‌ای که تمام محیط را می‌پوشاند.',
      'نشیمن، آشپزخانه و غذاخوری یک حجم پیوسته با دو نورگیر را تشکیل می‌دهند؛ سوئیت اصلی پشت گالری پرده‌دار در سمت آرام‌تر پلان قرار گرفته است.',
    ],
    features: [
      'پلان تمام‌طبقه با شیشه‌های ۳۶۰ درجه',
      'دو ورودی آسانسور اختصاصی',
      'فضای داخلی طراح‌شده توسط معمار',
      'سایه‌بان موتوردار در تمام فضاها',
      'دو پارکینگ امن با انبار',
    ],
    amenities: [
      'خدمات باربری و نگهبانی',
      'استخر ساکنان',
      'باشگاه خصوصی',
      'انبار شراب',
      'تراس پشت‌بام',
      'سوئیت مهمان',
      'خانهٔ هوشمند',
      'فضای انبار',
    ],
    images: [
      { src: '/images/prop-penthouse.webp', alt: 'فضای نشیمن پنت‌هاوس با پنجره‌های سرتاسری' },
      { src: '/images/gal-lounge.webp', alt: 'نشیمن پنت‌هاوس' },
      { src: '/images/gal-kitchen.webp', alt: 'آشپزخانه با لوازم توکار' },
      { src: '/images/gal-architecture.webp', alt: 'جزئیات داخلی معماری' },
    ],
    agentId: 'sophia-bennett',
  },
]

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id)
}

export function getSimilarProperties(property: Property, count = 3): Property[] {
  const others = properties.filter((item) => item.id !== property.id)
  const sameCity = others.filter((item) => item.city === property.city)
  const rest = others.filter((item) => item.city !== property.city)
  return [...sameCity, ...rest].slice(0, count)
}

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

/** «۲٫۳۵ میلیون دلار» — the headline price, in Persian digits. */
export function formatPrice(price: number): string {
  return faPrice(price)
}

export function formatSqft(sqft: number): string {
  return faArea(sqft)
}

export function formatLot(lot: string): string {
  return lot
}

export function locationLabel(property: Pick<Property, 'city' | 'region' | 'country'>): string {
  return `${property.city}، ${property.region}، ${property.country}`
}

/** Compact meta row used on cards: «۴ خواب · ۴ حمام · ۳٬۶۵۰ فوت مربع». */
export function formatMeta(property: Pick<Property, 'beds' | 'baths' | 'sqft'>): string {
  return `${faInt(property.beds)} خواب · ${faInt(property.baths)} حمام · ${faArea(property.sqft)}`
}

/* ------------------------------------------------------------------ */
/* Discovery: filters + sorting                                        */
/* ------------------------------------------------------------------ */

export type SortKey = 'featured' | 'price-desc' | 'price-asc' | 'newest' | 'largest'

export interface PropertyFilters {
  query: string
  location: string
  type: string
  minPrice: number | null
  maxPrice: number | null
  beds: number | null
  baths: number | null
  sort: SortKey
  savedOnly: boolean
}

export const defaultFilters: PropertyFilters = {
  query: '',
  location: 'all',
  type: 'all',
  minPrice: null,
  maxPrice: null,
  beds: null,
  baths: null,
  sort: 'featured',
  savedOnly: false,
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'پیشنهادهای ویژه اول' },
  { value: 'price-desc', label: 'قیمت: از زیاد به کم' },
  { value: 'price-asc', label: 'قیمت: از کم به زیاد' },
  { value: 'newest', label: 'جدیدترین اول' },
  { value: 'largest', label: 'بزرگ‌ترین اول' },
]

export const priceOptions: { value: string; label: string; min: number; max: number | null }[] = [
  { value: 'any', label: 'همهٔ قیمت‌ها', min: 0, max: null },
  { value: 'under-2m', label: 'کمتر از ۲ میلیون دلار', min: 0, max: 2_000_000 },
  { value: '2m-3m', label: '۲ تا ۳ میلیون دلار', min: 2_000_000, max: 3_000_000 },
  { value: '3m-5m', label: '۳ تا ۵ میلیون دلار', min: 3_000_000, max: 5_000_000 },
  { value: '5m-plus', label: 'بیش از ۵ میلیون دلار', min: 5_000_000, max: null },
]

export const bedOptions: { value: string; label: string; min: number | null }[] = [
  { value: 'any', label: 'همه', min: null },
  { value: '2', label: '۲ خواب و بیشتر', min: 2 },
  { value: '3', label: '۳ خواب و بیشتر', min: 3 },
  { value: '4', label: '۴ خواب و بیشتر', min: 4 },
  { value: '5', label: '۵ خواب و بیشتر', min: 5 },
]

export const bathOptions: { value: string; label: string; min: number | null }[] = [
  { value: 'any', label: 'همه', min: null },
  { value: '2', label: '۲ حمام و بیشتر', min: 2 },
  { value: '3', label: '۳ حمام و بیشتر', min: 3 },
  { value: '4', label: '۴ حمام و بیشتر', min: 4 },
  { value: '5', label: '۵ حمام و بیشتر', min: 5 },
]

export function propertyTypes(): string[] {
  return Array.from(new Set(properties.map((property) => property.type))).sort()
}

export function propertyLocations(): { value: string; label: string }[] {
  const seen = new Map<string, string>()
  properties.forEach((property) => {
    const value = `${property.city}|${property.region}`
    if (!seen.has(value)) {
      seen.set(value, `${property.city}، ${property.region}`)
    }
  })
  return [{ value: 'all', label: 'همهٔ موقعیت‌ها' }, ...Array.from(seen, ([value, label]) => ({ value, label }))]
}

export function filterAndSortProperties(
  source: Property[],
  filters: PropertyFilters,
  savedIds: string[] = [],
): Property[] {
  const query = filters.query.trim().toLowerCase()

  const filtered = source.filter((property) => {
    if (filters.savedOnly && !savedIds.includes(property.id)) return false

    if (filters.location !== 'all') {
      const [city, region] = filters.location.split('|')
      if (property.city !== city || property.region !== region) return false
    }

    if (filters.type !== 'all' && property.type !== filters.type) return false
    if (filters.minPrice !== null && property.price < filters.minPrice) return false
    if (filters.maxPrice !== null && property.price > filters.maxPrice) return false
    if (filters.beds !== null && property.beds < filters.beds) return false
    if (filters.baths !== null && property.baths < filters.baths) return false

    if (query) {
      const haystack = [
        property.name,
        property.city,
        property.region,
        property.country,
        property.type,
        property.summary,
        ...property.features,
        ...property.amenities,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })

  const sorted = [...filtered]
  switch (filters.sort) {
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'newest':
      sorted.sort((a, b) => b.year - a.year)
      break
    case 'largest':
      sorted.sort((a, b) => b.sqft - a.sqft)
      break
    case 'featured':
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
      break
  }

  return sorted
}
