import React, { useState, useEffect, Suspense } from "react";
import { IoSearch } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "@/store/action/weatherAction";
import {
  fetchAirRequest,
  fetchAirSuccess,
  fetchAirFailure,
} from "@/store/action/AirAction";
import {
  fetchPlaceRequest,
  fetchPlaceSuccess,
  fetchPlaceFailure,
} from "@/store/action/placeAction";
import { fetchWeatherData, fetchAirData } from "@/service/weatherService";
import { fetchPlaceData } from "@/service/placeService";
import Weather from "./Weather";
// import LoadingSkeleton from "./LoadingSkeleton"; // Assuming you have a LoadingSkeleton component

function LeftCard() {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("chennai");
  const airData = useSelector((state: any) => state.air.airData);
  const placeData = useSelector((state: any) => state.place.placeData);

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
      timeoutId = setTimeout(fetchData, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cityName, dispatch]);

  useEffect(() => {
    const fetchAirDatas = async () => {
      if (!airData) return;
      dispatch(fetchAirRequest());
      try {
        const data = await fetchAirData(
          airData?.coord?.lat,
          airData?.coord?.lon
        );
        dispatch(fetchAirSuccess(data));
        console.log("air data", data);
      } catch (error) {
        dispatch(fetchAirFailure(error));
      }
    };

    fetchAirDatas();
  }, [airData, dispatch]);

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
      <div className="left-card text-black min-h-screen">
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
        <Suspense fallback={<BigSpinner />}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Weather />
            <div className="relative">
              {placeData &&
                placeData?.results?.map((item: any, index: number) => {
                  if (index === 0) {
                    const names = item.tags
                      .slice(0, 3)
                      .map((tag: any) => tag.title);
                    return (
                      <div key={item.id} className="relative">
                        <img src={item.urls.regular} alt="" />
                        <div className=" absolute  top-0 bottom-0  ">
                          {names.map((name: string, index: number) => (
                            <p key={index} className="text-[#fff]">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </Suspense>
        </Suspense>
      </div>
    </div>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
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
