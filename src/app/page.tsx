import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';
import { Contact } from '@/components/sections/Contact';
import { JsonLd } from '@/components/layout/JsonLd';
import { ScrollControls } from '@/components/ui/ScrollControls';

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-between">
      <JsonLd />
      <div className="w-full">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </div>
      <ScrollControls />
    </main>
  );
}
