"use client";
import React from "react";

const CustomForm = () => {
  return (
    <div>
      {/* <h1>custom form</h1> */}
      <form>
        <div className="px-2">
          <div className="flex justify-between my-1 px-2 ">
            <lable htmlFor="name" className=" text">
              <span className="mx-2">name</span>
              <span className="font-poppins mx-2">name</span>
              <span className="font-serif mx-2">name</span>
            </lable>

            <lable className="text-gray-500 text-sm cursor-pointer hover:underline hover:text-blue-500">
              forgot password
            </lable>
          </div>
          <input
            className="w-full border py-1 px-2 rounded-md focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-300"
            name="name"
            value=""
            placeholder="name"
          />
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
