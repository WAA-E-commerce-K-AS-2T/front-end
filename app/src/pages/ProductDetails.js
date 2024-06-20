import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { productData, productDetails } from "../utils/data";
import OIP from "./../assets/images/OIP.png";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import Breadcrumb from "../components/Breadcrumb";

const ProductDetails = (props) => {
  const { name, image, price, description, details, specifications, reviews } =
    productDetails;
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(false);
  const [isSpecsCollapsed, setIsSpecsCollapsed] = useState(false);
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col lg:flex-row lg:space-x-8'>
        {/* Left side: Breadcrumbs, image, and variant options */}
        <div className='flex-1 lg:w-1/4 flex flex-col'>
          {/* <nav className="text-sm text-gray-600 mb-4 flex-col">
            <a href="/" className="hover:underline">
              Home
            </a>{" "}
            &gt;
            <a href="/category" className="hover:underline">
              {" "}
              Category
            </a>{" "}
            &gt;
            <span> {name}</span>
          </nav> */}
          <Breadcrumb />

          <div className='flex-1'>
            <img src={OIP} alt={name} className='w-full h-auto mb-4 lg:mb-0' />
          </div>
          <div className='flex-1'>
            {/* Variant options */}
            <div className='p-4 bg-gray-100 rounded-lg mb-4'>
              {/* Color options */}
              <div className='mb-4'>
                <label className='block text-lg font-bold text-gray-900 mb-2'>
                  Color
                </label>
                <div className='flex justify-center flex-wrap gap-4'>
                  {productData.colors.map((color, index) => (
                    <label key={index} className='inline-flex items-center'>
                      <input
                        type='radio'
                        name='color'
                        value={color}
                        className='form-radio h-6 w-6 text-blue-600'
                      />
                      <span className='ml-2 text-md text-gray-800'>
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Brand options */}
              <div className='mb-4'>
                <label className='block text-lg font-bold text-gray-900 mb-2'>
                  Brand
                </label>
                <div className='flex justify-center flex-wrap gap-4'>
                  {productData.brands.map((brand, index) => (
                    <label key={index} className='inline-flex items-center'>
                      <input
                        type='radio'
                        name='brand'
                        value={brand}
                        className='form-radio h-6 w-6 text-blue-600'
                      />
                      <span className='ml-2 text-md text-gray-800'>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Material options */}
              <div className='mb-4'>
                <label className='block text-lg font-bold text-gray-900 mb-2'>
                  Material
                </label>
                <div className='flex justify-center flex-wrap gap-4'>
                  {productData.materials.map((material, index) => (
                    <label key={index} className='inline-flex items-center'>
                      <input
                        type='radio'
                        name='material'
                        value={material}
                        className='form-radio h-6 w-6 text-blue-600'
                      />
                      <span className='ml-2 text-md text-gray-800'>
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Size options */}
              <div className='mb-4'>
                <label className='block text-lg font-bold text-gray-900 mb-2'>
                  Size
                </label>
                <div className='flex justify-center flex-wrap gap-4'>
                  {productData.sizes.map((size, index) => (
                    <label key={index} className='inline-flex items-center'>
                      <input
                        type='radio'
                        name='size'
                        value={size}
                        className='form-radio h-6 w-6 text-blue-600'
                      />
                      <span className='ml-2 text-md text-gray-800'>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Product details and reviews */}
        <div className='flex-1 lg:w-3/4'>
          <div className='border border-gray-300 rounded-lg p-4 mb-4'>
            <div className='box-border flex flex-row justify-between w-full'>
              <div className='box-border mt-0 ml-4 mr-4'>Name of seller</div>
            </div>
            <h1 className='text-2xl font-bold mb-2'>{name}</h1>
            <div className='text-lg font-semibold text-gray-900 mb-2'>
              ${price}
            </div>
            <div className='box-border flex flex-wrap h-auto pb-3'>
              <div className='flex items-center justify-center w-full'>
                <span
                  className='inline-flex mr-1 text-black'
                  itemProp='ratingValue'
                >
                  {[...Array(Math.round(averageRating))].map((_, i) => (
                    <StarIcon
                      key={i}
                      className='w-4 h-4 text-black-500 flex-shrink-0'
                    />
                  ))}
                  {[...Array(5 - Math.round(averageRating))].map((_, i) => (
                    <StarIcon
                      key={i}
                      className='w-4 h-4 text-gray-300 flex-shrink-0'
                    />
                  ))}
                </span>
                <span className='text-xs'>({averageRating.toFixed(1)})</span>
                <span className='text-xs'>
                  {" "}
                  out of {reviews.length} reviews
                </span>
              </div>
            </div>

            <button className='bg-teal-500 text-white px-4 py-2 rounded-lg mb-4'>
              Add to Cart
            </button>

            {/* Description in bordered box */}
            <p className='text-sm text-gray-700'>{description}</p>
          </div>

          {/* About this item section */}
          <div>
            <h2
              className='text-lg font-semibold mb-2 cursor-pointer'
              onClick={() => setIsAboutCollapsed(!isAboutCollapsed)}
            >
              About this item
            </h2>
            {/* {isAboutCollapsed ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            )} */}

            {!isAboutCollapsed && (
              <p className='text-sm text-gray-700 mb-4'>{details}</p>
            )}

            <hr className='border-t border-gray-300 my-4' />

            <h3
              className='text-md font-semibold mb-2 cursor-pointer'
              onClick={() => setIsSpecsCollapsed(!isSpecsCollapsed)}
            >
              Specifications
            </h3>
            {!isSpecsCollapsed && (
              <ul className='list-disc list-inside text-sm text-gray-700 mb-4'>
                {Object.entries(specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong>
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3 className='text-md font-semibold mb-2'>Customer Reviews</h3>
          {reviews.map((review, index) => (
            <div
              key={index}
              className='mb-4 border border-gray-300 p-4 rounded-lg'
            >
              <div className='flex  justify-center'>
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className='w-4 h-4 text-yellow-500 flex-shrink-0'
                  />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className='w-4 h-4 text-gray-300 flex-shrink-0'
                  />
                ))}
              </div>
              <div className='text-sm font-semibold text-gray-900'>
                {review.contentSummary}
              </div>
              <div className='text-sm text-gray-700'>{review.content}</div>
              <div className='text-xs text-gray-500'>
                {review.date} by {review.reviewer}
              </div>
            </div>
          ))}
          <button className='bg-teal-500 text-gray-300 px-4 py-2 rounded-lg'>
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
