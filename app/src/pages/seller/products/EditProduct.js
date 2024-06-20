import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CustomButton from "../../../components/controllers/CustomButton";
import { useNavigate, useParams } from "react-router";
import { setLoading } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const EditProduct = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState("");

  const fetchData = () => {
    dispatch(setLoading(true));
    axios.get("http://localhost:8080/api/v1/products/" + id).then((response) => {
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
        // formRef.current.images.value = product.productPhotos[0].url;
      }
    });
  };
  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getAllCategory();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find((category) => category.id.toString() === selectedCategoryId);
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
    setSelectedCat([selectedCategoryId]);
    setSelectedSubCat("");
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value;
    setSelectedSubCat(selectedSubCategoryId);
    setSelectedCat((prev) => [prev[0], selectedSubCategoryId]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = {
      name: form["name"].value,
      category: selectedCat[0],
      subCategory: selectedCat[1],
      description: form["description"].value,
      price: form["price"].value,
      brand: form["brand"].value,
      color: form["color"].value,
      material: form["material"].value,
      inStock: form["inStock"].value,
      productSize: form["productSize"].value,
    };

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("product", new Blob([JSON.stringify(data)], { type: "application/json" }));
      Array.from(form["images"].files).forEach((file) => {
        formData.append("photos", file);
      });

      const response = await axios.post("http://localhost:8080/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      toast.success("Successfully added!");
      navigate("/seller/products");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      <p className="text-3xl text-left mx-24 my-8">Add product</p>
      <form className="customForm grid-cols-2 gap-8" ref={formRef} onSubmit={handleSubmit}>
        <div className="col-span-1">
          <div>
            <label htmlFor="name">Name</label>
            <input className="focus:outline-teal-500" id="name" name="name" type="text" placeholder="Product name" required />
          </div>
          <div className="mt-4">
            <label htmlFor="categories">Categories</label>
            <div className="flex gap-4">
              <select
                className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
                name="category"
                onChange={handleCategoryChange}
                value={selectedCat[0] || ""}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
                name="subCategory"
                onChange={handleSubCategoryChange}
                value={selectedSubCat}
                disabled={!subCategories.length}>
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
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
            <input type="file" name="images" multiple accept="image/*" />
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
              name="inStock"
              type="number"
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
            <label htmlFor="material">Material</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="material"
              name="material"
              type="text"
              placeholder="Material"
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
