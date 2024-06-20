import React, { useEffect, useState } from "react";

import axios from "axios";
import Product from "../../components/Product";

const ProductBuy = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products`
        );
        console.log("products fetched from server", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className='h-100 relative flex flex-col'>
      <div className='container mx-auto '>
        <Product products={products} />
      </div>{" "}
      <div className='flex justify-center bottom-4 mt-4 right-4'>
        {/* Pagination component */}
        <div className='flex items-center space-x-2'>
          <button className='px-3 py-1 text-white bg-black rounded'>
            Previous
          </button>
          <span className='px-3 py-1'>1</span>
          <span className='px-3 py-1'>2</span>
          <span className='px-3 py-1'>3</span>
          <button className='px-3 py-1  text-white bg-black rounded'>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductBuy;
