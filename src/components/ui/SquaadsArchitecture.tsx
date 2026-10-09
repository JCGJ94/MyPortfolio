// Squaads Meeting Bot architecture: the shared FlowDiagram fed with the Squaads data.
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { squaadsFlow } from '@/data/diagrams';

export function SquaadsArchitecture({ label }: { label: string }) {
  return <FlowDiagram data={squaadsFlow} label={label} className="pv3-case__diagram" />;
}
