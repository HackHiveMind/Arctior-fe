import React, { useEffect, useState } from 'react';
import { type Article, type Category, createArticle, deleteArticle, getApiErrorMessage, getCategories, getCategoryBySlug, isUnauthorizedError, updateArticle, updateCategory, uploadImage } from '../api/api';
import { useAdmin } from './AdminContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelect from '../components/ui/LanguageSelect';

function getTranslationDraft(record: Category | Article, languageCode: string) {
  return record.translations?.[languageCode] ?? { title: '', description: '' };
}

const AdminDashboard: React.FC = () => {
  const { token, logout, user } = useAdmin();
  const { showToast } = useToast();
  const { languages, languageCode: siteLanguageCode } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryQuery, setCategoryQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');
  const [editorLanguageCode, setEditorLanguageCode] = useState(siteLanguageCode);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [listErrorMessage, setListErrorMessage] = useState('');
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('');
  const [categoryStatusMessage, setCategoryStatusMessage] = useState('');
  const [productErrorMessage, setProductErrorMessage] = useState('');
  const [productStatusMessage, setProductStatusMessage] = useState('');
  const [draftImage, setDraftImage] = useState('');
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null);
  const [categoryImagePreviewUrl, setCategoryImagePreviewUrl] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productSlug, setProductSlug] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreviewUrl, setProductImagePreviewUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState('');
  const [isProductFormVisible, setIsProductFormVisible] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isUploadingCategoryImage, setIsUploadingCategoryImage] = useState(false);
  const [isUploadingProductImage, setIsUploadingProductImage] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const isEditingProduct = selectedArticleSlug !== '';
  const selectedArticle =
    selectedCategory?.articles?.find((article) => article.slug === selectedArticleSlug) ?? null;
  const selectedCategoryTranslation = selectedCategory
    ? getTranslationDraft(selectedCategory, editorLanguageCode)
    : null;
  const selectedArticleTranslation = selectedArticle
    ? getTranslationDraft(selectedArticle, editorLanguageCode)
    : null;
  const hasCategoryDraftChanges = Boolean(
    selectedCategory &&
      (draftImage.trim() !== selectedCategory.image.trim() ||
        draftTitle.trim() !== (selectedCategoryTranslation?.title ?? '').trim() ||
        draftDescription.trim() !== (selectedCategoryTranslation?.description ?? '').trim() ||
        categoryImageFile),
  );
  const hasProductDraftChanges = isProductFormVisible
    ? isEditingProduct
      ? Boolean(
          selectedArticle &&
            (productTitle.trim() !== (selectedArticleTranslation?.title ?? '').trim() ||
              productSlug.trim() !== selectedArticle.slug.trim() ||
              productImage.trim() !== selectedArticle.image.trim() ||
              productDescription.trim() !== (selectedArticleTranslation?.description ?? '').trim() ||
              productImageFile),
        )
      : Boolean(
          productTitle.trim() ||
            productSlug.trim() ||
            productImage.trim() ||
            productDescription.trim() ||
            productImageFile,
        )
    : false;

  const filteredCategories = categories.filter((category) => {
    const normalizedQuery = categoryQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return true;
    }

    return (
      category.title.toLowerCase().includes(normalizedQuery) ||
      category.slug.toLowerCase().includes(normalizedQuery)
    );
  });

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoadingCategories(true);

      try {
        const response = await getCategories(editorLanguageCode);
        if (!isMounted) {
          return;
        }

        setCategories(response);
        setListErrorMessage('');
        setSelectedSlug((currentValue) => currentValue || response[0]?.slug || '');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setListErrorMessage(getApiErrorMessage(error, 'Nu am putut incarca categoriile.'));
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, [editorLanguageCode]);

  useEffect(() => {
    let isMounted = true;

    const loadCategory = async () => {
      if (!selectedSlug) {
        setSelectedCategory(null);
        return;
      }

      setIsLoadingCategory(true);

      try {
        const response = await getCategoryBySlug(selectedSlug, editorLanguageCode);
        if (!isMounted) {
          return;
        }

        setSelectedCategory(response);
        setDraftImage(response.image);
        setCategoryImageFile(null);
        setDraftTitle(getTranslationDraft(response, editorLanguageCode).title);
        setDraftDescription(getTranslationDraft(response, editorLanguageCode).description);
        setCategoryErrorMessage('');
        setCategoryStatusMessage('');
        setProductErrorMessage('');
        setProductStatusMessage('');
        setSelectedArticleSlug('');
        setIsProductFormVisible(false);
        setProductTitle('');
        setProductSlug('');
        setProductImage('');
        setProductImageFile(null);
        setProductDescription('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSelectedCategory(null);
        setCategoryErrorMessage(getApiErrorMessage(error, 'Nu am putut incarca detaliile categoriei.'));
      } finally {
        if (isMounted) {
          setIsLoadingCategory(false);
        }
      }
    };

    void loadCategory();

    return () => {
      isMounted = false;
    };
  }, [selectedSlug, editorLanguageCode]);

  useEffect(() => {
    if (!categoryImageFile) {
      setCategoryImagePreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(categoryImageFile);
    setCategoryImagePreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [categoryImageFile]);

  useEffect(() => {
    if (!productImageFile) {
      setProductImagePreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(productImageFile);
    setProductImagePreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [productImageFile]);

  useEffect(() => {
    if (!hasCategoryDraftChanges && !hasProductDraftChanges) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasCategoryDraftChanges, hasProductDraftChanges]);

  const confirmDiscardChanges = (scope: 'category' | 'product' | 'all') => {
    if (scope === 'category' && !hasCategoryDraftChanges) {
      return true;
    }

    if (scope === 'product' && !hasProductDraftChanges) {
      return true;
    }

    if (scope === 'all' && !hasCategoryDraftChanges && !hasProductDraftChanges) {
      return true;
    }

    return window.confirm('Ai modificari nesalvate. Vrei sa le pierzi?');
  };

  const resetProductDraft = () => {
    setSelectedArticleSlug('');
    setProductTitle('');
    setProductSlug('');
    setProductImage('');
    setProductImageFile(null);
    setProductImagePreviewUrl('');
    setProductDescription('');
    setProductErrorMessage('');
    setProductStatusMessage('');
  };

  const openNewProductForm = () => {
    if (!confirmDiscardChanges('product')) {
      return;
    }

    resetProductDraft();
    setIsProductFormVisible(true);
  };

  const closeProductForm = () => {
    if (!confirmDiscardChanges('product')) {
      return;
    }

    resetProductDraft();
    setIsProductFormVisible(false);
  };

  const startEditingProduct = (article: Article) => {
    if (selectedArticleSlug !== article.slug && !confirmDiscardChanges('product')) {
      return;
    }

    setSelectedArticleSlug(article.slug);
    setIsProductFormVisible(true);
    setProductTitle(getTranslationDraft(article, editorLanguageCode).title);
    setProductSlug(article.slug);
    setProductImage(article.image);
    setProductImageFile(null);
    setProductImagePreviewUrl('');
    setProductDescription(getTranslationDraft(article, editorLanguageCode).description);
    setProductErrorMessage('');
    setProductStatusMessage(`Editezi produsul "${article.title}".`);
  };

  const handleUnauthorized = (error: unknown) => {
    if (isUnauthorizedError(error)) {
      logout();
      return true;
    }

    return false;
  };

  const handleSelectCategory = (slug: string) => {
    if (slug === selectedSlug) {
      return;
    }

    if (!confirmDiscardChanges('all')) {
      return;
    }

    setSelectedSlug(slug);
  };

  const handleSaveCategory = async () => {
    if (!selectedCategory || !token) {
      logout();
      return;
    }

    const trimmedImage = draftImage.trim();
    const trimmedTitle = draftTitle.trim();
    const trimmedDescription = draftDescription.trim();

    if (!trimmedImage || !trimmedTitle || !trimmedDescription) {
      setCategoryErrorMessage('Completeaza imaginea, titlul si descrierea categoriei.');
      setCategoryStatusMessage('');
      return;
    }

    setIsSavingCategory(true);

    try {
      const updatedCategory = await updateCategory(
        selectedCategory.slug,
        {
          image: trimmedImage,
          translations: {
            [editorLanguageCode]: {
              title: trimmedTitle,
              description: trimmedDescription,
            },
          },
        },
        token,
      );

      setSelectedCategory((currentValue) =>
        currentValue
          ? {
              ...currentValue,
              image: updatedCategory.image,
              title: trimmedTitle,
              description: trimmedDescription,
              translations: {
                ...(currentValue.translations ?? {}),
                [editorLanguageCode]: {
                  title: trimmedTitle,
                  description: trimmedDescription,
                },
              },
              updatedAt: updatedCategory.updatedAt,
            }
          : currentValue,
      );
      setCategories((currentValue) =>
        currentValue.map((category) =>
          category.slug === selectedCategory.slug
            ? {
                ...category,
                image: updatedCategory.image,
                title: trimmedTitle,
                description: trimmedDescription,
                translations: {
                  ...(category.translations ?? {}),
                  [editorLanguageCode]: {
                    title: trimmedTitle,
                    description: trimmedDescription,
                  },
                },
              }
            : category,
        ),
      );
      setCategoryStatusMessage('Categoria a fost actualizata.');
      setCategoryErrorMessage('');
      showToast({
        variant: 'success',
        title: 'Categorie salvata',
        description: `Modificarile pentru ${selectedCategory.title} au fost salvate.`,
      });
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      const message = getApiErrorMessage(error, 'Nu am putut salva categoria.');
      setCategoryErrorMessage(message);
      setCategoryStatusMessage('');
      showToast({
        variant: 'error',
        title: 'Salvare esuata',
        description: message,
      });
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleCategoryImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCategoryImageFile(file);
    setCategoryStatusMessage('');
    setCategoryErrorMessage('');
  };

  const handleProductImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setProductImageFile(file);
    setProductStatusMessage('');
    setProductErrorMessage('');
  };

  const handleCategoryImageUpload = async () => {
    if (!token) {
      logout();
      return;
    }

    if (!categoryImageFile) {
      setCategoryErrorMessage('Selecteaza o imagine pentru categorie inainte de upload.');
      setCategoryStatusMessage('');
      return;
    }

    setIsUploadingCategoryImage(true);

    try {
      const uploadedUrl = await uploadImage(categoryImageFile, token);
      setDraftImage(uploadedUrl);
      setCategoryStatusMessage('Imaginea categoriei a fost incarcata.');
      setCategoryErrorMessage('');
      setCategoryImageFile(null);
      showToast({
        variant: 'success',
        title: 'Imagine incarcata',
        description: 'Imaginea categoriei a fost trimisa cu succes.',
      });
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      const message = getApiErrorMessage(error, 'Nu am putut incarca imaginea categoriei.');
      setCategoryErrorMessage(message);
      setCategoryStatusMessage('');
      showToast({
        variant: 'error',
        title: 'Upload esuat',
        description: message,
      });
    } finally {
      setIsUploadingCategoryImage(false);
    }
  };

  const handleProductImageUpload = async () => {
    if (!token) {
      logout();
      return;
    }

    if (!productImageFile) {
      setProductErrorMessage('Selecteaza o imagine pentru produs inainte de upload.');
      setProductStatusMessage('');
      return;
    }

    setIsUploadingProductImage(true);

    try {
      const uploadedUrl = await uploadImage(productImageFile, token);
      setProductImage(uploadedUrl);
      setProductStatusMessage('Imaginea produsului a fost incarcata.');
      setProductErrorMessage('');
      setProductImageFile(null);
      showToast({
        variant: 'success',
        title: 'Imagine produs incarcata',
        description: 'Imaginea produsului este gata pentru salvare.',
      });
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      const message = getApiErrorMessage(error, 'Nu am putut incarca imaginea produsului.');
      setProductErrorMessage(message);
      setProductStatusMessage('');
      showToast({
        variant: 'error',
        title: 'Upload produs esuat',
        description: message,
      });
    } finally {
      setIsUploadingProductImage(false);
    }
  };

  const handleSubmitProduct = async () => {
    if (!selectedCategory || !token) {
      logout();
      return;
    }

    const trimmedTitle = productTitle.trim();
    const trimmedSlug = productSlug.trim();
    const trimmedImage = productImage.trim();
    const trimmedDescription = productDescription.trim();

    if (!trimmedTitle || !trimmedImage || !trimmedDescription) {
      setProductErrorMessage('Completeaza title, image si description pentru produs.');
      setProductStatusMessage('');
      return;
    }

    setIsCreatingProduct(true);

    try {
      if (isEditingProduct) {
        const updatedArticle = await updateArticle(
          selectedArticleSlug,
          {
            image: trimmedImage,
            translations: {
              [editorLanguageCode]: {
                title: trimmedTitle,
                description: trimmedDescription,
              },
            },
          },
          token,
        );

        setSelectedCategory((currentValue) =>
          currentValue
            ? {
                ...currentValue,
                articles: (currentValue.articles ?? []).map((article) =>
                  article.slug === selectedArticleSlug
                    ? {
                        ...updatedArticle,
                        title: trimmedTitle,
                        description: trimmedDescription,
                        translations: {
                          ...(article.translations ?? {}),
                          [editorLanguageCode]: {
                            title: trimmedTitle,
                            description: trimmedDescription,
                          },
                        },
                      }
                    : article,
                ),
              }
            : currentValue,
        );
        setProductTitle(trimmedTitle);
        setProductSlug(updatedArticle.slug);
        setProductImage(updatedArticle.image);
        setProductDescription(trimmedDescription);
        setProductStatusMessage('Produsul a fost actualizat.');
        setProductErrorMessage('');
        showToast({
          variant: 'success',
          title: 'Produs actualizat',
          description: `Modificarile pentru ${updatedArticle.title} au fost salvate.`,
        });
      } else {
        const createdArticle = await createArticle(
          selectedCategory.slug,
          {
            image: trimmedImage,
            translations: {
              [editorLanguageCode]: {
                title: trimmedTitle,
                description: trimmedDescription,
              },
            },
            slug: trimmedSlug || undefined,
          },
          token,
        );

        setSelectedCategory((currentValue) =>
          currentValue
            ? {
                ...currentValue,
                articles: [createdArticle, ...(currentValue.articles ?? [])],
              }
            : currentValue,
        );
        resetProductDraft();
        setIsProductFormVisible(true);
        setProductStatusMessage('Produsul a fost adaugat.');
        showToast({
          variant: 'success',
          title: 'Produs adaugat',
          description: `Produsul ${createdArticle.title} a fost creat.`,
        });
      }
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      const message = getApiErrorMessage(
        error,
        isEditingProduct ? 'Nu am putut actualiza produsul.' : 'Nu am putut adauga produsul.',
      );
      setProductErrorMessage(
        message,
      );
      setProductStatusMessage('');
      showToast({
        variant: 'error',
        title: isEditingProduct ? 'Actualizare esuata' : 'Creare esuata',
        description: message,
      });
    } finally {
      setIsCreatingProduct(false);
    }
  };

  const handleDeleteProduct = async (article: Article) => {
    if (!token) {
      logout();
      return;
    }

    if (!window.confirm(`Stergi produsul "${article.title}"?`)) {
      return;
    }

    setIsDeletingProduct(true);

    try {
      await deleteArticle(article.slug, token);
      setSelectedCategory((currentValue) =>
        currentValue
          ? {
              ...currentValue,
              articles: (currentValue.articles ?? []).filter((currentArticle) => currentArticle.slug !== article.slug),
            }
          : currentValue,
      );

      if (selectedArticleSlug === article.slug) {
        resetProductDraft();
        setIsProductFormVisible(false);
      }

      setProductStatusMessage(`Produsul "${article.title}" a fost sters.`);
      setProductErrorMessage('');
      showToast({
        variant: 'success',
        title: 'Produs sters',
        description: `${article.title} a fost eliminat din categorie.`,
      });
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      const message = getApiErrorMessage(error, 'Nu am putut sterge produsul.');
      setProductErrorMessage(message);
      showToast({
        variant: 'error',
        title: 'Stergere esuata',
        description: message,
      });
    } finally {
      setIsDeletingProduct(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-ark-gold/20 bg-[radial-gradient(circle_at_top_left,rgba(193,154,107,0.2),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 shadow-2xl shadow-black/30 sm:p-6 md:p-8">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl text-ark-gold sm:text-4xl md:text-5xl">Panou de administrare interactiv</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-200 md:text-base">
              Administrezi continutul dintr-un singur loc: alegi categoria, editezi rapid detaliile si pregatesti produse noi cu preview live inainte de publicare.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Admin</p>
              <p className="mt-2 break-words text-lg text-white">{user?.username}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Limba site</p>
              <div className="mt-2">
                <LanguageSelect />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <label className="text-xs uppercase tracking-[0.25em] text-white/50">Limba editata</label>
              <select
                value={editorLanguageCode}
                onChange={(event) => {
                  if (!confirmDiscardChanges('all')) {
                    return;
                  }

                  setEditorLanguageCode(event.target.value);
                }}
                className="mt-2 w-full rounded-lg border border-ark-gold/30 bg-black/30 px-3 py-2 text-sm text-white outline-none transition focus:border-ark-gold"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code} className="bg-ark-purple text-white">
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Categorii</p>
              <p className="mt-2 text-lg text-white">{categories.length}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Produse</p>
              <p className="mt-2 text-lg text-white">{selectedCategory?.articles?.length ?? 0}</p>
            </div>
          </div>
        </div>

        {(hasCategoryDraftChanges || hasProductDraftChanges) && (
          <div className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-300/10 px-5 py-4 text-sm text-amber-100">
            Ai modificari nesalvate.
            {hasCategoryDraftChanges && ' Categoria are un draft activ.'}
            {hasProductDraftChanges && ' Formularul de produs are schimbari in lucru.'}
          </div>
        )}
      </section>

      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6 lg:sticky lg:top-28 lg:h-fit">
        <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Control</p>
        <h2 className="text-3xl text-ark-gold mb-2">Categorii</h2>
        <p className="text-sm text-gray-200 mb-6">Selecteaza rapid zona in care vrei sa lucrezi.</p>

        <div className="mb-5">
          <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/50">Cauta categorie</label>
          <input
            type="text"
            value={categoryQuery}
            onChange={(event) => setCategoryQuery(event.target.value)}
            placeholder="living, dormitoare..."
            className="w-full rounded-xl border border-ark-gold/20 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-ark-gold"
          />
        </div>

        <button
          type="button"
          onClick={logout}
          className="mb-6 w-full rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Logout
        </button>

        <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-3">Categorii</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelectCategory(category.slug)}
              className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                selectedSlug === category.slug
                  ? 'border-ark-gold bg-ark-gold/10 text-ark-gold'
                  : 'border-white/10 bg-white/5 text-white hover:border-ark-gold/40'
              }`}
            >
              <p className="text-sm font-semibold">{category.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{category.slug}</p>
            </button>
          ))}
        </div>

        {!isLoadingCategories && filteredCategories.length === 0 && (
          <p className="mt-4 text-sm text-gray-300">Nu exista rezultate pentru cautarea curenta.</p>
        )}
        {isLoadingCategories && <p className="mt-4 text-sm text-gray-300">Se incarca categoriile...</p>}
        {listErrorMessage && <p className="mt-4 text-sm text-rose-300">{listErrorMessage}</p>}
      </aside>

      <section className="space-y-8">
        <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Workspace</p>
              <h2 className="mt-2 break-words text-2xl text-ark-gold sm:text-3xl">
                {selectedCategory ? `Editezi ${selectedCategory.title}` : 'Alege o categorie'}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-200">
                Selectezi categoria din stanga, actualizezi detaliile ei si alegi direct produsul pe care vrei sa-l editezi.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Categorie activa</p>
                <p className="mt-2 text-lg text-white">{selectedCategory?.title ?? 'Neselectata'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">Produse</p>
                <p className="mt-2 text-lg text-white">{selectedCategory?.articles?.length ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6 md:p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Categorie</p>
              <h3 className="mt-2 text-2xl text-ark-gold sm:text-3xl">Setari principale</h3>
            </div>

            {isLoadingCategory && <p className="mt-6 text-sm text-gray-300">Se incarca detaliile categoriei...</p>}

            {selectedCategory && !isLoadingCategory && (
              <div className="mt-6 space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCategoryImageSelection}
                    className="block w-full text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-ark-gold file:px-4 file:py-2 file:font-semibold file:text-ark-purple hover:file:bg-ark-gold/90"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      void handleCategoryImageUpload();
                    }}
                    disabled={!categoryImageFile || isUploadingCategoryImage}
                    className="w-full rounded-lg border border-ark-gold/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-ark-gold transition hover:bg-ark-gold hover:text-ark-purple disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isUploadingCategoryImage ? 'Se incarca...' : 'Upload imagine'}
                  </button>
                </div>

                {categoryImagePreviewUrl && (
                  <div className="overflow-hidden rounded-xl border border-ark-gold/20">
                    <img src={categoryImagePreviewUrl} alt="Preview categorie" className="h-40 w-full object-cover sm:h-48" />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Title</label>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-ark-gold"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Description</label>
                  <textarea
                    rows={6}
                    value={draftDescription}
                    onChange={(event) => setDraftDescription(event.target.value)}
                    className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-ark-gold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void handleSaveCategory();
                  }}
                  disabled={!selectedCategory || isSavingCategory || isLoadingCategory}
                  className="w-full rounded-lg bg-ark-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-ark-gold/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSavingCategory ? 'Se salveaza...' : 'Salveaza categoria'}
                </button>
              </div>
            )}

            {categoryStatusMessage && <p className="mt-4 text-sm text-emerald-300">{categoryStatusMessage}</p>}
            {categoryErrorMessage && <p className="mt-4 text-sm text-rose-300">{categoryErrorMessage}</p>}
          </div>

          <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Preview categorie</p>
            {selectedCategory ? (
              <>
                <div className="overflow-hidden rounded-2xl border border-ark-gold/20">
                  <img
                    src={categoryImagePreviewUrl || draftImage || selectedCategory.image}
                    alt={selectedCategory.title}
                    className="h-56 w-full object-cover sm:h-64"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">{selectedCategory.slug}</p>
                  <h3 className="mt-2 break-words text-2xl text-ark-gold sm:text-3xl">{draftTitle || selectedCategory.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-200">
                    {draftDescription || selectedCategory.description}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-300">Selecteaza o categorie pentru preview.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80">Produse</p>
              <h3 className="mt-2 text-2xl text-ark-gold sm:text-3xl">
                {selectedCategory ? `Produse din ${selectedCategory.title}` : 'Produse din categoria selectata'}
              </h3>
            </div>
            <button
              type="button"
              onClick={openNewProductForm}
              disabled={!selectedCategory || isLoadingCategory}
              className="w-full rounded-lg border border-ark-gold/40 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-ark-gold transition hover:bg-ark-gold hover:text-ark-purple disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              Produs nou
            </button>
          </div>

          {!isProductFormVisible && (
            <p className="mt-4 text-sm text-gray-300">
              Alege un produs din lista ca sa-l editezi sau apasa pe `Produs nou`.
            </p>
          )}

          {!isProductFormVisible && productStatusMessage && (
            <p className="mt-4 text-sm text-emerald-300">{productStatusMessage}</p>
          )}
          {!isProductFormVisible && productErrorMessage && (
            <p className="mt-4 text-sm text-rose-300">{productErrorMessage}</p>
          )}

          {isLoadingCategory && <p className="mt-6 text-sm text-gray-300">Se incarca produsele...</p>}

          {!isLoadingCategory && selectedCategory && (selectedCategory.articles ?? []).length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {(selectedCategory.articles ?? []).map((article) => (
                <div
                  key={article.id}
                  className={`overflow-hidden rounded-2xl border bg-black/20 text-left transition ${
                    selectedArticleSlug === article.slug
                      ? 'border-emerald-300 shadow-[0_0_0_1px_rgba(110,231,183,0.4)]'
                      : 'border-ark-gold/20 hover:border-ark-gold/60'
                  }`}
                >
                  <img src={article.image} alt={article.title} className="h-48 w-full object-cover sm:h-56" />
                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.25em] text-ark-gold/70">{article.slug}</p>
                      <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-200">
                        {selectedArticleSlug === article.slug ? 'Selectat' : 'Editeaza'}
                      </span>
                    </div>
                    <h3 className="mb-3 break-words text-xl text-ark-gold sm:text-2xl">{article.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-200">{article.description}</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => startEditingProduct(article)}
                        className="w-full rounded-lg border border-ark-gold/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ark-gold transition hover:bg-ark-gold hover:text-ark-purple sm:w-auto"
                      >
                        Editeaza
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          void handleDeleteProduct(article);
                        }}
                        disabled={isDeletingProduct}
                        className="w-full rounded-lg border border-rose-300/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-200 transition hover:bg-rose-300/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {isDeletingProduct ? 'Se sterge...' : 'Sterge'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCategory && (selectedCategory.articles ?? []).length === 0 && (
            <p className="mt-6 text-sm text-gray-300">Categoria selectata nu are produse momentan.</p>
          )}
        </div>

        {isProductFormVisible && (
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80">Editor produs</p>
                  <h3 className="mt-2 text-2xl text-ark-gold sm:text-3xl">
                    {isEditingProduct ? 'Editeaza produsul selectat' : 'Adauga produs nou'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeProductForm}
                  className="rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Inchide
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {isEditingProduct && (
                  <div className="rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200">
                    Editezi produsul cu slug-ul <span className="font-semibold">{selectedArticleSlug}</span>.
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Title</label>
                  <input
                    type="text"
                    value={productTitle}
                    onChange={(event) => setProductTitle(event.target.value)}
                    className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-ark-gold"
                  />
                </div>

                {isEditingProduct ? (
                  <div>
                    <p className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Slug</p>
                    <div className="rounded-lg border border-ark-gold/30 bg-white/5 px-4 py-3 text-sm text-white">
                      {productSlug}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Slug optional</label>
                    <input
                      type="text"
                      value={productSlug}
                      onChange={(event) => setProductSlug(event.target.value)}
                      className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-ark-gold"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageSelection}
                    className="block w-full text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-ark-gold file:px-4 file:py-2 file:font-semibold file:text-ark-purple hover:file:bg-ark-gold/90"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      void handleProductImageUpload();
                    }}
                    disabled={!productImageFile || isUploadingProductImage}
                    className="w-full rounded-lg border border-ark-gold/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-ark-gold transition hover:bg-ark-gold hover:text-ark-purple disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isUploadingProductImage ? 'Se incarca...' : 'Upload imagine'}
                  </button>
                </div>

                {productImagePreviewUrl && (
                  <div className="overflow-hidden rounded-xl border border-ark-gold/20">
                    <img src={productImagePreviewUrl} alt="Preview produs" className="h-40 w-full object-cover sm:h-48" />
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-[0.25em] text-white/60">Description</label>
                  <textarea
                    rows={5}
                    value={productDescription}
                    onChange={(event) => setProductDescription(event.target.value)}
                    className="w-full rounded-lg border border-ark-gold/30 bg-transparent px-4 py-3 text-white outline-none transition focus:border-ark-gold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void handleSubmitProduct();
                  }}
                  disabled={!selectedCategory || isCreatingProduct || isLoadingCategory}
                  className="w-full rounded-lg bg-ark-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-ark-purple transition hover:bg-ark-gold/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isCreatingProduct
                    ? isEditingProduct
                      ? 'Se salveaza...'
                      : 'Se adauga...'
                    : isEditingProduct
                      ? 'Salveaza produsul'
                      : 'Add Product'}
                </button>
              </div>

              {productStatusMessage && <p className="mt-4 text-sm text-emerald-300">{productStatusMessage}</p>}
              {productErrorMessage && <p className="mt-4 text-sm text-rose-300">{productErrorMessage}</p>}
            </div>

          <div className="rounded-2xl border border-ark-gold/20 bg-black/20 p-5 shadow-2xl shadow-black/20 sm:p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-ark-gold/80 mb-3">Preview produs</p>
              <div className="overflow-hidden rounded-2xl border border-ark-gold/20">
                <div className="flex h-56 items-center justify-center bg-white/5 text-sm text-white/50 sm:h-64">
                  {productImagePreviewUrl || productImage ? (
                    <img src={productImagePreviewUrl || productImage} alt={productTitle || 'Produs nou'} className="h-full w-full object-cover" />
                  ) : (
                    'Preview imagine produs'
                  )}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {productSlug || 'slug-generat-automat'}
                </p>
                <h3 className="mt-2 break-words text-xl text-ark-gold sm:text-2xl">{productTitle || 'Titlu produs nou'}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-200">
                  {productDescription || 'Descrierea produsului va aparea aici inainte de salvare.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
