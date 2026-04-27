import type { ReactNode } from 'react';

export interface ExampleCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function ExampleCard({ title, description, actions }: ExampleCardProps) {
  return (
    <section aria-labelledby="example-card-title" className="example-card">
      <header className="example-card__header">
        <h2 id="example-card-title">{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>

      {actions ? <div className="example-card__actions">{actions}</div> : null}
    </section>
  );
}