import React from "react";

import Product from "./Product";

const ProductBuy = () => {
  return (
    <div className="h-100 relative flex flex-col">
      <div className="container mx-auto ">
        <Product />
      </div>{" "}
      <div className="absolute bottom-4 right-4">
        {/* Pagination component */}
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded">Previous</button>
          <span className="px-3 py-1">1</span>
          <span className="px-3 py-1">2</span>
          <span className="px-3 py-1">3</span>
          <button className="px-3 py-1 bg-gray-200 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductBuy;
