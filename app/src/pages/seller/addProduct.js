import { Link } from "react-router-dom";
import CustomButton from "../../components/controllers/CustomButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import axios from "axios";

const AddProduct = () => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [categories, setCategories] = useState([
    { name: "Electronics", sub: [{ name: "TV" }] },
    { name: "Toys", sub: [{ name: "Ball" }] },
  ]);
  const [selectedCat, setSelectedCat] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData);

    try {
      const response = await axios.post("https://api.example.com/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  useEffect(() => {
    // dispatch(setLoading(true));
  }, []);
  return (
    <>
      <p className="text-3xl text-left mx-24 my-8">Add product</p>
      <form className="customForm grid-cols-2 gap-8" ref={formRef} onSubmit={handleSubmit}>
        <div className="col-span-1">
          <div>
            <label htmlFor="username">Name</label>
            <input className="focus:outline-teal-500" id="username" name="username" type="text" placeholder="Product name" required />
          </div>
          <div className="mt-4">
            <label htmlFor="categories">Categories</label>
            <div className="flex gap-4">
              <select className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500" name="category" defaultValue={selectedCat}>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name || ""}
                  </option>
                ))}
              </select>
              <select className="focus:outline-teal-500" name="subCategory">
                <option>{selectedCat.name || ""}</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="price">Price</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="price"
              name="price"
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
              name="description"
              placeholder="Description"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="images">Images</label>
            <input type="file" name="images" />
          </div>
          <div className="flex items-center justify-between mt-8">
            <CustomButton text="Add Product" type="submit" />
          </div>
        </div>
        <div className="col-span-1">
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="brand"
              name="brand"
              type="text"
              placeholder="Brand"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="quantity">Quantity</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="quantity"
              name="quantity"
              type="text"
              placeholder="Quantity"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="color">Color</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="color"
              name="color"
              type="text"
              placeholder="Color"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="size">Size</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="size"
              name="size"
              type="text"
              placeholder="Size"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="year">Year</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="year"
              name="year"
              type="text"
              placeholder="Year"
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
