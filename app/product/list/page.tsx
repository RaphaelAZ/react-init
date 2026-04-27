export default async function Page() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return (
    <div>
      {data.map((post: any) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}