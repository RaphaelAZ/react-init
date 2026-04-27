async function searchProducts(text: string) {
    await fetch('https://dummyjson.com/products/search?q=' + text);
}

export default async function Page() {
  return (
    <div className="p-4">
      <input type="text" placeholder="Rechercher un produit..." />
      <button onClick={() => searchProducts((document.querySelector('input') as HTMLInputElement).value)}>🔍</button>
    </div>
  );
}