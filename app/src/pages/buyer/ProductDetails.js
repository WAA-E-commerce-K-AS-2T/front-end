import React, { useEffect, useState } from "react";
import { productData } from "../../utils/data";
import Breadcrumb from "../../components/common/Breadcrumb";
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
      setAllReviews([
        ...allReviews,
        {
          rating: review.rating,
          comment: review.reviewText,
          createdDate: new Date().toLocaleDateString(),
          createdBy: user?.fullName,
        },
      ]);
      toast.success("Review submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const data = {
      productId: id,
      quantity: 1,
    };
    try {
      await axios.post("http://localhost:8080/api/v1/cart/cartItems", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${id}`
        );
        setProductDetails1(response.data);
        setAllReviews(response.data?.reviews || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left side: Breadcrumbs, image, and variant options */}
        <div className="flex-1 lg:w-1/4 flex flex-col p-4 rounded-lg">
          <div className="flex-1">
            <img
              src={productDetails1.productPhotos?.[0]?.imageUrl}
              alt="image of product"
              className="w-full h-auto mb-4 lg:mb-0"
            />
          </div>
          <div className="flex-1 flex flex-wrap gap-2 justify-left mt-4">
            {productDetails1.productPhotos?.map((photo, index) => (
              <>
                {" "}
                <img
                  key={index}
                  src={photo.imageUrl}
                  alt={`Variant ${index}`}
                  className="w-1/3 h-1/3 p-4 object-cover border border-gray-300 rounded-md"
                />
              </>
            ))}
          </div>
        </div>

        {/* Right side: Product details and reviews */}
        <div className="flex-1 lg:w-3/4">
          <div className="border border-gray-300 rounded-lg p-6 mb-4">
            <div className="box-border flex flex-row justify-between w-full">
              <div className="box-border mt-0 ml-4 mr-4 text-xl font-semibold">
                Name of seller
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">{productDetails1?.name}</h1>
            <div className="text-2xl font-semibold text-gray-900 mb-4">
              ${productDetails1?.price}
            </div>
            <div className="box-border flex flex-wrap h-auto pb-3">
              <div className="flex items-center justify-center w-full">
                <span
                  className="inline-flex mr-1 text-black"
                  itemProp="ratingValue">
                  {renderStars(productDetails1?.averageRating, "black")}
                </span>
                <span className="text-lg">
                  {productDetails1?.averageRating?.toFixed(1)}
                </span>
                <span className="text-lg">
                  &nbsp; out of {productDetails1.totalReviews} reviews
                </span>
              </div>
            </div>
            {user?.auth_type === "buyer" ? (
              <button
                className="bg-black text-white px-6 py-3 rounded-lg mb-4 text-lg"
                onClick={addToCart}>
                Add to Cart
              </button>
            ) : (
              <></>
            )}

            {/* Description in bordered box */}
            <p className="text-lg text-gray-700">
              {productDetails1.description}
            </p>
          </div>

          {/* About this item section */}
          <div>
            <h2
              className="text-2xl font-semibold mb-4 cursor-pointer"
              onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}>
              About this item
            </h2>
            {!isAboutCollapsed && (
              <p className="text-lg text-gray-700 mb-4">
                {productDetails1.description}
              </p>
            )}

            <hr className="border-t border-gray-300 my-4" />

            <h3
              className="text-2xl font-semibold mb-4 cursor-pointer"
              onClick={() => setIsSpecsCollapsed(!isSpecsCollapsed)}>
              Specifications
            </h3>
            {!isSpecsCollapsed && (
              <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
                <li>
                  <span className="text-xl font-bold">Color: </span>
                  {productDetails1.color}
                </li>
                <li>
                  <span className="text-xl font-bold">Material: </span>
                  {productDetails1.material}
                </li>
                <li>
                  <span className="text-xl font-bold">Size: </span>
                  {productDetails1.productSize}
                </li>
                <li>
                  <span className="text-xl font-bold">Brand: </span>
                  {productDetails1.brand}
                </li>
              </ul>
            )}
          </div>
          <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
          {allReviews?.map((review, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 p-4 rounded-lg">
              <div className="flex justify-center">
                {renderStars(review?.rating, "yellow")}
              </div>
              <div className="text-lg text-gray-700">{review.comment}</div>
              <div className="text-sm text-gray-500">
                {new Date(review.createdDate).toLocaleDateString()} by{" "}
                {review?.createdBy}
              </div>
            </div>
          ))}
          {user?.auth_type === "buyer" ? (
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-black text-white px-6 py-3 rounded-lg mr-4 hover:bg-teal-500 hover:text-black hover:border-2 hover:border-gray-500">
              Write a Review
            </button>
          ) : null}
          <button
            type="button"
            className="border-2 border-gray-500 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-teal-500 hover:text-white">
            Load more...
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
