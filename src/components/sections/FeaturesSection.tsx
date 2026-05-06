import React from 'react';
import DesignIcon from '../../assets/captura_151610.png';
import MaterialIcon from '../../assets/captura_151639.png';
import MasteryIcon from '../../assets/captura_151722.png';
import FeatureDeskImage from '../../assets/Captură de ecran 2026-03-31 122033.png';
import { useLanguage } from '../../context/LanguageContext';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border border-ark-gold/30 text-ark-gold sm:h-14 sm:w-14">
      {icon}
    </div>
    <div>
      <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-white sm:text-base md:text-lg">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: (
        <img src={DesignIcon} alt="Design personalizat" className="w-9 h-9 object-contain" />
      ),
      title: t('features.design.title'),
      description: t('features.design.description')
    },
    {
      icon: (
        <img src={MaterialIcon} alt="Materiale premium" className="w-9 h-9 object-contain" />
      ),
      title: t('features.materials.title'),
      description: t('features.materials.description')
    },
    {
      icon: (
        <img src={MasteryIcon} alt="Execuție de maestru" className="w-9 h-9 object-contain" />
      ),
      title: t('features.mastery.title'),
      description: t('features.mastery.description')
    }
  ];

  return (
    <section id="servicii" className="bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-sm border border-ark-gold/20 shadow-2xl shadow-black/30">
            <img
              src={FeatureDeskImage}
              alt="Birou personalizat"
              className="h-[260px] w-full object-cover sm:h-[320px] md:h-[360px]"
            />
          </div>
          <div className="space-y-6 sm:space-y-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
