import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 flex items-center justify-between px-10 py-5 border-b border-ark-gold/20 bg-ark-purple/90 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/captura_152357.png"
            alt="ARKTIOR Furniture & Design"
            className="h-14 w-auto object-contain"
          />
          <div className="leading-tight">
            <p className="text-3xl font-bold tracking-tight text-ark-gold">ARKTIOR</p>
            <p className="text-xs tracking-[0.15em] text-ark-gold/80">FURNITURE &amp; DESIGN</p>
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest">
        <a href="#" className="hover:text-ark-gold transition">Acasă</a>
        <a href="#" className="hover:text-ark-gold transition">Despre Noi</a>
        <a href="#" className="hover:text-ark-gold transition">Colecții</a>
        <a href="#" className="hover:text-ark-gold transition">Servicii</a>
        <a href="#" className="hover:text-ark-gold transition">Contact</a>
      </div>

      <div className="hidden md:block">
        <button className="bg-ark-gold text-ark-purple px-6 py-2 font-bold text-xs uppercase rounded-md hover:bg-opacity-90 transition">
          Contactează-ne
        </button>
      </div>

      <button 
        className="md:hidden text-ark-gold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-ark-purple border-b border-ark-gold/20 md:hidden">
          <div className="flex flex-col gap-4 px-8 py-4">
            <a href="#" className="hover:text-ark-gold transition uppercase text-sm">Acasă</a>
            <a href="#" className="hover:text-ark-gold transition uppercase text-sm">Despre Noi</a>
            <a href="#" className="hover:text-ark-gold transition uppercase text-sm">Colecții</a>
            <a href="#" className="hover:text-ark-gold transition uppercase text-sm">Servicii</a>
            <a href="#" className="hover:text-ark-gold transition uppercase text-sm">Contact</a>
            <button className="bg-ark-gold text-ark-purple px-6 py-2 font-bold uppercase rounded-md">
              Contactează-ne
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
