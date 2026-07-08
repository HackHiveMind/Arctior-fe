import React from 'react';
import { Globe, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ContactQuestionForm from '../ui/ContactQuestionForm';

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-ark-gold">{icon}</div>
    <div className="min-w-0 break-words">
      <p className="text-xs uppercase tracking-widest text-ark-gold/90">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  </div>
);

const FooterSectionClean: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="border-t border-ark-gold/20 bg-gradient-to-b from-ark-purple-light to-ark-purple px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,520px)] lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ark-gold/80">{t('contactForm.eyebrow')}</p>
            <h2 className="text-3xl text-ark-gold sm:text-4xl">{t('contactForm.title')}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-200 sm:text-base">
              {t('contactForm.description')}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <ContactInfo icon={<Phone size={18} />} label={t('footer.phone')} value="+373 79 56 53 99" />
              <ContactInfo icon={<Mail size={18} />} label={t('footer.email')} value="arktior2025@gmail.com" />
              <div className="sm:col-span-2 lg:col-span-1">
                <ContactInfo
                  icon={<MapPin size={18} />}
                  label={t('footer.address')}
                  value={
                    <>
                      <span className="block">Moldova, Chișinău</span>
                      <span className="block">str. Hanul Morii nr.42</span>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl lg:ml-auto">
            <ContactQuestionForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-xs text-gray-400 md:text-left">
            © 2024 ARKTIOR Design. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="https://arctior.com" aria-label="Viziteaza site-ul Arctior" className="text-gray-300 transition hover:text-ark-gold">
              <Globe size={18} aria-hidden="true" />
            </a>
            <a href="tel:+37379565399" aria-label="Suna la Arctior" className="text-gray-300 transition hover:text-ark-gold">
              <MessageCircle size={18} aria-hidden="true" />
            </a>
            <a href="mailto:arktior2025@gmail.com" aria-label="Trimite email catre Arctior" className="text-gray-300 transition hover:text-ark-gold">
              <Send size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSectionClean;
