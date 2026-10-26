export interface Agent {
  id: string
  name: string
  role: string
  phone: string
  email: string
  photo: string
  /** Short positioning line shown on the team section and detail pages. */
  focus: string
  /** Years with Horizon Properties — used in the team card meta row. */
  years: string
}

export const agents: Agent[] = [
  {
    id: 'daniel-morgan',
    name: 'دنیل مورگان',
    role: 'مدیرعامل',
    phone: '(555) 246-7890',
    email: 'daniel.morgan@horizonproperties.com',
    photo: '/images/team-daniel.webp',
    focus: 'خانه‌های شاخص معماری و نمایندگی مشتریان خصوصی',
    years: '۱۸ سال',
  },
  {
    id: 'olivia-carter',
    name: 'اولیویا کارتر',
    role: 'مشاور املاک لوکس',
    phone: '(555) 246-7891',
    email: 'olivia.carter@horizonproperties.com',
    photo: '/images/team-olivia.webp',
    focus: 'اقامتگاه‌های ساحلی و خریداران بین‌المللی',
    years: '۱۲ سال',
  },
  {
    id: 'james-wilson',
    name: 'جیمز ویلسون',
    role: 'مشاور سرمایه‌گذاری',
    phone: '(555) 246-7892',
    email: 'james.wilson@horizonproperties.com',
    photo: '/images/team-james.webp',
    focus: 'راهبرد پرتفوی و دارایی‌های درآمدزا',
    years: '۱۵ سال',
  },
  {
    id: 'sophia-bennett',
    name: 'سوفیا بنت',
    role: 'متخصص ارشد املاک',
    phone: '(555) 246-7893',
    email: 'sophia.bennett@horizonproperties.com',
    photo: '/images/team-sophia.webp',
    focus: 'پروژه‌های نوساز و جابه‌جایی',
    years: '۹ سال',
  },
]

export const team = agents

export function getAgentById(id: string): Agent {
  return agents.find((agent) => agent.id === id) ?? agents[0]
}
