import { IoLocationSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { AiOutlinePercentage } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { ImSad2 } from "react-icons/im";

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
