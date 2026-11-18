import React from 'react';
import Hero from '../components/Hero';
import CorePillars from '../components/CorePillars';
import WhyChooseRkps from '../components/WhyChooseRkps';
import LearningStages from '../components/LearningStages';
import BeyondClassroom from '../components/BeyondClassroom';
import PreparedForFuture from '../components/PreparedForFuture';
import LifeAtRkps from '../components/LifeAtRkps';
import ComeAndSeeCta from '../components/ComeAndSeeCta';

export default function HomePage({ onNavigateAction, onOpenAdmission, onOpenVisit }) {
  const scrollToStages = () => {
    const el = document.getElementById('stages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        onNavigateAction={onNavigateAction}
        onScrollToStages={scrollToStages}
      />
      <CorePillars />
      <WhyChooseRkps />
      <LearningStages onOpenAdmission={onOpenAdmission} />
      <BeyondClassroom onNavigateAction={onNavigateAction} />
      <PreparedForFuture />
      <LifeAtRkps />
      <ComeAndSeeCta
        onOpenAdmission={onOpenAdmission}
        onOpenVisit={onOpenVisit}
      />
    </>
  );
}
