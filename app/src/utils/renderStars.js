import { StarIcon } from "@heroicons/react/solid";

export const renderStars = (rating, color) => {
  if (!rating || isNaN(rating)) return null;
  console.log("lllllll", rating);

  const roundedRating = Math.floor(rating);
  return (
    <>
      {[...Array(roundedRating)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 text-${color}-500 flex-shrink-0`}
        />
      ))}
      {[...Array(5 - roundedRating)].map((_, i) => (
        <StarIcon key={i} className={`w-4 h-4 text-gray-500 flex-shrink-0`} />
      ))}
    </>
  );
};
