import ProductCard from "../../components/ProductCard";

const ProductSeller = () => {
  return (
    <div className="w-full">
      <div className="container w-full mx-8 my-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              rating={product.rating || []}
              reviews={product.reviews}
            />
          ))}
        </div>
        <div className="flex justify-center bottom-4 mt-4 right-4 w-full">
          {/* Pagination component */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-teal-200 rounded">Previous</button>
            <span className="px-3 py-1">1</span>
            <span className="px-3 py-1">2</span>
            <span className="px-3 py-1">3</span>
            <button className="px-3 py-1 bg-teal-200 rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductSeller;
