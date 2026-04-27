function goToProducts() {
  globalThis.location.href = "/product";
}

export default async function Page(children: any) {
  return (
    <div>
      <h1>My App</h1>
      <button onClick={goToProducts}>Go to Products</button>
    </div>
  );
}