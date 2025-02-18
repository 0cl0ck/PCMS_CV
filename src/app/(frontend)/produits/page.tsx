import { ProductsContent } from './components/ProductsContent';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import type { Where } from 'payload';
import { getPayload } from 'payload';

export const metadata: Metadata = {
  title: 'Produits | Chanvre Vert',
  description: 'Découvrez notre gamme de produits au chanvre.',
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// 🔹 Fonction pour récupérer les catégories
async function getCategories() {
  const payload = await getPayload({ config: configPromise });

  try {
    const categories = await payload.find({
      collection: 'product-categories',
      depth: 0, // Pas besoin de profondeur ici
    });

    return categories.docs;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// 🔹 Fonction pour récupérer les produits en fonction des catégories sélectionnées
async function getProducts(selectedCategories: string[]) {
  const payload = await getPayload({ config: configPromise });

  try {
    const where: Where = {
      _status: {
        equals: 'published',
      },
    };

    if (selectedCategories.length > 0) {
      where.category = {
        in: selectedCategories,
      };
    }

    const products = await payload.find({
      collection: 'products',
      where,
      depth: 1,
    });

    return products.docs;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const categoryParam = (await searchParams)?.category;
  const selectedCategories: string[] = Array.isArray(categoryParam)
    ? categoryParam
    : categoryParam
      ? [categoryParam]
      : [];

  // 🔹 Récupération des catégories et produits en parallèle
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(selectedCategories),
  ]);

  // 🔹 Calcul de la fourchette de prix pour les filtres
  const prices = products.map((product) => product.price || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <ProductsContent
      categories={categories}
      products={products}
      selectedCategories={selectedCategories}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
  );
}
