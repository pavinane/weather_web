"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDegree } from "@/store/action/degree";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import {
  fetchWeekWeatherFailure,
  fetchWeekWeatherRequest,
  fetchWeekWeatherSuccess,
} from "@/store/action/weekWeather";
import { fetchWeekWeatherData } from "@/service/weatherService";

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

  //   const [cityName, setCityName] = useState("chennai");

  const weatherData = useSelector((state: any) => state?.weather?.weatherData);
  const weekweatherData = useSelector(
    (state: any) => state?.weekWeather?.weatherData
  );
  console.log("weekweatherData", weekweatherData);

  const handleDegreeChange = (newDegree: string) => {
    dispatch(setDegree(newDegree));
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
        <h1 className="text-2xl ">Today's Highlights</h1>
      </div>
    </div>
  );
}

// const DayCards = () => {
//   return (
//     <div>
//       <div></div>
//     </div>
//   );
// };

export default RightCard;
