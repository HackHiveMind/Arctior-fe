import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Category, getApiErrorMessage, getCategories } from '../../api/api';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  slug: string;
  title: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ slug, title, image }) => (
  <Link to={`/categorie/${slug}`} className="group relative block h-56 cursor-pointer overflow-hidden sm:h-64 lg:h-72">
    <img
      src={image}
      alt={title}
      width={480}
      height={288}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ark-purple/90 via-ark-purple/35 to-transparent p-4 sm:p-5 md:p-6">
      <h3 className="border-b border-ark-gold/70 pb-2 text-base font-light uppercase tracking-[0.2em] text-ark-gold sm:text-lg md:text-2xl">
        {title}
      </h3>
    </div>
  </Link>
);

const SkeletonCard: React.FC = () => (
  <div className="relative h-56 overflow-hidden border border-ark-gold/10 bg-white/[0.03] sm:h-64 lg:h-72">
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
      <div className="h-6 w-3/4 bg-ark-gold/20 sm:h-7" />
    </div>
  </div>
);

const PortfolioSection: React.FC = () => {
  const { languageCode, t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories(languageCode);
        if (!isMounted) {
          return;
        }

        setCategories(response);
        setErrorMessage('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(getApiErrorMessage(error, t('portfolio.error')));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, [languageCode, t]);

  return (
    <section id="colectii" className="bg-gradient-to-b from-ark-purple-light to-ark-purple px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-widest mb-4 text-white">{t('portfolio.title')}</h2>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            {t('portfolio.description')}
          </p>
          <div className="mx-auto h-1 w-24 bg-ark-gold sm:w-28"></div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }, (_, idx) => (
              <SkeletonCard key={`skeleton-${idx}`} />
            ))}
          {categories.map((cat) => (
            <ProductCard key={cat.id || cat.slug} slug={cat.slug} title={cat.title} image={cat.image} />
          ))}
        </div>
        {errorMessage && <p className="mt-8 text-center text-sm text-rose-300">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default PortfolioSection;
