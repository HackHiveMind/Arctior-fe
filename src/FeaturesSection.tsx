import React from 'react';
import DesignIcon from './assets/captura_151610.png';
import MaterialIcon from './assets/captura_151639.png';
import MasteryIcon from './assets/captura_151722.png';
import FeatureDeskImage from './assets/Captură de ecran 2026-03-31 122033.png';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex gap-4">
    <div className="text-ark-gold flex-shrink-0 w-14 h-14 rounded-md border border-ark-gold/30 flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h3 className="text-white text-base md:text-lg font-bold mb-2 uppercase tracking-widest">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: (
        <img src={DesignIcon} alt="Design personalizat" className="w-9 h-9 object-contain" />
      ),
      title: 'Design Personalizat',
      description: 'Proiectăm mobilier care se integrează perfect în spațiul tău, reflectând personalitatea și viziunea ta.'
    },
    {
      icon: (
        <img src={MaterialIcon} alt="Materiale premium" className="w-9 h-9 object-contain" />
      ),
      title: 'Materiale Premium',
      description: 'Folosim doar lemn masiv, finisaje de lux și accesorii de ultimă generație pentru durabilitate.'
    },
    {
      icon: (
        <img src={MasteryIcon} alt="Execuție de maestru" className="w-9 h-9 object-contain" />
      ),
      title: 'Execuție de Maestru',
      description: 'Fiecare piesă este lucrată cu atenție milimetrică la detalii de către artizani cu experiență.'
    }
  ];

  return (
    <section className="py-16 md:py-20 px-8 bg-gradient-to-b from-ark-purple to-ark-purple-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="overflow-hidden rounded-sm border border-ark-gold/20 shadow-2xl shadow-black/30">
            <img
              src={FeatureDeskImage}
              alt="Birou personalizat"
              className="w-full h-[320px] md:h-[360px] object-cover"
            />
          </div>
          <div className="space-y-8">
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
