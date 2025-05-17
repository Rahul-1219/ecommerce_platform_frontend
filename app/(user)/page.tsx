import { Hero } from "@/components/user/hero";
import ProductList from "@/components/user/product-list";
import { productList } from "./action";

export default async function Home() {
  const products = await productList();
  return (
    <div>
      <Hero />
      {products?.data?.map((tag) => (
        <ProductList key={tag.type} title={tag.name} products={tag.products} />
      ))}
    </div>
  );
}
