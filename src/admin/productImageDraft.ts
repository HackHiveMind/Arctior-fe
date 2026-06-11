interface ProductImageDraftInput {
  categoryTitle: string;
  articleCount: number;
  existingTitle?: string;
  existingDescription?: string;
}

interface ProductImageDraft {
  title: string;
  description: string;
}

export function buildProductImageDraft({
  categoryTitle,
  articleCount,
  existingTitle = '',
  existingDescription = '',
}: ProductImageDraftInput): ProductImageDraft {
  const title = existingTitle.trim() || `Imagine ${articleCount + 1}`;
  const categoryName = categoryTitle.trim() || 'selectata';
  const description = existingDescription.trim() || `Imagine din categoria ${categoryName}`;

  return { title, description };
}
