import React from 'react';
import HeroSectionEnhanced from '../components/sections/HeroSectionEnhanced';
import FeaturesSection from '../components/sections/FeaturesSection';
import PortfolioSection from '../components/sections/PortfolioSection';

const HomePage: React.FC = () => (
  <>
    <HeroSectionEnhanced />
    <FeaturesSection />
    <PortfolioSection />
  </>
);

export default HomePage;
