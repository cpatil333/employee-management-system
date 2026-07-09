import React from "react";

export default function ActionButtons() {
  return (
    <div>
      <button className="bg-blue-800 text-white p-1 m-1 w-20">👁 View</button>
      <button className="bg-blue-800 text-white p-1 m-1 w-20">✏ Edit</button>
      <button className="bg-red-800 text-white p-1 m-1 w-20">🗑 Delete</button>
    </div>
  );
}
