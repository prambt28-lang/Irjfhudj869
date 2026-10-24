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
    name: 'Daniel Morgan',
    role: 'Managing Director',
    phone: '(555) 246-7890',
    email: 'daniel.morgan@horizonproperties.com',
    photo: '/images/team-daniel.webp',
    focus: 'Architectural estates & private client representation',
    years: '18 years',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    phone: '(555) 246-7891',
    email: 'olivia.carter@horizonproperties.com',
    photo: '/images/team-olivia.webp',
    focus: 'Coastal residences & international buyers',
    years: '12 years',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    phone: '(555) 246-7892',
    email: 'james.wilson@horizonproperties.com',
    photo: '/images/team-james.webp',
    focus: 'Portfolio strategy & income-producing assets',
    years: '15 years',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    phone: '(555) 246-7893',
    email: 'sophia.bennett@horizonproperties.com',
    photo: '/images/team-sophia.webp',
    focus: 'New developments & relocation',
    years: '9 years',
  },
]

export const team = agents

export function getAgentById(id: string): Agent {
  return agents.find((agent) => agent.id === id) ?? agents[0]
}
