import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from './categoryData';

interface ProductCardProps {
  slug: string;
  title: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ slug, title, image }) => (
  <Link to={`/categorie/${slug}`} className="block group relative overflow-hidden cursor-pointer h-56 md:h-64 lg:h-72">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-ark-purple/90 via-ark-purple/35 to-transparent flex items-end p-5 md:p-6">
      <h3 className="text-ark-gold text-lg md:text-2xl font-light uppercase tracking-widest border-b border-ark-gold/70 pb-2">
        {title}
      </h3>
    </div>
  </Link>
);

const PortfolioSection: React.FC = () => {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-ark-purple-light to-ark-purple">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-widest mb-4 text-white">PROIECTE DE EXCEPȚIE</h2>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Descoperă portofoliul nostru de mobilier personalizat, realizat cu atenție la detalii și finisaje impecabile. Veți mobiliile în care creați și împreună proiectez spații care vorbesc despre dumneavoastră.
          </p>
          <div className="h-1 w-28 bg-ark-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <ProductCard key={idx} slug={cat.slug} title={cat.title} image={cat.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
