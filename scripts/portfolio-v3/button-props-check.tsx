import { IconOrbitButton } from "../../src/components/ui/IconOrbitButton";
import { MagneticPillButton } from "../../src/components/ui/MagneticPillButton";

const buttonClick = (event: React.MouseEvent<HTMLButtonElement>) => event.currentTarget.disabled;
const anchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.href;

export const iconButton = <IconOrbitButton icon="x" disabled type="submit" onClick={buttonClick} aria-pressed />;
export const iconEmptyHrefButton = <IconOrbitButton icon="x" href="" onClick={buttonClick} type="button" />;
export const iconLink = <IconOrbitButton icon="x" href="/projects" target="_blank" rel="noreferrer" onClick={anchorClick} download hrefLang="en" aria-label="Projects" />;
export const pillButton = <MagneticPillButton label="Projects" disabled type="button" onClick={buttonClick} />;
export const pillEmptyHrefButton = <MagneticPillButton label="Projects" href="" onClick={buttonClick} type="submit" />;
export const pillLink = <MagneticPillButton label="Projects" href="https://example.com" target="_blank" rel="noopener" onClick={anchorClick} download hrefLang="en" aria-label="External projects" />;

// @ts-expect-error Anchor click handlers receive HTMLAnchorElement, not HTMLButtonElement.
export const invalidIconLinkEvent = <IconOrbitButton icon="x" href="/projects" onClick={buttonClick} />;
// @ts-expect-error Disabled is a native button-only attribute, not a link prop.
export const invalidIconLinkDisabled = <IconOrbitButton icon="x" href="/projects" disabled />;
// @ts-expect-error Button click handlers receive HTMLButtonElement, not HTMLAnchorElement.
export const invalidPillButtonEvent = <MagneticPillButton label="Projects" onClick={anchorClick} />;
// @ts-expect-error Disabled is a native button-only attribute, not a link prop.
export const invalidPillLinkDisabled = <MagneticPillButton label="Projects" href="/projects" disabled />;
