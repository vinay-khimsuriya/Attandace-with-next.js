"use client";

import React, { useEffect, useState } from "react";

const DateObject = () => {
  const [clock, setClock] = useState();

  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [totalWorkedTime, setTotalWorkedTime] = useState(null);
  const [isClockedVisible, setIsClockedVisible] = useState(false);
  const [day, setDay] = useState(null);

  const [startTime, setStartTime] = useState();
  const [isStartTime, setIsStartTime] = useState(false);
  const [StopTime, setStopTime] = useState();
  const [isStopTime, setIsStopTime] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countBreakTime, setCountBreakTime] = useState(0);
  const [pausedTime, setPausedTime] = useState([]);
  const [resumeTime, setResumedTime] = useState([]);

  const [breakTime, setBreakTime] = useState();
  const [breakTimeCount, setBreakTimeCount] = useState();
  const [isBreakOverTime, setIsBreakTimeOver] = useState(false);
  const [workingTime, setWorkingTime] = useState();
  const [workingTimeCount, setWorkingTimeCount] = useState();
  const [isWorkingTimeCompleted, setIsWorkingTimeCompleted] = useState(false);

  const formateDate = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = hours + ":" + minutes + " " + ampm;
    // return `${hours} : ${minutes} ${ampm}`;
    return time;
  };

  const handleClockIn = () => {
    if (!isClockedIn) {
      const currentDate = new Date();
      setClockInTime(currentDate);
      setIsClockedIn(true);
      setIsClockedVisible(true);
    } else {
      const currentDate = new Date();

      setClockOutTime(currentDate);
      setIsClockedIn(false);
      setIsClockedVisible(true);
      countTotalWorkedTime(currentDate);
    }
  };

  const countTotalWorkedTime = (clockOutTime) => {
    if (clockInTime) {
      const timeDiff = clockOutTime - clockInTime;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      const timeCount = `${hours} H ${minutes} M ${seconds} S`;
      setTotalWorkedTime(timeCount);
    }
  };

  const calculateTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours} H ${minutes} M ${seconds} S`;
  };

  const handleWorkingTime = (time) => {
    const currentDate = new Date();
    const workingTime = currentDate - startTime - time;
    setWorkingTimeCount(workingTime);
    setWorkingTime(calculateTime(workingTime));
  };

  useEffect(() => {
    const currentDate = new Date();
    setClock(formateDate(currentDate));
    switch (currentDate.getDay()) {
      case 0:
        setDay("Sunday");
        break;
      case 1:
        setDay("Monday");
        break;
      case 2:
        setDay("Tuesday");
        break;
      case 3:
        setDay("Wednesday");
        break;
      case 4:
        setDay("Thursday");
        break;
      case 5:
        setDay("Friday");
        break;
      case 6:
        setDay("Saturday");
    }
    const timer = setInterval(() => {
      const currentDate = new Date();
      setClock(formateDate(currentDate));
    }, 1000 * 60);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleStart = () => {
    const currentDate = new Date();
    setStartTime(currentDate);
    setIsStartTime(true);
    setWorkingTime();
  };

  useEffect(() => {
    if (breakTimeCount > 1000 * 60 * 60) {
      setIsBreakTimeOver(true);
    }
    if (workingTimeCount > 9 * 1000 * 60 * 60) {
      setIsWorkingTimeCompleted(true);
    }
  }, [breakTimeCount, workingTimeCount]);

  const handleStop = () => {
    const currentDate = new Date();
    setStopTime(currentDate);
    setIsStopTime(true);
    if (isPaused) {
      setResumedTime((prev) => [...prev, currentDate]);
    }
    setBreakTime(calculateTime(countBreakTime));
  };

  const handlePause = () => {
    const currentDate = new Date();
    if (isStartTime) {
      if (isPaused && !isStopTime) {
        setResumedTime((prev) => [...prev, currentDate]);
        setIsPaused(false);

        const timeDiff = currentDate - pausedTime[pausedTime.length - 1];
        const totaltime = timeDiff + countBreakTime;
        setCountBreakTime(totaltime);
        setBreakTimeCount(totaltime);
        setBreakTime(calculateTime(totaltime));

        handleWorkingTime(totaltime);
      } else {
        setPausedTime((prev) => [...prev, currentDate]);
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-5">
        <div className="flex flex-col border border-gray-200 rounded-md content-between gap-3 py-2 order-last self-start my-3 lg:mys-0 px-2">
          <div className="flex gap-2 justify-between ">
            <div className="flex">
              <button
                className={`w-24 btn bg-green-500 ${
                  isStartTime ? "bg-gray-300" : ""
                }`}
                disabled={isStartTime}
                onClick={handleStart}
              >
                Start
              </button>
            </div>
            <div>
              <button
                className={`btn ${isPaused ? "bg-red-600" : "bg-orange-400"} ${
                  !isStartTime || isStopTime ? "bg-gray-300" : ""
                }`}
                disabled={!isStartTime || isStopTime}
                onClick={handlePause}
              >
                {isPaused ? "Resume" : " Pause"}
              </button>
            </div>
            <div>
              <button
                className={`w-24 btn bg-red-500 ${
                  isStopTime ? "bg-gray-300" : ""
                }`}
                disabled={isStopTime}
                onClick={handleStop}
              >
                Stop
              </button>
            </div>
          </div>
          <div
            className={`h-full flex flex-col gap-1 ${
              startTime ? "disabled" : ""
            }`}
          >
            <p>Start : {startTime && formateDate(startTime)}</p>
            <div className="h-20 flex flex-col gap-1 overflow-y-auto px-3">
              {pausedTime.map((item, index) => (
                <div key={index} className="flex justify-between gap-3">
                  <p>
                    Paused at :{" "}
                    <b className="text-red-600"> {formateDate(item)}</b>
                  </p>
                  <p>
                    Resumed at:{" "}
                    <b className="text-green-600">
                      {resumeTime[index]
                        ? formateDate(resumeTime[index])
                        : "--"}
                    </b>
                  </p>
                </div>
              ))}
            </div>
            <p>Stop : {StopTime && formateDate(StopTime)}</p>
            <p>
              Total Break Time :
              <b
                className={`px-2 ${
                  isBreakOverTime ? "text-red-500" : "text-green-500"
                }`}
              >
                {breakTime}
              </b>
            </p>
            <p>
              Total Worked Time :
              <b
                className={`px-2 ${
                  isWorkingTimeCompleted ? "text-green-500" : "text-red-500"
                }`}
              >
                {workingTime}
              </b>{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 self-end">
          <div className="flex border-gray-500 gap-5">
            <div className="flex flex-col justify-center items-start">
              <p>{clock}</p>
              <div className="text-xs text-gray-600 font-semibold">
                <p>{day}</p>
                {isClockedVisible && (
                  <p className="text-sm">
                    {isClockedIn ? "clocked in at" : "clocked out at"}:{" "}
                    <b className="ps-2">
                      {isClockedIn
                        ? formateDate(clockInTime)
                        : formateDate(clockOutTime)}
                    </b>
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                className={`btn py-4 px-10 text-xl rounded ${
                  isClockedIn
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => {
                  handleClockIn();
                }}
              >
                {isClockedIn ? "Clock Out" : "Clock In"}
              </button>
            </div>
          </div>
          <div className="px-auto">
            Total Worked Time:
            <b>{isClockedVisible && !isClockedIn && totalWorkedTime}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateObject;
