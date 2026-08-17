import { Download, FileWarning } from 'lucide-react';
import { profile } from '../data/profile';
import { useResumeAvailability } from '../hooks/useSite';

interface ResumeButtonProps {
  variant?: 'solid' | 'outline';
  className?: string;
}

/**
 * The PDF lives at public/resume.pdf. Until it exists the control renders as a
 * disabled, clearly-labelled state rather than a dead link.
 */
export default function ResumeButton({ variant = 'outline', className = '' }: ResumeButtonProps) {
  const state = useResumeAvailability(profile.resumePath);

  const shape =
    'data-label inline-flex items-center gap-2 border px-5 py-3 transition-all duration-200';

  if (state === 'missing') {
    return (
      <span
        className={`${shape} cursor-not-allowed border-line-2 text-muted ${className}`}
        title="Add public/resume.pdf to enable this download"
      >
        <FileWarning size={14} strokeWidth={1.7} aria-hidden="true" />
        Résumé not uploaded
      </span>
    );
  }

  const style =
    variant === 'solid'
      ? 'border-cyan bg-cyan text-ink hover:bg-cyan/85'
      : 'border-line-2 text-fg-dim hover:border-cyan hover:text-cyan';

  return (
    <a
      href={profile.resumePath}
      download
      aria-busy={state === 'checking'}
      className={`${shape} ${style} ${state === 'checking' ? 'opacity-60' : ''} ${className}`}
    >
      <Download size={14} strokeWidth={1.7} aria-hidden="true" />
      Download résumé
    </a>
  );
}
