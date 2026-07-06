import React from 'react';
import { Globe, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <div className="mb-6 flex w-full max-w-sm items-start justify-center gap-4 text-center md:ml-auto md:w-fit md:max-w-full md:flex-row-reverse md:justify-end md:text-right">
    <div className="mt-1 text-ark-gold">{icon}</div>
    <div className="break-words text-center md:text-right">
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
        <div className="mb-12 flex justify-center md:mb-16 md:justify-end">
          <div className="flex w-full max-w-xl flex-col items-center md:ml-auto md:w-fit md:max-w-full md:items-end">
            <h2 className="mb-8 text-center text-2xl font-light italic tracking-wide md:text-right md:text-3xl">
              {t('footer.cta')}
            </h2>
            <div className="flex w-full flex-col items-center md:w-fit md:items-end">
              <ContactInfo icon={<Phone size={18} />} label={t('footer.phone')} value="+373 79 56 53 99" />
              <ContactInfo icon={<Mail size={18} />} label={t('footer.email')} value="arktior2025@gmail.com" />
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
