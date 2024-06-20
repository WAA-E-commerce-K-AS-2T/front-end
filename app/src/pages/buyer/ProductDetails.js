import React, { useEffect, useState } from "react";
import { productData } from "../../utils/data";
import Breadcrumb from "../../components/Breadcrumb";
import ReviewModal from "../../components/product/ReviewModal";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { renderStars } from "../../utils/renderStars";
import toast from "react-hot-toast";

const ProductDetails = (props) => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [productDetails1, setProductDetails1] = useState({});
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(false);
  const [isSpecsCollapsed, setIsSpecsCollapsed] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [allReviews, setAllReviews] = useState([]);

  const handleReviewSubmit = async (review) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/products/${id}/reviews`,
        { rating: review.rating, comment: review.reviewText }
      );
    } catch (error) {
      console.log(error);
    }
    setAllReviews([
      ...productDetails1?.reviews,
      {
        ...review,
        comment: review.reviewText,
        date: new Date().toLocaleDateString(),
        reviewer: user.fullName,
      },
    ]);
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const data = {
      productId: id,
      quantity: 1,
    };
    try {
      axios.post("http://localhost:8080/api/v1/cart/cartItems", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item added to cart");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${id}`
        );
        setProductDetails1(response.data);
        setAllReviews(response.data?.reviews);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left side: Breadcrumbs, image, and variant options */}
        <div className="flex-1 lg:w-1/4 flex flex-col">
          <Breadcrumb />
          <div className="flex-1">
            <img
              src={productDetails1.productPhotos?.[0]?.imageUrl}
              // src={OIP}
              alt="image of product"
              className="w-full h-auto mb-4 lg:mb-0"
            />
          </div>
          <div className="flex-1">
            {/* Variant options */}
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
              {/* Color options */}
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Color
                </label>
                <div className="flex justify-center flex-wrap gap-4">
                  {productData.colors.map((color, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        className="form-radio h-6 w-6 text-blue-600"
                      />
                      <span className="ml-2 text-md text-gray-800">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Brand options */}
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Brand
                </label>
                <div className="flex justify-center flex-wrap gap-4">
                  {productData.brands.map((brand, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        value={brand}
                        className="form-radio h-6 w-6 text-blue-600"
                      />
                      <span className="ml-2 text-md text-gray-800">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Material options */}
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Material
                </label>
                <div className="flex justify-center flex-wrap gap-4">
                  {productData.materials.map((material, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="material"
                        value={material}
                        className="form-radio h-6 w-6 text-blue-600"
                      />
                      <span className="ml-2 text-md text-gray-800">
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Size options */}
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-900 mb-2">
                  Size
                </label>
                <div className="flex justify-center flex-wrap gap-4">
                  {productData.sizes.map((size, index) => (
                    <label key={index} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="form-radio h-6 w-6 text-blue-600"
                      />
                      <span className="ml-2 text-md text-gray-800">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Product details and reviews */}
        <div className="flex-1 lg:w-3/4">
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <div className="box-border flex flex-row justify-between w-full">
              <div className="box-border mt-0 ml-4 mr-4">Name of seller</div>
            </div>
            <h1 className="text-2xl font-bold mb-2">{productDetails1?.name}</h1>
            <div className="text-lg font-semibold text-gray-900 mb-2">
              ${productDetails1?.price}
            </div>
            <div className="box-border flex flex-wrap h-auto pb-3">
              <div className="flex items-center justify-center w-full">
                <span
                  className="inline-flex mr-1 text-black"
                  itemProp="ratingValue">
                  {renderStars(productDetails1?.averageRating, "black")}
                </span>
                <span className="text-xs">
                  {/* {productDetails1?.averageRating.toFixed(1)} */}
                </span>
                <span className="text-xs">
                  &nbsp; out of {productDetails1.totalReviews} reviews
                </span>
              </div>
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-lg mb-4">
              Add to Cart
            </button>

            {/* Description in bordered box
            <p className="text-sm text-gray-700">
              {productDetails1.description}
            </p> */}
          </div>

          {/* About this item section */}
          <div>
            <h2
              className="text-lg font-semibold mb-2 cursor-pointer"
              onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>
              About this item
            </h2>
            {!isAboutCollapsed && (
              <p className="text-sm text-gray-700 mb-4">
                {productDetails1.description}
              </p>
            )}

            <hr className="border-t border-gray-300 my-4" />

            <h3
              className="text-md font-semibold mb-2 cursor-pointer"
              onClick={() => setIsSpecsCollapsed(!isSpecsCollapsed)}>
              Specifications
            </h3>
            {!isSpecsCollapsed && (
              <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                {/* {Object.entries(specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong>
                    {value}
                  </li>

                ))} */}
                <li>
                  <span className="text-md font-bold">Color: </span>
                  {productDetails1.color}
                </li>
                <li>
                  <span className="text-md font-bold">Material: </span>
                  {productDetails1.material}
                </li>
                <li>
                  <span className="text-md font-bold">Size: </span>
                  {productDetails1.productSize}
                </li>
                <li>
                  <span className="text-md font-bold">Brand: </span>
                  {productDetails1.brand}
                </li>
              </ul>
            )}
          </div>
          <h3 className="text-md font-semibold mb-2">Customer Reviews</h3>
          {allReviews?.map((review, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 p-4 rounded-lg">
              <div className="flex justify-center">
                {renderStars(review?.rating, "yellow")}
              </div>
              {/* <div className="text-sm font-semibold text-gray-900">
                {review.comment}
              </div> */}
              <div className="text-sm text-gray-700">{review.comment}</div>
              <div className="text-xs text-gray-500">
                {review.createdDate} by {review.createdBy}
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-lg">
            Write a Review
          </button>
        </div>
      </div>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default ProductDetails;
