// app/page.tsx - UPDATED (с инициализацией темы)
'use client';

import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { DemosSection } from '@/components/sections/DemosSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { useAppStore } from '@/store/useAppStore';

export default function HomePage() {
  const { setActiveSection, initializeTheme } = useAppStore();

  useEffect(() => {
    // Инициализируем тему
    initializeTheme();

    // Intersection Observer для активной секции
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [setActiveSection, initializeTheme]);

  return (
    <Layout>
      <HeroSection />
      <ProblemsSection />
      <DemosSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </Layout>
  );
}