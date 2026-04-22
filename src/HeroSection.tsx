import React from 'react';
import HeroBg from './assets/5325936571951290133.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-ark-purple px-4 pb-16 pt-28 sm:min-h-[680px] sm:px-6 lg:min-h-[720px] lg:px-8 xl:px-20">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBg}
          alt="Interior lux"
          className="h-full w-full object-cover object-[68%_center] sm:object-right"
        />
        {/* Overlay mov pentru a aproxima design-ul din poză */}
        <div className="absolute inset-0 bg-gradient-to-r from-ark-purple via-ark-purple/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-xl sm:max-w-2xl">
        <h1 className="mb-6 text-3xl font-light leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
          MOBILIER <span className="text-ark-gold font-semibold">CUSTOM.</span>
          <br />
          SPAȚII DEFINITORII.
        </h1>
        <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
          Creăm interioare unice, adaptate stilului și nevoilor tale. Experimentați luxul autentic și calitatea fără compromis.
        </p>
        <button className="inline-flex w-full items-center justify-center border-2 border-ark-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.25em] text-ark-gold transition duration-300 hover:bg-ark-gold hover:text-ark-purple sm:w-auto sm:px-8">
          Descoperă Colecția
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
