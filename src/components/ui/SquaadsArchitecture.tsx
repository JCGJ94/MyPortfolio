'use client';

// Squaads Meeting Bot architecture: the shared FlowDiagram fed with the Squaads data in the selected language.
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { getFlow } from '@/data/content/diagrams.i18n';
import { useLanguage } from '@/context/LanguageContext';

export function SquaadsArchitecture({ label }: { label: string }) {
  const { language } = useLanguage();
  return <FlowDiagram data={getFlow('squaads-meeting-bot', language)} label={label} className="pv3-case__diagram" />;
}
