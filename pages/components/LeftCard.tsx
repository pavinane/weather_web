import React, { useState, useEffect, Suspense, startTransition } from "react";
import { IoSearch } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "@/store/action/weatherAction";

import {
  fetchPlaceRequest,
  fetchPlaceSuccess,
  fetchPlaceFailure,
} from "@/store/action/placeAction";
import { fetchWeatherData, fetchAirData } from "@/service/weatherService";
import { fetchPlaceData } from "@/service/placeService";
import Weather from "./Weather";
import { GiHeavyRain } from "react-icons/gi";

function LeftCard() {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("chennai");

  const placeData = useSelector((state: any) => state.place.placeData);
  const weatherData = useSelector((state: any) => state.weather.weatherData);

  useEffect(() => {
    let timeoutId: any;

    const fetchData = async () => {
      dispatch(fetchWeatherRequest());
      try {
        const data = await fetchWeatherData(cityName);
        dispatch(fetchWeatherSuccess(data));
        console.log("weather data", data);
      } catch (error) {
        dispatch(fetchWeatherFailure(error));
      }
    };

    if (cityName) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        startTransition(() => {
          fetchData();
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cityName, dispatch]);

  useEffect(() => {
    const fetchPlaceDatas = async () => {
      if (!cityName) return;
      dispatch(fetchPlaceRequest());
      try {
        const data = await fetchPlaceData(cityName);
        dispatch(fetchPlaceSuccess(data));
        console.log("place data", data);
      } catch (error) {
        dispatch(fetchPlaceFailure(error));
      }
    };

    fetchPlaceDatas();
  }, [cityName, dispatch]);

  return (
    <div>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="left-card text-black min-h-screen p-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <IoSearch size={20} color="#000" />
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Search for places ..."
                value={cityName}
                className="outline-none"
                onChange={(e) => setCityName(e.target.value)}
              />
            </div>

            <div className="w-8 h-8 bg-[#F6F6F8] rounded-full p-2">
              <MdLocationSearching color="#000" />
            </div>
          </div>

          <Weather />
          <div className="mt-6">
            <div className="flex items-center ">
              {" "}
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-12 h-12 rounded-full "
              />
              {weatherData?.weather[0].description
                ? weatherData?.weather[0].description
                : weatherData?.weather.description}
            </div>
            <div className="flex items-center gap-2">
              <GiHeavyRain />
              <span> Rain - {weatherData?.clouds?.all} %</span>
            </div>
          </div>

          <div className="relative mt-12">
            {placeData &&
              placeData?.results?.map((item: any, index: number) => {
                if (index === 0) {
                  const names = item.tags
                    .slice(0, 3)
                    .map((tag: any) => tag.title);
                  return (
                    <div key={item.id} className="relative ">
                      <img
                        src={item.urls.regular}
                        alt=""
                        className="w-80 h-32 rounded-3xl object-cover filter contrast-[0.75]  "
                      />
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="flex flex-row gap-1">
                          {names.map((name: string, index: number) => (
                            <div
                              key={index}
                              className="text-white text-sm uppercase  p-2 rounded"
                            >
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

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

export default LeftCard;
