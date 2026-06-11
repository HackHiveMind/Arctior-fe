import { describe, expect, it } from 'vitest';
import { buildProductImageDraft } from './productImageDraft';

describe('buildProductImageDraft', () => {
  it('genereaza titlu si descriere pentru o poza noua', () => {
    expect(
      buildProductImageDraft({
        categoryTitle: 'Bucatarii',
        articleCount: 2,
      }),
    ).toEqual({
      title: 'Imagine 3',
      description: 'Imagine din categoria Bucatarii',
    });
  });

  it('pastreaza textul existent cand se editeaza o poza deja salvata', () => {
    expect(
      buildProductImageDraft({
        categoryTitle: 'Living',
        articleCount: 4,
        existingTitle: 'Front mobilier',
        existingDescription: 'Detaliu mobilier living',
      }),
    ).toEqual({
      title: 'Front mobilier',
      description: 'Detaliu mobilier living',
    });
  });
});
