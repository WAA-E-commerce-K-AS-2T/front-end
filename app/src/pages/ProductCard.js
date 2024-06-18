import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
const ProductCard = ({
  id,
  image,
  name,
  price,
  description,
  rating,
  reviews,
}) => {
  return (
    <Link to={`/product/${id}`} className="block">
      <div className="flex flex-col items-center justify-start w-full h-full p-4 border border-gray-200 rounded-lg shadow-md">
        <img src={image} alt={name} className="w-20 h-20 mb-2" />
        <span className="text-sm font-bold text-gray-900">$ {price}</span>
        <span className="text-sm text-gray-700">{name}</span>
        <span className="text-xs text-gray-500">{description}</span>
        <div className="flex items-center mt-2">
          <span className="inline-flex text-[#000] mr-1">
            {" "}
            {[...Array(Math.round(rating))].map((_, index) => (
              <StarIcon
                key={index}
                className="w-4 h-4 text-yellow-500 flex-shrink-0"
              />
            ))}
            {[...Array(5 - Math.round(rating))].map((_, index) => (
              <StarIcon
                key={index}
                className="w-4 h-4 text-gray-300 flex-shrink-0"
              />
            ))}
          </span>
          <span className="text-xs text-gray-500 ml-1 truncate">
            ({reviews} reviews)
          </span>
          <span className=" [clip:rect(1px_1px_1px_1px)!important] [clip-path:inset(50%)!important] !h-[1px] !overflow-hidden !p-0 !absolute !whitespace-nowrap !w-px">
            {rating} out of 5 Stars. {reviews} reviews
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
