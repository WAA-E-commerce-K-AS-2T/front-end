import React from "react";
import { useForm, Controller } from "react-hook-form";
import { StarIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
  });

  const rating = watch("rating");

  const handleStarClick = (index) => {
    setValue("rating", index + 1, { shouldValidate: true });
  };

  const submitForm = (data) => {
    onSubmit(data);

    onClose();
    toast.success("Succesfully reviewed!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <Controller
            name="rating"
            control={control}
            rules={{ required: true, min: 1 }}
            render={({ field: { value, onChange } }) => (
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`w-8 h-8 cursor-pointer ${
                      index < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
            )}
          />
          <Controller
            name="reviewText"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full p-2 border rounded-lg mb-4"
                rows="4"
                placeholder="Write your review here..."
              />
            )}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2">
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-teal-500 text-white px-4 py-2 rounded-lg ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isValid}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
