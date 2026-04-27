'use client';

import { useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function ProductLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSearch(event: { preventDefault(): void }) {
    event.preventDefault();

    const value = query.trim();
    const target = value
      ? `/product/list?q=${encodeURIComponent(value)}`
      : "/product/list";

    router.push(target);
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="mb-6 space-y-4">
        <div>
          <p className="text-sm text-slate-500">Catalogue produits</p>
          <h1 className="text-2xl font-semibold">Produits</h1>
        </div>

        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
          <label className="sr-only" htmlFor="product-search">
            Rechercher un produit
          </label>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2"
            id="product-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un produit"
            value={query}
          />
          <button
            className="rounded border border-slate-300 px-4 py-2"
            type="submit"
          >
            Rechercher
          </button>
        </form>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}