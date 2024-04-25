"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex flex-col">
        <div className="h-4 bg-gray-200 w-20 mb-2"></div>
        <div className="h-4 bg-gray-200 w-16"></div>
      </div>
    </div>
  );
};

interface RootState {
  degree: {
    day: string;
    degree: string;
    // other properties
  };
}

const Weather = () => {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  const loading = useSelector((state: any) => state.weather.loading);
  const error = useSelector((state: any) => state.weather.error);
  const degrees = useSelector((state: RootState) => state.degree.degree);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 500); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[currentDateTime.getDay()];

  const formatTime = (date: any) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleTimeString(undefined, options);
  };

  if (loading)
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const celsius = weatherData?.main.temp - 273.15;
  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <div className="mt-20 flex  flex-col gap-4 items-center  border-b border-[#bebebe]">
      {weatherData && weatherData.weather && (
        <div>
          <div className=" flex flex-col justify-between items-end ">
            <div className="relative  rounded-full shadow-inner ">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-40 h-40 rounded-full "
                style={{ boxShadow: "inset 0px 1px 13px 2px rgba(0,0,0,0.75)" }}
              />
              {/* <Image
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                width={500}
                height={500}
                alt="weather"
              /> */}
            </div>
          </div>
          <div className="mt-16 flex gap-6 flex-col">
            <div>
              <h1 className="text-6xl font-normal relative ">
                {degrees === "celsius"
                  ? celsius.toFixed(2)
                  : fahrenheit.toFixed(2)}

                <span className="text-3xl absolute top-0">
                  {degrees === "celsius" ? (
                    <TbTemperatureCelsius />
                  ) : (
                    <TbTemperatureFahrenheit />
                  )}
                </span>
              </h1>
            </div>
            <div>
              <p className=" font-semibold  mb-8 text-xl">
                {currentDay} , &nbsp;
                <span className=" font-light text-[#B1B1B1] ">
                  {formatTime(currentDateTime)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
