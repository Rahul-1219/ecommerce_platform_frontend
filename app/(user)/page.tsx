import { Hero } from "@/components/user/hero";
import ProductList from "@/components/user/product-list";
import { bannersList, productList } from "./action";

export default async function Home() {
  const products = await productList();
  const banners = await bannersList();
  return (
    <div>
      <Hero banners={banners?.data} />
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        {products?.data?.map((tag) => (
          <ProductList
            key={tag.type}
            title={tag.name}
            tagId={tag._id}
            products={tag.products}
          />
        ))}
      </div>
    </div>
  );
}
