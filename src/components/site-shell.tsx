import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import logoHorizontal from '@/assets/logo/grafinate-logo-horizontal.svg';
import logoWordmark from '@/assets/logo/grafinate-wordmark.svg';
import markWhite from '@/assets/logo/grafinate-mark-white.svg';

// Logos come straight from the Grafinate brand kit; never redraw, recolor or retype them.
// Horizontal lockup in the header (min 280px); below that width the guide steps down to the wordmark.
export function Brand({ className = '' }: { className?: string }) {
  return <Link to="/" className={`brand ${className}`} aria-label="Grafinate Partners home"><img className="brand-logo brand-logo--horizontal" src={logoHorizontal} alt="" width={300} height={49} /><img className="brand-logo brand-logo--wordmark" src={logoWordmark} alt="" width={150} height={17} /></Link>;
}

export function ContactButton({ label = 'Let’s talk', className = '' }: { label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  return <><Button variant="enterprise" size="lg" className={className} onClick={() => { setDownloaded(false); setOpen(true); }}>{label}<ArrowRight /></Button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-[calc(100%-32px)] sm:max-w-lg"><DialogHeader><DialogTitle>Start a conversation</DialogTitle><DialogDescription>Tell us where you want to go next.</DialogDescription></DialogHeader><form className="inquiry-form" onSubmit={(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `Grafinate Partners — Partnership inquiry\n\nName: ${data.get('name')}\nWork email: ${data.get('email')}\nCompany: ${data.get('company')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'grafinate-partnership-inquiry.txt'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setDownloaded(true);
  }}><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Company<input name="company" autoComplete="organization" required /></label><label>I’m interested in<select name="interest"><option>Technology channel programs</option><option>Soteria governance</option><option>Vault containment store</option><option>Technical alliances</option><option>Other opportunities</option></select></label><label>What are you looking to achieve?<textarea name="message" rows={3} required /></label><p className="form-note">Direct contact details are coming soon. Download your inquiry to share with your Grafinate contact. This form does not send your information.</p><Button type="submit" variant="enterprise"><Download />Download inquiry</Button>{downloaded && <p className="form-note" role="status">Your inquiry is ready. No information has been sent.</p>}</form></DialogContent></Dialog></>;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = <><Link to="/" hash="expertise" className="nav-link" onClick={() => setMenuOpen(false)}>Our expertise</Link><Link to="/soteria" className="nav-link" onClick={() => setMenuOpen(false)}>Soteria <span className="text-primary">↗</span></Link><Link to="/vault" className="nav-link" onClick={() => setMenuOpen(false)}>Vault <span className="text-primary">↗</span></Link><Link to="/" hash="markets" className="nav-link" onClick={() => setMenuOpen(false)}>Who we serve</Link><Link to="/team" className="nav-link" onClick={() => setMenuOpen(false)}>Team</Link><Link to="/" hash="about" className="nav-link" onClick={() => setMenuOpen(false)}>About us</Link></>;
  return <header className="site-header"><div className="site-container header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{nav}</nav><ContactButton className="header-cta" /><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{nav}<ContactButton /></nav>}</header>;
}

export function ContactBand({ eyebrow = 'A focused conversation', title = 'Your priorities. Our shared direction.', text = 'Let’s discuss your technology, governance, and partnership objectives.', label = 'Start a conversation' }: { eyebrow?: string; title?: string; text?: string; label?: string }) { return <section className="contact-band" id="contact"><div className="site-container contact-inner"><img className="contact-mark" src={markWhite} alt="" width={72} height={72} /><div className="contact-copy"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{text}</p></div><ContactButton className="contact-cta" label={label} /></div></section>; }
export function SiteFooter() { return <footer className="site-footer"><div className="site-container footer-inner"><div className="footer-brand"><Brand className="brand--footer" /><p className="footer-tagline">Data Governance | Resilience | Real-World Impact</p></div><span className="footer-note">© Copyright 2026 Grafinate Partners LLC. All rights reserved.</span><div className="footer-links"><Link to="/" hash="expertise">Our expertise</Link><Link to="/soteria">Soteria</Link><Link to="/vault">Vault</Link><Link to="/team">Team</Link><Link to="/" hash="contact">Contact</Link></div></div></footer>; }