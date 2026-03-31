import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { categories } from './categoryData';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="pt-32 pb-20 px-8 md:px-20 bg-gradient-to-b from-ark-purple to-ark-purple-light min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-8 text-ark-gold border border-ark-gold/40 px-4 py-2 rounded hover:bg-ark-gold hover:text-ark-purple transition"
        >
          Inapoi la categorii
        </Link>

        <div className="overflow-hidden rounded-sm border border-ark-gold/20 shadow-2xl shadow-black/30 mb-8">
          <img src={category.image} alt={category.title} className="w-full h-[340px] md:h-[480px] object-cover" />
        </div>

        <h1 className="text-4xl md:text-6xl text-ark-gold mb-4">{category.title}</h1>
        <p className="text-gray-200 max-w-3xl text-base md:text-lg leading-relaxed">{category.description}</p>
      </div>
    </section>
  );
};

export default CategoryPage;
