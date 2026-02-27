'use client';

import { useEffect, useState } from 'react';

export function useSectionScroll(sectionIds: string[], offset: number = 0) {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            const pageYOffset = window.scrollY;
            let newActiveSection = sectionIds[0];

            for (const sectionId of sectionIds) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;

                    if (pageYOffset >= offsetTop - window.innerHeight / 2 - offset &&
                        pageYOffset < offsetTop + height - window.innerHeight / 2 - offset) {
                        newActiveSection = sectionId;
                    }
                }
            }

            setActiveSection(newActiveSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds, offset]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: 'smooth',
            });
        }
    };

    const scrollNext = () => {
        const currentIndex = sectionIds.indexOf(activeSection);
        if (currentIndex < sectionIds.length - 1) {
            scrollToSection(sectionIds[currentIndex + 1]);
        }
    };

    const scrollPrev = () => {
        const currentIndex = sectionIds.indexOf(activeSection);
        if (currentIndex > 0) {
            scrollToSection(sectionIds[currentIndex - 1]);
        }
    };

    return { activeSection, scrollToSection, scrollNext, scrollPrev, isFirst: activeSection === sectionIds[0], isLast: activeSection === sectionIds[sectionIds.length - 1] };
}
