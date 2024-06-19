import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../Breadcrumb";
import CheckoutModal from "./CheckoutModal";
import swal from "sweetalert";

const ShippingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDownloadReceipt = () => {
    // Logic for downloading the receipt
    console.log("Receipt downloaded");
    handleModalClose();
  };
  const onSubmit = (data) => {
    console.log(data);
    setIsModalVisible(true);
    swal("Hello world!");

    // Handle form submission
  };

  return (
    <div className="container h-11 p-4">
      <span className="h-4">
        <Breadcrumb />
      </span>
      <p className="text-3xl text-left mx-24 my-8">Shipping Information</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="customForm grid-cols-2 gap-8">
        <div className="col-span-1">
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="focus:outline-teal-500"
              id="name"
              type="text"
              placeholder="Full Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="address">Address</label>
            <textarea
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              rows="3"
              id="address"
              placeholder="Shipping Address"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-500">Address is required</span>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="city">City</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="city"
              type="text"
              placeholder="City"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span className="text-red-500">City is required</span>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="postalCode"
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", { required: true })}
            />
            {errors.postalCode && (
              <span className="text-red-500">Postal Code is required</span>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="country">Country</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="country"
              type="text"
              placeholder="Country"
              {...register("country", { required: true })}
            />
            {errors.country && (
              <span className="text-red-500">Country is required</span>
            )}
          </div>
        </div>
        <div className="container p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-xl text-left mt-4 mb-2">PAYMENT METHOD</p>
            <p className="text-sm text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <label className="flex items-center mb-4">
                <input
                  type="radio"
                  value="Credit Card"
                  {...register("paymentMethod", { required: true })}
                  onChange={handlePaymentChange}
                  className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out mr-2"
                />
                <span className="font-medium">Credit Card</span>
              </label>
              {selectedPaymentMethod === "Credit Card" && (
                <div className="mt-2">
                  <label htmlFor="ccNumber">Card number</label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    id="ccNumber"
                    type="text"
                    placeholder="Card number"
                    {...register("ccNumber", { required: true })}
                  />
                  {errors.ccNumber && (
                    <span className="text-red-500">
                      Card number is required
                    </span>
                  )}

                  <label htmlFor="ccName" className="mt-2 block">
                    Name on card
                  </label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    id="ccName"
                    type="text"
                    placeholder="Name on card"
                    {...register("ccName", { required: true })}
                  />
                  {errors.ccName && (
                    <span className="text-red-500">
                      Name on card is required
                    </span>
                  )}

                  <label htmlFor="ccExpiry" className="mt-2 block">
                    Expiration date (MM / YY)
                  </label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    id="ccExpiry"
                    type="text"
                    placeholder="MM / YY"
                    {...register("ccExpiry", { required: true })}
                  />
                  {errors.ccExpiry && (
                    <span className="text-red-500">
                      Expiration date is required
                    </span>
                  )}

                  <label htmlFor="ccCVV" className="mt-2 block">
                    Security code
                  </label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    id="ccCVV"
                    type="text"
                    placeholder="Security code"
                    {...register("ccCVV", { required: true })}
                  />
                  {errors.ccCVV && (
                    <span className="text-red-500">
                      Security code is required
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <label className="flex items-center mb-4">
                <input
                  type="radio"
                  value="PayPal"
                  {...register("paymentMethod", { required: true })}
                  onChange={handlePaymentChange}
                  className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out mr-2"
                />
                <span className="font-medium">PayPal</span>
              </label>
              {selectedPaymentMethod === "PayPal" && (
                <div className="mt-2">
                  <label htmlFor="paypalEmail">PayPal Email</label>
                  <input
                    className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                    id="paypalEmail"
                    type="email"
                    placeholder="PayPal Email"
                    {...register("paypalEmail", { required: true })}
                  />
                  {errors.paypalEmail && (
                    <span className="text-red-500">
                      PayPal Email is required
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="border border-gray-300 rounded-md p-4 mb-4">
              <label className="flex w-0">
                <input
                  type="radio"
                  value="Bank Transfer"
                  {...register("paymentMethod", { required: true })}
                  onChange={handlePaymentChange}
                />
                <span className="ml-2">Bank Transfer</span>
              </label>
              {selectedPaymentMethod === "Bank Transfer" && (
                <div className="mt-2">
                  <label className="mt-1 p-2" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
                    id="bankName"
                    type="text"
                    placeholder="Bank Name"
                    {...register("bankName", { required: true })}
                  />
                  {errors.bankName && (
                    <span className="text-red-500">Bank Name is required</span>
                  )}

                  <label htmlFor="accountNumber" className="mt-1 p-2 block">
                    Account Number
                  </label>
                  <input
                    className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
                    id="accountNumber"
                    type="text"
                    placeholder="Account Number"
                    {...register("accountNumber", { required: true })}
                  />
                  {errors.accountNumber && (
                    <span className="text-red-500">
                      Account Number is required
                    </span>
                  )}
                </div>
              )}
            </div>

            {errors.paymentMethod && (
              <span className="text-red-500">Payment method is required</span>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md mt-4">
              Pay now
            </button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
