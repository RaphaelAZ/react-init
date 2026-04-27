type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  brand: string;
};

async function getProduct(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Impossible de charger le produit.");
  }

  return (await response.json()) as Product;
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <section className="max-w-2xl space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-slate-600">{product.category}</p>
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="text-sm text-slate-600">Marque: {product.brand}</p>
      </div>

      <p className="text-sm leading-6 text-slate-700">{product.description}</p>

      <div className="space-y-2 text-sm text-slate-700">
        <p>Prix: ${product.price}</p>
        <p>Note: {product.rating}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </section>
  );
}