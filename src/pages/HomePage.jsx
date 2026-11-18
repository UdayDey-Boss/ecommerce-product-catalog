import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import ProductModal from "../components/ProductModal";
import FilterSidebar from "../components/FilterSidebar";

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  let category = searchParams.get("category");
  let sort = searchParams.get("sort");

  if (category === null) {
    category = "all";
  }
  if (sort === null) {
    sort = "default";
  }

  function changeCategory(newCategory) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", newCategory);
    setSearchParams(newParams);
  }

  function changeSort(newSort) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", newSort);
    setSearchParams(newParams);
  }

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
    let allProducts = productsQuery.data.products;
    let filteredProducts = allProducts;

    if (category !== "all") {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.category === category;
      });
    }

    if (sort === "low-to-high") {
      filteredProducts = filteredProducts.slice().sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (sort === "high-to-low") {
      filteredProducts = filteredProducts.slice().sort(function (a, b) {
        return b.price - a.price;
      });
    }

    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(function (product) {
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

      <FilterSidebar
        category={category}
        sort={sort}
        onCategoryChange={changeCategory}
        onSortChange={changeSort}
      />

      {content}
      {modalContent}
    </div>
  );
}

export default HomePage;
