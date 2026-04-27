import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
};

async function getProducts(query?: string) {
  const endpoint = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
    : "https://dummyjson.com/products?limit=12";

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Impossible de charger la liste des produits.");
  }

  return (await response.json()) as ProductsResponse;
}

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ q?: string | string[] }>;
}>) {
  const rawQuery = (await searchParams).q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  const data = await getProducts(query);
  const hasQuery = Boolean(query?.trim());

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">
          {hasQuery ? `Résultats pour "${query}"` : "Liste des produits"}
        </h2>
        <p className="text-sm text-slate-600">
          Cliquez sur un produit pour voir son détail.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data.products.map((product) => (
          <Link
            key={product.id}
            className="rounded border border-slate-300 p-4 transition hover:bg-slate-50"
            href={`/product/${product.id}`}
          >
            <div className="space-y-2">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-slate-600">{product.category}</p>
              <p className="text-sm text-slate-700">Prix: ${product.price}</p>
              <p className="text-sm text-slate-700">Stock: {product.stock}</p>
            </div>
          </Link>
        ))}
      </div>

      {data.products.length === 0 && (
        <div className="rounded border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600">
          Aucun produit trouvé pour cette recherche.
        </div>
      )}
    </section>
  );
}