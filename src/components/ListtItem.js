"use client";
import React from "react";

const ListtItem = ({ e }) => {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  return (
    <li
      onClick={() => {
        navigator.clipboard
          .writeText(e.matricNumber.toUpperCase())
          .then(() => {
            setCopied(true);
          })
          .catch((e) => alert("Failed to copy to ClipBoard"));
      }}
      className="flex p-2 cursor-copy shadow-sm bg-stone-100 my-2 rounded-md flex-col gap-1"
    >
      <h4 className="font-bold">{e.name}</h4>
      <p
        className={`text-sm transition-all delay-200 ease-in ${
          copied ? "text-green-500" : ""
        }`}
      >
        {copied ? "copied" : e.matricNumber}
      </p>
      <p className="text-sm">{e.email}</p>
    </li>
  );
};

export default ListtItem;
