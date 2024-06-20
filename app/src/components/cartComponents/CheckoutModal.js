import React from "react";
import Modal from "../Modal";

const CheckoutModal = ({
  isModalVisible,
  handleModalClose,
  handleDownloadReceipt,
}) => {
  if (!isModalVisible) return null;

  return (
    <Modal onClose={handleModalClose}>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">
          Purchase Successful
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your purchase! Would you like to download the receipt?
        </p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
            Close
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black">
            Download Receipt
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
