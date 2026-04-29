import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroBg from '../../assets/5325936571951290133.jpg';

const HeroSectionEnhanced: React.FC = () => {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-ark-purple px-4 pb-16 pt-28 sm:min-h-[680px] sm:px-6 lg:min-h-[720px] lg:px-8 xl:px-20">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBg}
          alt="Interior lux"
          className="h-full w-full object-cover object-[68%_center] sm:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ark-purple via-ark-purple/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-xl sm:max-w-2xl">
        <h1 className="mb-6 text-3xl font-light leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
          MOBILIER <span className="font-semibold text-ark-gold">CUSTOM.</span>
          <br />
          SPATII DEFINITORII.
        </h1>
        <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
          Cream interioare unice, adaptate stilului si nevoilor tale. Experimenteaza luxul autentic si
          calitatea fara compromis.
        </p>
        <a
          href="#colectii"
          className="group inline-flex w-full items-center justify-center gap-3 border border-ark-gold/80 bg-ark-purple/20 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.25em] text-ark-gold shadow-[0_0_0_1px_rgba(193,154,107,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-ark-gold hover:bg-ark-gold hover:text-ark-purple hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)] sm:w-auto sm:px-8"
        >
          <span>Descopera colectia</span>
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
};

export default HeroSectionEnhanced;
