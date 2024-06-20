import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { renderStars } from "../utils/renderStars";
const ProductCard = ({
  id,
  image,
  name,
  price,
  description,
  reviews,
  totalReviews,
  averageRating,
}) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="flex flex-col items-center justify-start w-full h-full p-4 border border-gray-200 rounded-lg shadow-md">
        <img src={image[0].imageUrl} alt={name} className="w-20 h-20 mb-2" />
        <span className="text-sm font-bold text-gray-900">$ {price}</span>
        <span className="text-sm text-gray-700">{name}</span>
        <span className="text-xs text-gray-500">{description}</span>
        <span className="flex items-center mt-2">
          <span className="inline-flex text-[#000] mr-1">
            {renderStars(averageRating, "yellow")}
          </span>
          <span className="text-xs text-gray-500 ml-1 truncate">
            ({reviews ? reviews : "No reviews to show"})
          </span>
          <span className=" [clip:rect(1px_1px_1px_1px)!important] [clip-path:inset(50%)!important] !h-[1px] !overflow-hidden !p-0 !absolute !whitespace-nowrap !w-px">
            {averageRating} out of 5 Stars. {totalReviews} reviews
          </span>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
