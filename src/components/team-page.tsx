import { Link } from '@tanstack/react-router';
import { ArrowLeft, Linkedin } from 'lucide-react';
import { SiteHeader, SiteFooter, ContactBand } from '@/components/site-shell';
import { team, type TeamMember } from '@/lib/team';

// Headshots: drop files named <slug>.jpg|jpeg|png|webp into src/assets/team/. No code change needed.
const photos = import.meta.glob('/src/assets/team/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const photoFor = (slug: string) => Object.entries(photos).find(([path]) => path.split('/').pop()?.replace(/\.[^.]+$/, '') === slug)?.[1];
const initials = (name: string) => name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2);

function Portrait({ member }: { member: TeamMember }) {
  const src = photoFor(member.slug);
  return <div className="team-portrait">{src ? <img src={src} alt={`${member.name}, ${member.role}`} width={400} height={500} loading="lazy" /> : <div className="team-placeholder" role="img" aria-label={`Photo of ${member.name} to come`}><span>{initials(member.name)}</span></div>}</div>;
}

export function TeamPage() {
  return <><SiteHeader /><main>
    <section className="detail-hero"><div className="site-container"><Link to="/" className="back-link"><ArrowLeft size={15} />Grafinate Partners</Link><div className="eyebrow">Our team</div><h1>Operators who have built, run, and secured it.</h1><p>Grafinate Partners is led by three executives with decades in financial services, enterprise operations, and distributed storage. They bring the credibility to sit across the table from regulated enterprises and the technical depth to build what those enterprises need.</p></div></section>
    <section className="team-overview" aria-label="Leadership team"><div className="site-container team-overview-grid">{team.map(member => <a key={member.slug} href={`#${member.slug}`} className="team-chip"><span className="team-chip-initials" aria-hidden="true">{initials(member.name)}</span><span><strong>{member.name}</strong><small>{member.role}</small></span></a>)}</div></section>
    <section className="section site-container team-list">{team.map((member, index) => <article id={member.slug} className="team-member" key={member.slug}>
      <div className="team-side"><Portrait member={member} /><a className="team-linkedin" href={member.linkedin} target="_blank" rel="noreferrer noopener" aria-label={`${member.name} on LinkedIn (opens in a new tab)`}><Linkedin size={15} />LinkedIn</a></div>
      <div className="team-body">
        <div className="eyebrow">0{index + 1} / {member.role}</div>
        <h2>{member.name}</h2>
        <p className="team-tagline">{member.tagline}</p>
        <p className="team-summary">{member.summary}</p>
        <dl className="team-stats">{member.stats.map(stat => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}</dl>
        <h3 className="team-subhead">Career highlights</h3>
        <ul className="team-highlights">{member.highlights.map(item => <li key={item}>{item}</li>)}</ul>
        <div className="team-tags">{member.expertise.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>)}</section>
    <ContactBand />
  </main><SiteFooter /></>;
}
