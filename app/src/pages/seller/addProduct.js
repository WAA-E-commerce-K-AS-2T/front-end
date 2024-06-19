import { Link } from "react-router-dom";
import CustomButton from "../../components/controllers/customButton";
import { useState } from "react";

const AddProduct = () => {
  console.log("add product");
  const [categories, setCategories] = useState([
    { name: "Electronics", sub: [{ name: "TV" }] },
    { name: "Toys", sub: [{ name: "Ball" }] },
  ]);
  const [selectedCat, setSelectedCat] = useState({ name: "" });
  return (
    <>
      <p className="text-3xl text-left mx-24 my-8">Add product</p>
      <form className="customForm grid-cols-2 gap-8">
        <div className="col-span-1">
          <div>
            <label htmlFor="username">Name</label>
            <input className="focus:outline-teal-500" id="username" type="text" placeholder="Product name" required />
          </div>
          <div className="mt-4">
            <label htmlFor="categories">Categories</label>
            <div className="flex gap-4">
              <select className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" value={selectedCat}>
                {categories.map((i) => (
                  <option val>{i.name || ""}</option>
                ))}
              </select>
              <select className="focus:outline-teal-500 focus:outline-teal-500">
                <option>{selectedCat.name || ""}</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="username">Price</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="price"
              type="number"
              placeholder="Price"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              rows="5"
              id="description"
              type="number"
              placeholder="Description"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="description">Images</label>
            <input type="file" multiple="true" />
          </div>
          <div className="flex items-center justify-between mt-8">
            <CustomButton text="Add Product"></CustomButton>
          </div>
        </div>
        <div className="col-span-1">
          <div className="">
            <label htmlFor="username">Brand</label>
            <input className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" id="brand" type="text" placeholder="Brand" required />
          </div>
          <div className="mt-4">
            <label htmlFor="username">Quantity</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="quantity"
              type="text"
              placeholder="Quantity"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="color">Color</label>
            <input className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" id="color" type="text" placeholder="Color" required />
          </div>
          <div className="mt-4">
            <label htmlFor="Size">Size</label>
            <input className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" id="size" type="text" placeholder="Size" required />
          </div>
          <div className="mt-4">
            <label htmlFor="username">Year</label>
            <input className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" id="year" type="text" placeholder="Year" required />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
