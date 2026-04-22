import React from 'react';
import { Phone, Mail, MapPin, Globe, MessageCircle, Send } from 'lucide-react';

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="text-ark-gold mt-1">{icon}</div>
    <div>
      <p className="text-xs text-ark-gold/90 uppercase tracking-widest">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  </div>
);

const FooterSection: React.FC = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-ark-purple-light to-ark-purple py-16 px-8 border-t border-ark-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex justify-end">
            <h2 className="text-2xl md:text-3xl font-light mb-8 italic tracking-wide">SĂ CREĂM ÎMPREUNĂ!</h2>
            <div className="space-y-4">
              <ContactInfo 
                icon={<Phone size={18}/>} 
                label="Telefon" 
                value="+40 123 456 789" 
              />
              <ContactInfo 
                icon={<Mail size={18}/>} 
                label="Email" 
                value="info@arktiordesign.ro" 
              />
              <ContactInfo 
                icon={<MapPin size={18}/>} 
                label="Adresă" 
                value="Str. Exemplu Nr. 100, București, Sector 1" 
              />
            </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2024 ARKTIOR Design. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-ark-gold transition">
              <Globe size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-ark-gold transition">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-ark-gold transition">
              <Send size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
