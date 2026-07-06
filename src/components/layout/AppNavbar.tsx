import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import siteLogo from '../../assets/captura_152357.png';
import LanguageSelect from '../ui/LanguageSelect';
import { useLanguage } from '../../context/LanguageContext';

const AppNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-ark-gold/20 bg-ark-purple/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-10 lg:py-5">
      <div className="flex min-w-0 items-center gap-3">
        <img src={siteLogo} alt="Arktior logo" className="h-11 w-11 flex-shrink-0 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
        <div className="leading-tight">
          <p className="text-xl font-bold tracking-tight text-ark-gold sm:text-2xl lg:text-3xl">ARKTIOR</p>
          <p className="text-[10px] tracking-[0.12em] text-ark-gold/80 sm:text-xs sm:tracking-[0.15em]">FURNITURE &amp; DESIGN</p>
        </div>
      </div>

      <div className="hidden items-center gap-8 text-xs uppercase tracking-widest md:flex">
        <Link to="/" className="nav-link hover:text-ark-gold">{t('nav.home')}</Link>
        <a href="/#colectii" className="nav-link hover:text-ark-gold">{t('nav.collections')}</a>
        <a href="/#servicii" className="nav-link hover:text-ark-gold">{t('nav.services')}</a>
        <a href="/#contact" className="nav-link hover:text-ark-gold">{t('nav.contact')}</a>
        <LanguageSelect compact />
      </div>
      <button
        type="button"
        className="text-ark-gold md:hidden"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-label={isOpen ? 'Inchide meniul' : 'Deschide meniul'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div id="mobile-nav" className="absolute left-0 right-0 top-full border-b border-ark-gold/20 bg-ark-purple/95 shadow-2xl shadow-black/30 md:hidden">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6">
          <Link to="/" onClick={() => setIsOpen(false)} className="nav-link w-fit text-sm uppercase hover:text-ark-gold">{t('nav.home')}</Link>
          <a href="/#colectii" onClick={() => setIsOpen(false)} className="nav-link w-fit text-sm uppercase hover:text-ark-gold">{t('nav.collections')}</a>
          <a href="/#servicii" onClick={() => setIsOpen(false)} className="nav-link w-fit text-sm uppercase hover:text-ark-gold">{t('nav.services')}</a>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="nav-link w-fit text-sm uppercase hover:text-ark-gold">{t('nav.contact')}</a>
          <LanguageSelect />
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
