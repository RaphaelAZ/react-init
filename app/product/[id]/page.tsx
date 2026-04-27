export default async function Page() {
  const res = await fetch("https://dummyjson.com/products/1");
  const data = await res.json();
  return (
    <div>
      <p key={data.id}>{data.title}</p>
    </div>
  );
}