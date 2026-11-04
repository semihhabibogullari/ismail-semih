import React, { useEffect } from 'react';
import HeroSlider from '../components/HeroSlider.tsx';
import FeaturedList from '../components/FeaturedList.tsx';
import PodcastGrid from '../components/PodcastGrid.tsx';
import AISection from '../components/AISection.tsx';
import EventCalendar from '../components/EventCalendar.tsx';
import CourseCarousel from '../components/CourseCarousel.tsx';
import PressSection from '../components/PressSection.tsx';
import Newsletter from '../components/Newsletter.tsx';
import { useSite } from '../context/SiteContext.tsx';

export default function HomePage() {
  const { data } = useSite();

  useEffect(() => {
    if (data.general?.title) {
      document.title = `${data.general.title} — ${data.general.subtitle || 'Kişisel Marka & İçerik Üreticisi'}`;
    }
  }, [data.general]);

  const renderSection = (type: string, id: string) => {
    switch (type) {
      case 'hero':
        return <HeroSlider key={id} />;
      case 'featured':
        return <FeaturedList key={id} />;
      case 'podcast':
        return <PodcastGrid key={id} />;
      case 'ai':
        return <AISection key={id} />;
      case 'events':
        return <EventCalendar key={id} />;
      case 'courses':
        return <CourseCarousel key={id} />;
      case 'press':
        return <PressSection key={id} />;
      case 'newsletter':
        return <Newsletter key={id} />;
      default:
        return null;
    }
  };

  const sectionsToRender = data.sections?.filter((s: any) => s.visible) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {sectionsToRender.length > 0 ? (
        sectionsToRender.map((sec: any) => renderSection(sec.type, sec.id))
      ) : (
        <>
          <HeroSlider />
          <FeaturedList />
          <PodcastGrid />
          <AISection />
          <EventCalendar />
          <CourseCarousel />
          <PressSection />
          <Newsletter />
        </>
      )}
    </div>
  );
}
