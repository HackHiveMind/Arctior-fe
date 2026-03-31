import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories
const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

[srcDir, componentsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created ${path.relative(__dirname, dir)}`);
  }
});

// Create component files
const components = {
  'Navbar.tsx': `import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="text-3xl font-bold tracking-tighter text-ark-gold italic">ARKTIOR</div>
      </div>
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        <a href="#" className="hover:text-ark-gold transition">Acasă</a>
        <a href="#" className="hover:text-ark-gold transition">Despre Noi</a>
        <a href="#" className="hover:text-ark-gold transition">Colecții</a>
        <a href="#" className="hover:text-ark-gold transition">Contact</a>
      </div>
      <button className="bg-ark-gold text-ark-purple px-6 py-2 font-bold hover:bg-opacity-90 transition">
        Contactează-ne
      </button>
    </nav>
  );
};

export default Navbar;`,

  'HeroSection.tsx': `import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[70vh] flex items-center px-8 md:px-20 overflow-hidden">
      <div className="z-10 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-light mb-4">
          MOBILIER <span className="text-ark-gold font-bold">CUSTOM.</span><br />
          SPAȚII DEFINITORII.
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-md">
          Creăm interioare unice, adaptate stilului și nevoilor tale. Experimentați luxul autentic și calitatea fără compromis.
        </p>
        <button className="border-2 border-ark-gold text-ark-gold px-8 py-3 uppercase tracking-widest font-bold hover:bg-ark-gold hover:text-ark-purple transition">
          Descoperă Colecția
        </button>
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" 
          alt="Interior lux" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
    </section>
  );
};

export default HeroSection;`,

  'FeaturesSection.tsx': `import React from 'react';
import { PenTool, Trees, Star } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-ark-gold w-12 h-12 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 uppercase italic">{title}</h3>
    <p className="text-gray-400 text-sm italic leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <PenTool size={48} />,
      title: 'Design Personalizat',
      description: 'Proiectăm mobilier care se integrează perfect în spațiul tău, reflectând personalitatea și viziunea ta.'
    },
    {
      icon: <Trees size={48} />,
      title: 'Materiale Premium',
      description: 'Folosim doar lemn masiv, finisaje de lux și accesorii de ultimă generație pentru durabilitate.'
    },
    {
      icon: <Star size={48} />,
      title: 'Execuție de Maestru',
      description: 'Fiecare piesă este lucrată cu atenție milimetrică la detalii de către artizani cu experiență.'
    }
  ];

  return (
    <section className="py-20 px-8 bg-ark-purple-light/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {features.map((feature, idx) => (
          <div key={idx} className={idx === 1 ? 'border-x border-white/10 px-4' : ''}>
            <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;`,

  'PortfolioSection.tsx': `import React from 'react';

interface ProductCardProps {
  title: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image }) => (
  <div className="group relative overflow-hidden rounded-lg cursor-pointer">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
    />
    <div className="absolute inset-0 bg-black/40 flex items-end p-4">
      <h3 className="text-white text-xl font-medium border-b-2 border-ark-gold inline-block">
        {title}
      </h3>
    </div>
  </div>
);

const PortfolioSection: React.FC = () => {
  const categories = [
    { title: 'Living', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80' },
    { title: 'Dormitoare', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80' },
    { title: 'Canapele', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80' },
    { title: 'Birouri', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80' },
    { title: 'Bucătării', image: 'https://images.unsplash.com/photo-1556911223-e153e9b37293?auto=format&fit=crop&q=80' },
    { title: 'Dressinguri', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80' },
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light tracking-[0.2em] mb-4">PROIECTE DE EXCEPȚIE</h2>
        <div className="h-1 w-24 bg-ark-gold mx-auto"></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <ProductCard key={idx} title={cat.title} image={cat.image} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;`,

  'FooterSection.tsx': `import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="bg-ark-purple p-3 rounded-full text-ark-gold">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p>{value}</p>
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
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="text" 
          name="name"
          placeholder="Nume" 
          value={formData.name}
          onChange={handleChange}
          className="bg-ark-purple border border-white/10 p-3 focus:border-ark-gold outline-none text-white placeholder-gray-500"
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          className="bg-ark-purple border border-white/10 p-3 focus:border-ark-gold outline-none text-white placeholder-gray-500"
        />
      </div>
      <textarea 
        name="message"
        placeholder="Mesaj" 
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="w-full bg-ark-purple border border-white/10 p-3 focus:border-ark-gold outline-none text-white placeholder-gray-500"
      ></textarea>
      <button type="submit" className="w-full bg-ark-gold text-ark-purple font-bold py-3 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-opacity-90 transition">
        Trimite <Send size={18}/>
      </button>
    </form>
  );
};

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-ark-purple-light py-16 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-3xl font-light mb-8 italic">SĂ CREĂM ÎMPREUNĂ!</h2>
          <div className="space-y-6">
            <ContactInfo icon={<Phone size={20}/>} label="Telefon" value="+40 123 456 789" />
            <ContactInfo icon={<Mail size={20}/>} label="Email" value="info@arktiordesign.ro" />
            <ContactInfo icon={<MapPin size={20}/>} label="Adresă" value="Str. Exemplu Nr. 100, București" />
          </div>
        </div>
        <ContactForm />
      </div>
    </footer>
  );
};

export default FooterSection;`,

  'index.ts': `export { default as Navbar } from './Navbar';
export { default as HeroSection } from './HeroSection';
export { default as FeaturesSection } from './FeaturesSection';
export { default as PortfolioSection } from './PortfolioSection';
export { default as FooterSection } from './FooterSection';`
};

// Write component files
Object.entries(components).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(componentsDir, filename), content);
  console.log(`✓ Created components/${filename}`);
});

// Create main App.tsx
const appContent = `import React from 'react';
import './App.css';
import { Navbar, HeroSection, FeaturesSection, PortfolioSection, FooterSection } from './components';

function App() {
  return (
    <div className="min-h-screen bg-ark-purple text-white font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PortfolioSection />
      <FooterSection />
    </div>
  );
}

export default App;`;

fs.writeFileSync(path.join(srcDir, 'App.tsx'), appContent);
console.log('✓ Created App.tsx');

// Create App.css
fs.writeFileSync(path.join(srcDir, 'App.css'), '/* Custom App styles */\n');
console.log('✓ Created App.css');

// Create index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900;
  }

  h1 {
    @apply text-4xl font-bold;
  }

  h2 {
    @apply text-3xl font-bold;
  }
}

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors;
  }
}`;

fs.writeFileSync(path.join(srcDir, 'index.css'), indexCss);
console.log('✓ Created index.css');

// Create main.tsx
const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

fs.writeFileSync(path.join(srcDir, 'main.tsx'), mainContent);
console.log('✓ Created main.tsx');

console.log('\n✅ All files created successfully!');
console.log('\nNext steps:');
console.log('1. Delete old component files from src/ root (if they exist)');
console.log('2. Run: npm run dev');
