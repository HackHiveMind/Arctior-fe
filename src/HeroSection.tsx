import React from 'react';
import HeroBg from './assets/5325936571951290133.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate pt-32 pb-16 px-8 md:px-20 overflow-hidden min-h-[720px] flex items-center bg-ark-purple">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBg}
          alt="Interior lux"
          className="w-full h-full object-cover object-right"
        />
        {/* Overlay mov pentru a aproxima design-ul din poză */}
        <div className="absolute inset-0 bg-gradient-to-r from-ark-purple via-ark-purple/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
          MOBILIER <span className="text-ark-gold font-semibold">CUSTOM.</span>
          <br />
          SPAȚII DEFINITORII.
        </h1>
        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-md leading-relaxed">
          Creăm interioare unice, adaptate stilului și nevoilor tale. Experimentați luxul autentic și calitatea fără compromis.
        </p>
        <button className="border-2 border-ark-gold text-ark-gold px-8 py-3 uppercase tracking-widest font-bold hover:bg-ark-gold hover:text-ark-purple transition duration-300">
          Descoperă Colecția
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
