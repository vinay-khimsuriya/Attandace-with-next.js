"use client";

import React, { useState } from "react";

const DailyTimeCount = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [workedTime, setWorkedTime] = useState(null);
  const [isClockedOnce, setIsClockedOnce] = useState(false);

  const clockIn = localStorage.getItem("clock in");

  const formateTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    let startTime = hours + ":" + minutes + " " + ampm;

    return startTime;
  };

  const calculateWorkedTime = (stopTime) => {
    if (startTime) {
      const differanceTime = stopTime - startTime;
      const differanceHours = Math.floor(differanceTime / (1000 * 60 * 60));
      const differanceMinutes = Math.floor(
        (differanceTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      setWorkedTime(`${differanceHours} H ${differanceMinutes} M`);
    }
  };

  const handleClockButton = () => {
    if (!isClockedIn && !isClockedOnce) {
      const currentTime = new Date();
      setStartTime(currentTime);
      setIsClockedIn(true);
      setStopTime(null);
      localStorage.setItem("clock in", currentTime);
    } else {
      const currentTime = new Date();
      setStopTime(currentTime);
      setIsClockedIn(false);
      calculateWorkedTime(currentTime);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <button
          className="btn bg-black text-white block"
          onClick={handleClockButton}
        >
          {isClockedIn ? "Clock In" : "Clock Out"}
        </button>
        <div className="flex items-center">
          <p className="">
            Clock In at:{" "}
            <b className=" font-serif text-lg">
              {startTime ? formateTime(startTime) : "--"}
            </b>
          </p>
        </div>
        <div className="flex items-center">
          <p className="">
            Clock Out at:{" "}
            <b className=" font-serif text-lg">
              {stopTime ? formateTime(stopTime) : "--"}
            </b>
          </p>
        </div>
        <div className="flex items-center">
          <p className="">
            Total Worked Time:
            <b className=" font-serif text-lg">{stopTime && workedTime}</b>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyTimeCount;
