import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../utils/data";

const Product = () => {
  return (
    <div className="p-4">
      <div
        className="items-baseline justify-between pr-6 mb-2
">
        Heading
      </div>
      <div className="grid grid-cols-5 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            description={product.description}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;