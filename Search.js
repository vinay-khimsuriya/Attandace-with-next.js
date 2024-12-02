"use client";
import React from "react";

export default function Search() {
  return (
    <div className="w-[35%] flex items-center text-primary justify-between px-5 py-2 border-primary border-1 rounded-full">
      <input
        className="w-full text-thirteen leadind outline-0"
        placeholder="Search..."
      />
      <IoIosSearch className="text-xl " />
    </div>
  );
}
