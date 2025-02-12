import { ProductGrid } from '@/components/ProductGrid';
import { SearchParamsProvider } from '@/hooks/useSearchParamsProvider';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import type { Where } from 'payload';
import { getPayload } from 'payload';
import { ProductFilters } from './components/filters';
import { ProductSort } from './components/ProductSort';
import { ResetFiltersButton } from './components/ResetFiltersButton';

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
      depth: 2,
      limit: 100,
      where,
    });

    return products.docs;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

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
    <SearchParamsProvider>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-24">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="prose dark:prose-invert">
                <h1 className="mb-0">Produits</h1>
              </div>
              <ProductSort />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Sidebar avec les filtres - position fixe sur desktop */}
            <div className="w-full md:w-64 md:flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters
                  categories={categories}
                  selectedCategories={selectedCategories}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                />
              </div>
            </div>

            {/* Grille des produits */}
            <div className="flex-1">
              {products.length > 0 ? (
                <ProductGrid products={products} />
              ) : (
                <div className="rounded-lg border bg-background p-6 text-center">
                  <p className="text-muted-foreground">
                    Aucun produit ne correspond à votre sélection.
                  </p>
                  <ResetFiltersButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SearchParamsProvider>
  );
}

