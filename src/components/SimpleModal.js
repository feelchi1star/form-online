import { useState, forwardRef, useImperativeHandle } from "react";

const SimpleModal = forwardRef((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const openModal = ({ msg, sta = false }) => {
    setIsModalOpen(true);
    setMessage(msg);
    setStatus(sta);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
    setStatus(false);
  };

  // Expose functions to parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  return (
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="modal bg-white p-8 z-10 rounded shadow-md w-96">
            <div className="modal-header flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notification</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
            <div className="modal-content">
              <p
                className={`text-center leading-6 text-sm ${
                  status ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default SimpleModal;
