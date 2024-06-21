import React from "react";
import ProductCard from "./ProductCard";

const Product = ({ products }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            id={product.id}
            name={product.name}
            image={product.productPhotos}
            price={product.price}
            description={product.description}
            reviews={product.reviews?.[0]?.comment}
            totalReviews={product.totalReviews}
            averageRating={product.averageRating}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
