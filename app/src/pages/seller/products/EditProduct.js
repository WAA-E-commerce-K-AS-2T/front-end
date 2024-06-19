import { useParams } from "react-router-dom";
import CustomButton from "../../../components/controllers/CustomButton";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions";
import axios from "axios";
import toast from "react-hot-toast";

const EditProduct = () => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { productId } = useParams();

  const [categories, setCategories] = useState([
    { name: "Electronics", sub: [{ name: "TV" }] },
    { name: "Toys", sub: [{ name: "Ball" }] },
  ]);
  const [selectedCat, setSelectedCat] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const form = formRef.current;
    const data = {
      name: form["name"].value,
      category: form["category"].value,
      description: form["description"].value,
      price: form["price"].value,
      brand: form["brand"].value,
      color: form["color"].value,
      material: form["material"].value,
      inStock: form["inStock"].value,
      productSize: form["productSize"].value,
    };

    try {
      const response = await axios.put(
        `https://localhost:8080/api/v1/seller/1/products/${productId}`,
        { product: data, photos: form["image"].files },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch(setLoading(false));
      console.log("Response:", response.data);
      toast.success("Successfully edited!");
    } catch (error) {
      dispatch(setLoading(false));
      console.error("Error:", error);
      toast.error("Error");
      // Handle error
    }
  };
  const fetchData = () => {
    dispatch(setLoading(true));
    axios.get("http://localhost:8080/api/v1/products/" + productId).then((response) => {
      dispatch(setLoading(false));
      const product = response.data;
      if (formRef.current) {
        formRef.current.name.value = product.name;
        formRef.current.description.value = product.description;
        formRef.current.price.value = product.price;
        formRef.current.inStock.value = product.inStock;
        formRef.current.productSize.value = product.productSize;
        formRef.current.color.value = product.color;
        formRef.current.material.value = product.material;
        formRef.current.brand.value = product.brand;
        formRef.current.photos.value = product.photos;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [productId]);
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
            <CustomButton text="Save Product" type="submit" />
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
              name="inStock"
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
              name="productSize"
              type="text"
              placeholder="Size"
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
