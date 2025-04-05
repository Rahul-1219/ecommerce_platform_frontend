import ProductDetail from "@/components/user/product-detail";

// Example product data
const exampleProduct = {
  _id: "6794a9c44b11397a988f3e5b",
  name: "Tshirt",
  categoryId: {
    _id: "67715fb12adf78f94313d3b8",
    name: "test sub",
    image: "1735485261354_ouq8udDPE.png",
    fileId: "6771674be375273f6050e85c",
    categoryId: "67668a025d821eedc4e785c9",
    isActive: true,
    createdAt: "2024-12-29T14:41:54.042Z",
    updatedAt: "2024-12-29T15:14:23.757Z",
    __v: 0,
  },
  description: "This is iphone 16.",
  price: 1200,
  quantity: 12,
  isActive: true,
  createdAt: "2025-01-25T09:07:16.740Z",
  updatedAt: "2025-03-31T11:02:37.343Z",
  __v: 0,
  productVariants: [
    {
      _id: "67ea764d9bb1d4b0bc3bf397",
      productId: "6794a9c44b11397a988f3e5b",
      color: "red",
      size: "M, L, XL, XXL",
      price: 1200,
      quantity: 10,
      __v: 0,
      createdAt: "2025-03-31T11:02:37.615Z",
      updatedAt: "2025-03-31T11:02:37.615Z",
    },
    {
      _id: "67ea764d9bb1d4b0bc3bf396",
      productId: "6794a9c44b11397a988f3e5b",
      color: "blue",
      size: "L, XL",
      price: 1500,
      quantity: 20,
      __v: 0,
      createdAt: "2025-03-31T11:02:37.614Z",
      updatedAt: "2025-03-31T11:02:37.614Z",
    },
  ],
  productImages: [
    {
      _id: "6794a9c74b11397a988f3e61",
      productId: "6794a9c44b11397a988f3e5b",
      image:
        "https://ik.imagekit.io/jblk9kzix0/local/products/1737796036748_CJ_B1BoOT1.png",
      fileId: "6794a9c3432c476416dabe8b",
      __v: 0,
      createdAt: "2025-01-25T09:07:19.422Z",
      updatedAt: "2025-01-25T09:07:19.422Z",
    },
    {
      _id: "6794a9c74b11397a988f3e62",
      productId: "6794a9c44b11397a988f3e5b",
      image:
        "https://ik.imagekit.io/jblk9kzix0/local/products/1737796036749_hr4KDJGyN.png",
      fileId: "6794a9c4432c476416dabf07",
      __v: 0,
      createdAt: "2025-01-25T09:07:19.422Z",
      updatedAt: "2025-01-25T09:07:19.422Z",
    },
    {
      _id: "6794a9c74b11397a988f3e63",
      productId: "6794a9c44b11397a988f3e5b",
      image:
        "https://ik.imagekit.io/jblk9kzix0/local/products/1737796036750_L4mmPjjVe.png",
      fileId: "6794a9c3432c476416dabe93",
      __v: 0,
      createdAt: "2025-01-25T09:07:19.422Z",
      updatedAt: "2025-01-25T09:07:19.422Z",
    },
    {
      _id: "6794a9c74b11397a988f3e64",
      productId: "6794a9c44b11397a988f3e5b",
      image:
        "https://ik.imagekit.io/jblk9kzix0/local/products/1737796036750_5lOBjQirg2.png",
      fileId: "6794a9c3432c476416dabeb5",
      __v: 0,
      createdAt: "2025-01-25T09:07:19.422Z",
      updatedAt: "2025-01-25T09:07:19.422Z",
    },
    {
      _id: "6794a9c74b11397a988f3e65",
      productId: "6794a9c44b11397a988f3e5b",
      image:
        "https://ik.imagekit.io/jblk9kzix0/local/products/1737796036751_LsoVKZsFw.png",
      fileId: "6794a9c3432c476416dabebb",
      __v: 0,
      createdAt: "2025-01-25T09:07:19.422Z",
      updatedAt: "2025-01-25T09:07:19.422Z",
    },
  ],
};
const Product = () => {
  return <ProductDetail product={exampleProduct} />;
};

export default Product;
