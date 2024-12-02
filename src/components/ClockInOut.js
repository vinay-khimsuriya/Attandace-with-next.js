"use client";

import React, { useState } from "react";

const ClockInOut = () => {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [workedTime, setWorkedTime] = useState("");

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12; // 1%12 = 1, 2%12 = 2 and 12%12 = 0

    // hours = 3%12 => hours = 3
    hours = hours ? hours : 12;

    // hours = 3 ? 3  : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const handleClockInOut = () => {
    if (!isClockedIn) {
      const currentTime = new Date();
      setClockInTime(currentTime);
      setIsClockedIn(true);
      setClockOutTime(null);
    } else {
      const currentTime = new Date();
      setClockOutTime(currentTime);
      setIsClockedIn(false);
      calculateWorkedTime(currentTime);
    }
  };

  const calculateWorkedTime = (clockOut) => {
    if (clockInTime) {
      console.log(">>>>>>>>>>" + clockInTime);
      console.log("-----------" + clockOut);
      const diffMs = clockOut - clockInTime;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setWorkedTime(`${diffHours}h ${diffMinutes}m`);
    }
  };

  return (
    <div>
      <button
        className="btn bg-black text-white block"
        onClick={handleClockInOut}
      >
        {isClockedIn ? "Clock Out" : "Clock In"}
      </button>
      <div>
        <p>Clock In Time: {clockInTime ? formatTime(clockInTime) : "--"}</p>
        <p>Clock Out Time: {clockOutTime ? formatTime(clockOutTime) : "--"}</p>
        {clockOutTime && <p>Worked Time: {workedTime}</p>}
      </div>
    </div>
  );
};

export default ClockInOut;
