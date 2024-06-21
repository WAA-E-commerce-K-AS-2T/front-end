import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/product/Product";
import Pagination from "../../components/common/Pagination";

const ProductBuy = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products?page=${
          page + 1
        },size=${itemsPerPage}`
      );

      setProducts(response.data?.content);

      setPageCount(response.data?.totalPages);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  if (products?.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-100 relative flex flex-col">
      <div className="container mx-auto">
        <Product products={products} />
      </div>
      <div className="flex justify-center mt-4">
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ProductBuy;
