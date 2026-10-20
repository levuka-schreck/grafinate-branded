export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  summary: string;
  stats: { value: string; label: string }[];
  highlights: string[];
  expertise: string[];
  linkedin: string;
};

export const team: TeamMember[] = [
  {
    slug: 'carlos-recalde',
    name: 'Carlos Recalde',
    role: 'Chief Executive Officer',
    tagline: 'Built the standard financial institutions use to survive a severe cyber outage.',
    summary: 'Carlos led Sheltered Harbor for ten years, an industry consortium whose standards help banks and brokerages protect consumer accounts and recover from a severe cyber outage. Before that he held technology leadership roles at SunGard, Barclays Capital, Lehman Brothers and KPMG. He is a serial entrepreneur whose current work joins AI risk, post-quantum readiness, and cyber resilience.',
    stats: [
      { value: '10 yrs', label: 'Led Sheltered Harbor as President & CEO' },
      { value: '30+', label: 'Banks, brokerages and associations on its board' },
      { value: '40+ yrs', label: 'Building and running technology organizations' },
    ],
    highlights: [
      'President & CEO, Sheltered Harbor (2016–2026): developed the standards covering data formats, encryption, operational change and an adherence framework.',
      'Global CTO, SunGard Asset Management: led 1,200 technology staff across 31 products and helped shift the business from acquisition-led to organic growth.',
      'Director of Enterprise Architecture, Barclays Capital: chaired a federation of senior architects across the bank, working with its Global CIO.',
      'Executive Director of Technology, KPMG Americas; named one of Computerworld’s Premier 100 IT Executives for 2004.',
    ],
    expertise: ['Cyber resilience', 'Post-quantum cryptography', 'AI governance', 'Financial services', 'Fundraising'],
    linkedin: 'https://www.linkedin.com/in/crecalde',
  },
  {
    slug: 'bill-schreckenstein',
    name: 'Bill Schreckenstein',
    role: 'Chief Technology Officer',
    tagline: 'Storage engineer turned web3 builder, with a record of putting new infrastructure in front of customers.',
    summary: 'Bill has more than 25 years in IT across engineering, solutions architecture and technical sales. He began in embedded and systems software at Lockheed Martin, moved into storage with Amplidata, HGST and Cloudian, and then into distributed storage with the Filecoin Foundation and Protocol Labs, where he managed the Outercore engineering team. He architects and builds Soteria and the vault.',
    stats: [
      { value: '25+ yrs', label: 'In IT, from embedded software to web3' },
      { value: '13 yrs', label: 'Engineering at Lockheed Martin Aeronautics' },
      { value: '1st', label: 'Veeam backup to Filecoin pilot, which he stewarded' },
    ],
    highlights: [
      'Manager, Outercore Engineering at Protocol Labs: led application development on Filecoin, the large-scale distributed storage network.',
      'Solutions Architect at the Filecoin Foundation, helping storage providers build businesses and showing clients what web3 storage can do.',
      'Systems Engineer at Cloudian, then Solutions Architect at HGST: proof-of-concept deployments and architectures for enterprise object storage.',
      'Co-Founder and CTO, Levuka Venture Lab. B.S. Computer Science, Syracuse University.',
    ],
    expertise: ['Distributed storage', 'Blockchain & smart contracts', 'Application development', 'Cyber security', 'Technical presentations'],
    linkedin: 'https://www.linkedin.com/in/billschreckenstein',
  },
  {
    slug: 'rich-van-duysen',
    name: 'Rich Van Duysen',
    role: 'President',
    tagline: 'Ran technology operations for a 60,000-person global firm. Now builds governance and partner programs.',
    summary: 'Rich is a business technology executive with more than 30 years leading global professional services and technology organizations. He spent 13 years at Marsh & McLennan Companies as Global Head of Infrastructure Operations and Vendor Integration, and since 2015 has run ClearSky Technology Partners, an advisory firm focused on AI governance, cyber resilience and partner program development.',
    stats: [
      { value: '30+ yrs', label: 'Leading global technology organizations' },
      { value: '$100M', label: 'In telecom sourcing savings over five years at Marsh & McLennan' },
      { value: '99.95%', label: 'Uptime across global conferencing, with 25% annual growth' },
    ],
    highlights: [
      'Founder & CEO, ClearSky Technology Partners (2015–present): advisory on AI governance, enterprise infrastructure, vendor assurance and channel partner programs.',
      'Global Head of Infrastructure Operations and Vendor Integration, Marsh & McLennan Companies: oversaw $400M+ in technology programs across 130+ countries.',
      'Earlier roles at KPMG, Prudential and Rydon Technologies, a consulting company he founded.',
    ],
    expertise: ['AI governance', 'Vendor management', 'Partner programs', 'Operational resilience', 'Contract structuring'],
    linkedin: 'https://www.linkedin.com/in/rich-van-duysen',
  },
];
