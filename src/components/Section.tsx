import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Tighter vertical rhythm for sections that continue a preceding one. */
  continued?: boolean;
}

export default function Section({ id, children, className = '', continued = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 px-5 sm:px-8 ${continued ? 'py-10 md:py-14' : 'py-16 md:py-24'} ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
