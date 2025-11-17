import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds = []) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;

        entries.forEach((entry) => {
          if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        });

        if (mostVisible && mostVisible.isIntersecting) {
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: 0.3,              
        rootMargin: '-20% 0px -40%' 
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [sectionIds]);

  return { activeSection, isScrolled };
}
