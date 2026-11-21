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
  let minPrice = searchParams.get("minPrice");
  let maxPrice = searchParams.get("maxPrice");

  if (category === null) {
    category = "all";
  }
  if (sort === null) {
    sort = "default";
  }
  if (minPrice === null) {
    minPrice = "";
  }
  if (maxPrice === null) {
    maxPrice = "";
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

  function changeMinPrice(newMin) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", newMin);
    setSearchParams(newParams);
  }

  function changeMaxPrice(newMax) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("maxPrice", newMax);
    setSearchParams(newParams);
  }

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  let allCategories = [];

  if (productsQuery.isSuccess === true) {
    let allProducts = productsQuery.data.products;

    for (let i = 0; i < allProducts.length; i++) {
      let productCategory = allProducts[i].category;

      let found = false;
      for (let j = 0; j < allCategories.length; j++) {
        if (allCategories[j] === productCategory) {
          found = true;
        }
      }

      if (found === false) {
        allCategories.push(productCategory);
      }
    }
  }

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

    if (minPrice !== "") {
      let minNumber = Number(minPrice);
      filteredProducts = filteredProducts.filter(function (product) {
        return product.price >= minNumber;
      });
    }

    if (maxPrice !== "") {
      let maxNumber = Number(maxPrice);
      filteredProducts = filteredProducts.filter(function (product) {
        return product.price <= maxNumber;
      });
    }

    // Sort
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

    if (filteredProducts.length === 0) {
      content = (
        <div className="text-center py-10">
          <p className="text-gray-500 font-medium">
            No products found matching your filters.
          </p>
        </div>
      );
    } else {
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
        minPrice={minPrice}
        maxPrice={maxPrice}
        categories={allCategories}
        onCategoryChange={changeCategory}
        onSortChange={changeSort}
        onMinPriceChange={changeMinPrice}
        onMaxPriceChange={changeMaxPrice}
      />

      {content}
      {modalContent}
    </div>
  );
}

export default HomePage;
