import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "../Breadcrumb";
import CheckoutModal from "./CheckoutModal";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ShippingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const getBuyerAddress = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/v1/buyers/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setAddress(res.data))

      .catch((err) => console.log(err));
  };
  console.log("🚀 ~ getBuyerAddress ~ setAddress:", address);

  useEffect(() => {
    getBuyerAddress();
  }, []);

  useEffect(() => {
    if (address) {
      setValue("name", user?.fullName);
      setValue("address", address.address2);
      setValue("city", address.city);
      setValue("postalCode", address.zipcode);
      setValue("state", address.state);
    }
  }, [address, setValue]);

  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const onSubmit = async (data) => {
    setIsModalVisible(true);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8080/api/v1/orders",
        { paymentMethod: selectedPaymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      swal("Payment Successful!");
      navigate("/order");
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDownloadReceipt = () => {
    console.log("Receipt downloaded");
    handleModalClose();
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
            <label htmlFor="state">State</label>
            <input
              className="focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500"
              id="state"
              type="text"
              placeholder="state"
              {...register("state", { required: true })}
            />
            {errors.state && (
              <span className="text-red-500">State is required</span>
            )}
          </div>
        </div>
        <div className="container p-4">
          <p className="text-xl text-left mt-4 mb-2">PAYMENT METHOD</p>
          <p className="text-sm text-gray-500 mb-4">
            All transactions are secure and encrypted.
          </p>
          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <label className="flex items-center mb-4">
              <input
                type="radio"
                value="CREDIT_CARD"
                {...register("paymentMethod", { required: true })}
                onChange={handlePaymentChange}
                className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out mr-2"
              />
              <span className="font-medium">Credit Card</span>
            </label>
            {selectedPaymentMethod === "CREDIT_CARD" && (
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
                  <span className="text-red-500">Card number is required</span>
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
                  <span className="text-red-500">Name on card is required</span>
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
                value="PAYPAL"
                {...register("paymentMethod", { required: true })}
                onChange={handlePaymentChange}
                className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out mr-2"
              />
              <span className="font-medium">PayPal</span>
            </label>
            {selectedPaymentMethod === "PAYPAL" && (
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
                  <span className="text-red-500">PayPal Email is required</span>
                )}
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <label>
              <input
                type="radio"
                value="DEBIT_CARD"
                className="form-radio h-4 w-4 text-teal-600 transition duration-150 ease-in-out mr-2"
                {...register("paymentMethod", { required: true })}
                onChange={handlePaymentChange}
              />
              <span className="font-medium">Bank Transfer</span>
            </label>
            {selectedPaymentMethod === "DEBIT_CARD" && (
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
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
