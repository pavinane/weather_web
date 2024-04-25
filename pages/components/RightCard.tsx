import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDegree } from "@/store/action/degree";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";

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
  const degrees = useSelector((state: RootState) => state.degree.degree);

  console.log("degree", degrees);
  const handleDegreeChange = (newDegree: string) => {
    console.log("newDegree", newDegree);
    dispatch(setDegree(newDegree));
  };

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
        <h1>Today's Highlights</h1>
      </div>
    </div>
  );
}

export default RightCard;
