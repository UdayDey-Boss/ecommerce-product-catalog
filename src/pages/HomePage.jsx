import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductModal from "../components/ProductModal";

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  let content = null;

  if (productsQuery.isLoading === true) {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (productsQuery.isError === true) {
    content = (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">Error loading products.</p>
      </div>
    );
  }

  if (productsQuery.isSuccess === true) {
    let products = [];
    if (productsQuery.data) {
      products = productsQuery.data.products;
    }

    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(function (product) {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onClick={setSelectedProduct}
            />
          );
        })}
      </div>
    );
  }

  let modalContent = null;
  if (selectedProduct !== null) {
    modalContent = (
      <ProductModal
        product={selectedProduct}
        onClose={function () {
          setSelectedProduct(null);
        }}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Product Catalog</h1>
      {content}
      {modalContent}
    </div>
  );
}

export default HomePage;
