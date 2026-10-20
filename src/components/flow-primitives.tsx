import { ArrowDown, ArrowRight, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

// Shared node and connector primitives for the product flow diagrams (Soteria, Vault).

export type NodeDetail = { enters: string; happens: string; next: string };

export function Node({ title, text, tag, planned = false, emphasis = false, detail }: { title: string; text: string; tag?: string; planned?: boolean; emphasis?: boolean; detail?: NodeDetail }) {
  const cls = `sf-node${planned ? ' sf-planned' : ''}${emphasis ? ' sf-emphasis' : ''}${detail ? ' sf-interactive' : ''}`;
  if (!detail) {
    return <div className={cls}>{tag && <span className="sf-tag">{tag}</span>}<h4>{title}</h4><p>{text}</p></div>;
  }
  return (
    <details className={cls}>
      <summary>
        {tag && <span className="sf-tag">{tag}</span>}
        <h4>{title}<ChevronDown className="sf-chevron" size={16} aria-hidden="true" /></h4>
        <p>{text}</p>
      </summary>
      <dl className="sf-detail">
        <div><dt>What enters</dt><dd>{detail.enters}</dd></div>
        <div><dt>What happens</dt><dd>{detail.happens}</dd></div>
        <div><dt>What comes next</dt><dd>{detail.next}</dd></div>
      </dl>
    </details>
  );
}

export function Row({ children }: { children: ReactNode }) { return <div className="sf-row">{children}</div>; }
export function Arrow() { return <ArrowRight className="sf-arrow" size={22} aria-hidden="true" />; }
export function Down({ label }: { label: string }) { return <div className="sf-down"><ArrowDown size={22} aria-hidden="true" /><span>{label}</span></div>; }
export function Caption({ children }: { children: ReactNode }) { return <figcaption className="sf-caption">{children}</figcaption>; }
