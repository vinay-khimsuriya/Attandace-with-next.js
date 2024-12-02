"use client";

import React, { useEffect, useState } from "react";

const Attandance = () => {
  const [isClockIn, setIsClockIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [timeCount, setTimeCount] = useState(null);
  const [startTimeCount, setStartTimeCount] = useState(null);
  const [stopTimeCount, setStopTimeCount] = useState(null);
  const [clockInCount, setClockInCount] = useState(0);
  const [clockOutCount, setClockOutCount] = useState(0);
  const [AmPm, setAmPm] = useState(null);

  useEffect(() => {
    if (new Date().getHours() > 11) {
      setAmPm("PM");
    } else {
      setAmPm("AM");
    }
  }, []);
  useEffect(() => {
    if (stopTimeCount !== null && startTimeCount !== null) {
      const count = stopTimeCount - startTimeCount;
      const hours = Math.floor(count / 60);
      const minutes = count % 60;
      setTimeCount(`${hours}h ${minutes}m`);
    }
  }, [stopTimeCount, startTimeCount]);

  const handleClockButton = () => {
    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();

    if (clockInCount === 0 || clockOutCount === 0) {
      if (!isClockIn) {
        setStartTime(`${hours}:${minuts.toString().padStart(2, "0")} ${AmPm}`);
        // setStartTimeCount(hours * 60 + minuts);

        setStartTimeCount((prevCount) => {
          const newStartTimeCount = hours * 60 + minuts;
          console.log("Previous Start Count: ", prevCount);
          console.log("New Start Count: ", newStartTimeCount);
          return newStartTimeCount;
        });
        setClockInCount(1);
        setIsClockIn(true);
      } else {
        setStopTime(`${hours}:${minuts.toString().padStart(2, "0")} ${AmPm}`);

        // setStopTimeCount(hours * 60 + minuts);

        setStopTimeCount((prevCount) => {
          const newStopTimeCount = hours * 60 + minuts;
          console.log("Previous Stop Count: ", prevCount);
          console.log("New Stop Count: ", newStopTimeCount);
          return newStopTimeCount;
        });
        console.log("Start Time >>>>>" + startTimeCount);
        console.log(" Stop Time >>>>>" + stopTimeCount);

        setClockOutCount(1);
        setIsClockIn(false);
      }
    } else {
      alert("Already Clock Done");
      setIsClockIn(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <button
          className="btn bg-black text-white block"
          onClick={handleClockButton}
        >
          {isClockIn ? "Clock Out" : "Clock In"}
        </button>
        <p>Clock In at:{startTime}</p>
        <p>Clock Out at:{stopTime}</p>
        <p>Total Time Count:{timeCount}</p>
      </div>
    </div>
  );
};

export default Attandance;
