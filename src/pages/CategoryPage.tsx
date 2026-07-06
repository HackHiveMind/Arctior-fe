import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  type Category,
  getApiErrorMessage,
  getCategoryBySlug,
} from '../api/api';
import { useLanguage } from '../context/LanguageContext';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { languageCode, t } = useLanguage();
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
        const nextCategory = await getCategoryBySlug(slug, languageCode);
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
        setErrorMessage(getApiErrorMessage(error, t('category.errorFallback')));
      }
    };

    void loadCategory();

    return () => {
      isMounted = false;
    };
  }, [slug, languageCode, t]);

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
            {t('category.back')}
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-rose-300 mb-3">{t('category.error')}</p>
          <h1 className="mb-4 text-3xl text-ark-gold sm:text-4xl md:text-5xl">{t('category.errorTitle')}</h1>
          <p className="text-gray-200">{errorMessage}</p>
        </div>
      </section>
    );
  }

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const articles = category.articles ?? [];

  return (
    <section className="min-h-screen bg-gradient-to-b from-ark-purple to-ark-purple-light px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-block mb-8 text-ark-gold border border-ark-gold/40 px-4 py-2 rounded hover:bg-ark-gold hover:text-ark-purple transition"
        >
          {t('category.back')}
        </Link>

        <div className="overflow-hidden rounded-sm border border-ark-gold/20 shadow-2xl shadow-black/30 mb-8">
          <img src={category.image} alt={category.title} width={1200} height={640} decoding="async" className="h-64 w-full object-cover sm:h-[340px] md:h-[480px]" />
        </div>

        <h1 className="mb-4 break-words text-3xl text-ark-gold sm:text-4xl md:text-6xl">{category.title}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">{category.description}</p>
        {errorMessage && <p className="mt-6 text-sm text-rose-300">{errorMessage}</p>}

        <div className="mt-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80">{t('category.products')}</p>
            <h2 className="mt-2 text-2xl text-ark-gold sm:text-3xl">{t('category.productsTitle')}</h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl border border-ark-gold/20 bg-black/20 shadow-2xl shadow-black/20"
              >
                <img src={article.image} alt="" width={480} height={320} loading="lazy" decoding="async" className="h-64 w-full object-cover sm:h-72" />
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="mt-8 text-sm text-gray-300">{t('category.empty')}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
