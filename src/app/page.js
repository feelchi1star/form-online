import Link from "next/link";
import React from "react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex px-4 items-center justify-center bg-blue-500 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Group 7 Site</h1>
        <p className="text-lg">To get started, follow these simple steps:</p>
        <ol className="text-left mt-4">
          <li className="mb-2">Step 1: Provide your full name.</li>
          <li className="mb-2">Step 2: Enter your email address.</li>
          <li className="mb-2">Step 3: Fill in your matriculation number.</li>
          <li className="mb-2">
            Step 4: Provide your token. If you don't have any, click on the
            whatsapp Icon to get one.
          </li>
        </ol>
        <div className="mt-4">
          <Link
            href={"/send-details"}
            className=" bg-white shadow-sm rounded p-2 text-black"
          >
            Go to Form
          </Link>
        </div>
        <p className="mt-4">
          If you have any questions, feel free to reach out!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
