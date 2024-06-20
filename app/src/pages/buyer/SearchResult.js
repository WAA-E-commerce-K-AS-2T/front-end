import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductBuy from "../../pages/Products";
import CustomButton from "../../components/controllers/CustomButton";
import Product from "../../components/Product";

const SearchResult = () => {
  const initialVal = [
    {
      name: "Color",
      values: [
        { name: "blue", isChecked: true },
        { name: "white", isChecked: true },
      ],
      isActive: false,
    },
    {
      name: "productSize",
      values: [
        { name: "S", isChecked: true },
        { name: "M", isChecked: true },
      ],
      isActive: false,
    },
    {
      name: "Material",
      values: [
        { name: "Cotton", isChecked: true },
        { name: "Silk", isChecked: true },
      ],
      isActive: false,
    },

    { name: "Brand", values: [{ name: "Nike", isChecked: true }], isActive: false },
  ];
  const [searchParams] = useSearchParams();
  const productName = searchParams.get("name") || "";

  const [filters, setFilters] = useState(initialVal);
  const [price, setPrice] = useState({ name: "Price", min: 0, max: 0, isActive: false });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const changeFilter = (parent, field) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.name === parent
          ? {
              ...filter,
              values: filter.values.map((value) => (value.name === field ? { ...value, isChecked: !value.isChecked } : value)),
            }
          : filter,
      ),
    );
  };
  const openPanel = (name) => {
    setFilters((prevFilters) => prevFilters.map((filter) => (filter.name === name ? { ...filter, isActive: !filter.isActive } : filter)));
  };
  const applyFilter = () => {
    let params = filters.reduce((acc, filter) => {
      const selectedValues = filter.values.filter((value) => value.isChecked);
      if (selectedValues.length > 0) {
        const paramString = selectedValues.map((value) => `${filter.name.toLowerCase()}=${value.name}`).join("&");
        return acc ? `${acc}&${paramString}` : paramString;
      }
      return acc;
    }, "");

    if (price.min !== 0) {
      params += `&minPrice=${price.min}`;
    }
    if (price.max !== 0) {
      params += `&maxPrice=${price.max}`;
    }

    if (productName !== "") {
      params += "&name=" + productName;
    }
    fetchProducts(params);
  };
  const fetchProducts = (params) => {
    console.log("Params", params);
    axios.get("http://localhost:8080/api/v1/products/filter?page=0&size=10&" + params).then((response) => {
      console.log(response.data);
    });
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      console.log("getAllCategory", response.data);
      setCategories(response.data);
      let cats = [];
      response.data.map((i) => {
        cats.push({ name: i.id, isChecked: false });
      });

      initialVal.unshift({ name: "Category", values: cats, isActive: false });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productName !== "") {
      const nameQuery = "&name=" + productName;
      fetchProducts(nameQuery);
    }
  }, [productName]);

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="flex">
      <div className=" top-0 left-0 z-40 w-64 h-screen border-black border-solid border-r-[1px] transition-transform -translate-x-full sm:translate-x-0 px-6">
        {filters.map((i) => (
          <div className="w-full">
            <div className="flex justify-between mt-4 items-center">
              {i.name === "productSize" ? "Product size" : i.name}
              <button onClick={() => openPanel(i.name)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="black"
                  className={`size-4 ml-4 transition-transform duration-300 ease-in-out transform ${i.isActive ? "rotate-180" : "rotate-0"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            <div className={`${i.isActive ? "h-auto" : "h-0"} transition-height duration-500 ease-in-out overflow-hidden w-full `}>
              {i.values.map((j) => (
                <div className="w-full text-left ml-4 mt-2">
                  <input
                    type="checkbox"
                    value={j.isChecked}
                    checked={j.isChecked}
                    onChange={() => changeFilter(i.name, j.name)}
                    className="focus:ring-blue-500 w-4 h-4 text-teal-500 bg-teal-500 focus:ring-teal-500"
                  />
                  <label className="ml-2">{i.name === "Category" ? categories.filter((c) => c.id === j.name)[0].name : j.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="w-full">
          <div className="flex justify-between mt-4 items-center">
            Price
            <button onClick={() => setPrice({ ...price, isActive: !price.isActive })}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className={`size-4 ml-4 transition-transform duration-300 ease-in-out transform ${price.isActive ? "rotate-180" : "rotate-0"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          <div className={`${price.isActive ? "h-auto" : "h-0"} transition-height duration-500 ease-in-out overflow-hidden w-full `}>
            <div className="text-left mt-4 flex gap-2 justify-between">
              <div>
                {" "}
                <label className="text-sm font-semibold">Min price</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setPrice({ ...price, min: e.target.value });
                  }}
                  className="w-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                />
              </div>
              <div>
                {" "}
                <label className="text-sm font-semibold">Max price</label>
                <input
                  type="number"
                  onChange={(e) => {
                    setPrice({ ...price, max: e.target.value });
                  }}
                  className="w-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <CustomButton text="Apply" handleClick={applyFilter} />
        </div>
      </div>
      <div className=" relative flex flex-col">
        <div className="container mx-auto ">
          {/* {products.map(product =>
    
          <ProductCard
          key={index}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          description={product.description}
          rating={product.rating}
          reviews={product.reviews})
        />
    } */}
          <div className="flex justify-center bottom-4 mt-4 right-4">
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
    </div>
  );
};
export default SearchResult;
