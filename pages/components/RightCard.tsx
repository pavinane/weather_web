"use client";
import React, { useEffect, useState, startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDegree } from "@/store/action/degree";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import {
  fetchWeekWeatherFailure,
  fetchWeekWeatherRequest,
  fetchWeekWeatherSuccess,
} from "@/store/action/weekWeather";
import {
  fetchAirRequest,
  fetchAirSuccess,
  fetchAirFailure,
} from "@/store/action/airAction";
import { fetchAirData, fetchWeekWeatherData } from "@/service/weatherService";
import { IoLocationSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { AiOutlinePercentage } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { ImSad2 } from "react-icons/im";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RootState {
  degree: {
    day: string;
    degree: string;
    // other properties
  };
}

function RightCard() {
  const [day, setDay] = useState("day");
  const dispatch = useDispatch();
  const degrees = useSelector((state: any) => state.degree.degree);
  const airData = useSelector((state: any) => state.air.airData);
  const weatherData = useSelector((state: any) => state?.weather?.weatherData);
  const weekweatherData = useSelector(
    (state: any) => state?.weekWeather?.weatherData
  );
  console.log("weatherData", weatherData);

  const handleDegreeChange = (newDegree: string) => {
    startTransition(() => {
      dispatch(setDegree(newDegree));
    });
  };

  useEffect(() => {
    const fetchWeekWeatherDatas = async () => {
      if (!weatherData) return;
      dispatch(fetchWeekWeatherRequest());
      try {
        const data = await fetchWeekWeatherData(
          weatherData?.coord?.lat,
          weatherData?.coord?.lon
        );
        dispatch(fetchWeekWeatherSuccess(data));
        console.log("air data", data);
      } catch (error) {
        dispatch(fetchWeekWeatherFailure(error));
      }
    };

    fetchWeekWeatherDatas();
  }, [weatherData, dispatch]);

  useEffect(() => {
    const fetchAirDatas = async () => {
      if (!weatherData) return;
      dispatch(fetchAirRequest());
      try {
        const data = await fetchAirData(
          weatherData?.coord?.lat,
          weatherData?.coord?.lon
        );
        dispatch(fetchAirSuccess(data));
        console.log("air data", data);
      } catch (error) {
        dispatch(fetchAirFailure(error));
      }
    };

    fetchAirDatas();
  }, [weatherData, dispatch]);

  const sunriseTimestamp = weatherData?.sys?.sunrise;
  const sunriseDate = new Date(sunriseTimestamp * 1000); // Convert seconds to milliseconds
  const formattedSunrise = sunriseDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const sunsetTimestamp = weatherData?.sys?.sunset;
  const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert seconds to milliseconds

  const formattedSunset = sunsetDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const visibility = weatherData?.visibility / 100 / 3.6;

  function calculateAQI(pm25: any) {
    // Lookup table for PM2.5
    const breakpoints = [
      { conc: [0.0, 12.0], AQI: [0, 50] },
      { conc: [12.1, 35.4], AQI: [51, 100] },
      { conc: [35.5, 55.4], AQI: [101, 150] },
      { conc: [55.5, 150.4], AQI: [151, 200] },
      { conc: [150.5, 250.4], AQI: [201, 300] },
      { conc: [250.5, 350.4], AQI: [301, 400] },
      { conc: [350.5, 500.4], AQI: [401, 500] },
    ];

    // Find the correct range in the lookup table
    const range = breakpoints.find(
      (range) => pm25 >= range.conc[0] && pm25 <= range.conc[1]
    );

    if (!range) {
      // Handle out-of-range values
      if (pm25 < breakpoints[0].conc[0]) {
        return breakpoints[0].AQI[0];
      } else if (pm25 > breakpoints[breakpoints.length - 1].conc[1]) {
        return breakpoints[breakpoints.length - 1]?.AQI[1];
      } else {
        throw new Error("PM2.5 concentration out of range");
      }
    }

    // Calculate the AQI using linear interpolation
    const AQI = Math.round(
      ((range.AQI[1] - range.AQI[0]) / (range.conc[1] - range.conc[0])) *
        (pm25 - range.conc[0]) +
        range.AQI[0]
    );

    return AQI;
  }

  const pm25 = airData?.list[0]?.components?.pm2_5;
  const AQI = pm25 ? calculateAQI(pm25) : null;

  return (
    <div>
      <div className="menu_header flex  justify-between items-center">
        <div className=" flex gap-8">
          <button
            onClick={() => setDay("day")}
            className={`${
              day === "day"
                ? "text-black  underline    font-semibold  text-2xl "
                : "text-[#b1b1b1] text-2xl font-medium"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setDay("week")}
            className={`${
              day === "week"
                ? "text-black underline font-semibold text-2xl"
                : "text-[#b1b1b1] text-2xl font-medium"
            }`}
          >
            Week
          </button>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex gap-8">
            <button
              onClick={() => handleDegreeChange("celsius")}
              className={` ${
                degrees === "celsius"
                  ? "bg-black text-white rounded-full p-2 font-bold"
                  : "bg-white text-black rounded-full p-2"
              }`}
            >
              <TbTemperatureCelsius />
            </button>
            <button
              onClick={() => handleDegreeChange("fahrenheit")}
              className={`${
                degrees !== "celsius"
                  ? "bg-black text-white rounded-full p-2 font-bold"
                  : "bg-white text-black rounded-full p-2"
              }`}
            >
              <TbTemperatureFahrenheit />
            </button>
          </div>
          <div className="bg-[#B1B1B1] rounded-xl">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/900/306/large_2x/happy-young-cute-illustration-face-profile-png.png"
              alt="profile"
              className="w-16 h-16"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-8  gap-4 items-center  ">
          {weekweatherData?.list
            ?.filter((item: any) => item.dt_txt.includes("12:00:00"))
            .map((item: any, index: number) => {
              const dtTxt = item?.dt_txt;
              const date = new Date(dtTxt);
              const day = date.toLocaleDateString("en-US", { weekday: "long" });

              const celsius = item?.main.temp - 273.15;
              const fahrenheit = (celsius * 9) / 5 + 32;
              return (
                <div
                  key={index}
                  className="flex bg-white w-full p-2 rounded-lg shadow-md"
                >
                  <div className="text-center w-full flex justify-around   flex-col gap-4">
                    <p>
                      {typeof day === "string" ? day.substring(0, 3) : day} °
                    </p>
                    <div className="w-full  flex justify-around ">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        className="w-16 h-16 rounded-full "
                        style={{
                          boxShadow: "inset 0px 1px 13px 2px rgba(0,0,0,0.75)",
                        }}
                      />
                    </div>

                    <p>{celsius.toFixed(2)}°</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold">Today's Highlights</h1>
        <div className="flex justify-between gap-4 mt-6 flex-wrap">
          <UIStatus progress={10} size={120} strokeWidth={10} />
          <WindStatus windNum={weatherData?.wind?.speed} />
          <SunSet sunset={formattedSunrise} sunrise={formattedSunset} />
          <Humdidity humidityNum={weatherData?.main?.humidity} />
          <Visiblity visibilityNum={visibility.toFixed(2)} />
          <AirQuality airqualityNum={AQI} />
        </div>
      </div>
    </div>
  );
}

export default RightCard;

interface CircularProgressBarProps {
  progress: number;
  size: number;
  strokeWidth: number;
}
export const UIStatus = ({
  progress,
  size,
  strokeWidth,
}: CircularProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div className="bg-white shadow-md rounded-2xl w-80  p-4 px-12 z-10 relative">
      <h1 className="text-[#b1b1b1] text-md">UV Index</h1>
      <div className="mt-2">
        <svg
          className="block"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#fcdc4b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            fill="none"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="2rem"
            fill="#000"
          >
            {`${progress}`}
          </text>
        </svg>
      </div>
    </div>
  );
};

export const WindStatus = ({ windNum }: any) => {
  return (
    <div className="bg-white shadow-md rounded-2xl w-80  p-4 px-12">
      <div>
        <h1 className="text-[#b1b1b1] text-md">Wind Status</h1>
        <p className="mt-4 text-6xl  ">
          {windNum} <span className="text-xl font-light">km/h</span>{" "}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center ">
            <IoLocationSharp
              className=" rotate-45 "
              color="#4050d2"
              size={20}
            />{" "}
          </div>
          <span>WSW</span>
        </div>
      </div>
    </div>
  );
};

export const SunSet = ({
  sunset,
  sunrise,
}: {
  sunset: string;
  sunrise: string;
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl  w-80 p-4 px-12">
      <div>
        <h1 className="text-[#b1b1b1] text-md">Sunrise & Sunet</h1>

        <div className="flex items-center gap-4 mt-6">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 justify-between items-center">
              <div className="w-10 h-10 border-2 border-orange-400 rounded-full flex items-center justify-center bg-[#fcdc4b]">
                <FaArrowUp color="white" />
              </div>
              <p>{sunset}</p>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <div className="w-10 h-10 border-2 border-orange-400 rounded-full flex items-center justify-center bg-[#fcdc4b]">
                <FaArrowDown color="white" />
              </div>
              <p>{sunrise}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Humdidity = ({ humidityNum }: { humidityNum: number }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl  w-80 p-4 px-12 ">
      <div>
        <h1 className="text-[#b1b1b1] text-md">Humidity</h1>

        <div className="flex  gap-4 mt-6 flex-col ">
          <div className="flex justify-between items-center relative">
            <p className="text-5xl flex gap-2">
              {humidityNum} <AiOutlinePercentage size={20} />
            </p>
            <div className="border border-red rounded-2xl w-8 h-20">
              <GoDotFill
                size={30}
                color="#4050d2"
                className={`absolute `}
                style={{ bottom: (humidityNum / 100) * 60 }}
              />
            </div>
          </div>
          <div>
            {humidityNum < 50 ? (
              <p>normal &nbsp; 🤙🏻</p>
            ) : (
              <p>Abnormal &nbsp;👎🏻</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const Visiblity = ({ visibilityNum }: { visibilityNum: any }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl  w-80 p-4 px-6">
      <div>
        <h1 className="text-[#b1b1b1] text-md">Visibility</h1>

        <div className="flex  gap-4 mt-6 flex-col ">
          <div className="flex justify-between items-center relative">
            <p className="mt-4 text-6xl  flex items-end ">
              {visibilityNum} <span className="text-xl font-light">km/h</span>{" "}
            </p>
          </div>
          <div>
            {visibilityNum < 5 ? (
              <p>normal 🤙🏻</p>
            ) : (
              <div className="flex items-center gap-4">
                Average{" "}
                <span>
                  <ImSad2 color="#fcdc4b" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const AirQuality = ({ airqualityNum }: { airqualityNum: any }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl  w-80 p-4 px-6">
      <div>
        <h1 className="text-[#b1b1b1] text-md">Air Quality</h1>

        <div className="flex  gap-4 mt-6 flex-col ">
          <div className="flex justify-between items-center relative">
            <p className="mt-4 text-6xl ">{airqualityNum}</p>
            <div className="border border-red rounded-2xl w-8 h-20">
              <GoDotFill
                size={30}
                color="#4050d2"
                className={`absolute `}
                style={{ bottom: (airqualityNum / 100) * 60 }}
              />
            </div>
          </div>
          <div>
            {airqualityNum < 70 ? (
              <p>Healthy 🤙🏻</p>
            ) : (
              <div className="flex items-center gap-4">UnHealthy &nbsp;👎🏻</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
