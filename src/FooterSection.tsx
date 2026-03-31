import React, { useState } from 'react';
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

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <input 
          type="text" 
          name="name"
          placeholder="Nume" 
          value={formData.name}
          onChange={handleChange}
          className="bg-transparent border border-ark-gold/30 p-3 text-sm focus:border-ark-gold outline-none text-white placeholder-white/40 transition"
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          className="bg-transparent border border-ark-gold/30 p-3 text-sm focus:border-ark-gold outline-none text-white placeholder-white/40 transition"
        />
      </div>
      <textarea 
        name="message"
        placeholder="Mesaj" 
        rows={3}
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-transparent border border-ark-gold/30 p-3 text-sm focus:border-ark-gold outline-none text-white placeholder-white/40 transition"
      ></textarea>
      <button type="submit" className="w-full bg-ark-gold text-ark-purple font-bold py-3 text-sm uppercase tracking-widest hover:bg-ark-gold/90 transition">
        Trimite
      </button>
    </form>
  );
};

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-ark-purple-light to-ark-purple py-16 px-8 border-t border-ark-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
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
          <ContactForm />
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
