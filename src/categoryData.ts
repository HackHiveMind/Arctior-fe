export interface Category {
  slug: string;
  title: string;
  image: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: 'living',
    title: 'Living',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80',
    description: 'Amenajari de living personalizate pentru confort, eleganta si functionalitate zilnica.',
  },
  {
    slug: 'dormitoare',
    title: 'Dormitoare',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80',
    description: 'Dormitoare realizate la comanda, cu finisaje premium si organizare inteligenta.',
  },
  {
    slug: 'canapele',
    title: 'Canapele',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80',
    description: 'Canapele custom care imbina ergonomia, rezistenta si stilul interiorului tau.',
  },
  {
    slug: 'birouri',
    title: 'Birouri',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80',
    description: 'Birouri pe comanda, adaptate fluxului de lucru si spatiului disponibil.',
  },
  {
    slug: 'bucatarii',
    title: 'Bucatarii',
    image: 'https://images.unsplash.com/photo-1556911223-e153e9b37293?auto=format&fit=crop&q=80',
    description: 'Bucatarii personalizate pentru depozitare eficienta si un aspect modern.',
  },
  {
    slug: 'dressinguri',
    title: 'Dressinguri',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80',
    description: 'Dressinguri configurate dupa nevoile tale, cu compartimentare premium.',
  },
];
