"use client";

import { useRef, useState } from "react";
import axios from "axios";
import SimpleModal from "@/components/SimpleModal";
import { redirect, useRouter } from "next/navigation";

export default function Details() {
  const Alert = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    matricNumber: "",
    pinToken: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.fullName ||
      !formData.pinToken ||
      !formData.matricNumber
    ) {
      Alert.current.openModal({
        msg: "Please fill up the required field",
        sta: false,
      });
      return;
    }
    try {
      // Make a POST request using Axios
      const response = await (await axios.post("/api", formData)).data;
      Alert.current.openModal({
        msg: await response.message,
        sta: true,
      });
    } catch (error) {
      console.log(error);
      // Handle errors
      Alert.current.openModal({
        msg: error.response.data.message,
        sta: false,
      });
    } finally {
      router.push("/");
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit}>
          {/* Example input for email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              required
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="matricNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Matric Number
            </label>
            <input
              type="text"
              required
              value={formData.matricNumber}
              onChange={handleChange}
              id="matricNumber"
              title="Enter a Valid Matric Number"
              name="matricNumber"
              placeholder="FUKU/SCI/20/Com/0207"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pinToken"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Pin Token
            </label>
            <input
              type="text"
              required
              value={formData.pinToken}
              onChange={handleChange}
              id="pinToken"
              name="pinToken"
              placeholder="token"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            // onClick={()}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <SimpleModal ref={Alert}></SimpleModal>
    </div>
  );
}
