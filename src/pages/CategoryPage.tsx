import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  type Category,
  getApiErrorMessage,
  getCategoryBySlug,
} from '../api/api';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCategory = async () => {
      if (!slug) {
        setCategory(null);
        return;
      }

      setCategory(undefined);
      setErrorMessage('');

      try {
        const nextCategory = await getCategoryBySlug(slug);
        if (!isMounted) {
          return;
        }

        setCategory(nextCategory);
        setErrorMessage('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCategory(null);
        setErrorMessage(getApiErrorMessage(error, 'Nu am putut incarca categoria.'));
      }
    };

    void loadCategory();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (category === undefined) {
    return null;
  }

  if (!category && errorMessage) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-block mb-8 text-ark-gold border border-ark-gold/40 px-4 py-2 rounded hover:bg-ark-gold hover:text-ark-purple transition"
          >
            Inapoi la categorii
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-rose-300 mb-3">Eroare</p>
          <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">Categoria nu a putut fi incarcata</h1>
          <p className="text-gray-200">{errorMessage}</p>
        </div>
      </section>
    );
  }

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-block mb-8 text-ark-gold border border-ark-gold/40 px-4 py-2 rounded hover:bg-ark-gold hover:text-ark-purple transition"
        >
          Inapoi la categorii
        </Link>

        <div className="overflow-hidden rounded-sm border border-ark-gold/20 shadow-2xl shadow-black/30 mb-8">
          <img src={category.image} alt={category.title} className="h-64 w-full object-cover sm:h-[340px] md:h-[480px]" />
        </div>

        <h1 className="mb-4 break-words text-3xl text-ark-gold sm:text-4xl md:text-6xl">{category.title}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">{category.description}</p>
        {errorMessage && <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>}

        <div className="mt-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80">Produse</p>
            <h2 className="mt-2 text-2xl text-ark-gold sm:text-3xl">Produse din categorie</h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {(category.articles ?? []).map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl border border-ark-gold/20 bg-black/20 shadow-2xl shadow-black/20"
              >
                <img src={article.image} alt={article.title} className="h-56 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-ark-gold/70 mb-2">{article.slug}</p>
                  <h3 className="mb-3 text-xl text-ark-gold sm:text-2xl">{article.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-200">{article.description}</p>
                </div>
              </article>
            ))}
          </div>

          {(category.articles ?? []).length === 0 && (
            <p className="mt-8 text-sm text-gray-300">Nu exista produse in aceasta categorie momentan.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
