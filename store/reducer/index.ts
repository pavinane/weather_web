import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { airReducer } from "./airReducer";
import { placeReducer } from "./placeReducer";
import degreeReducer from "./degreeReducer";
import { weekWeatherReducer } from "./weekWeatherReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  air: airReducer,
  place: placeReducer,
  degree: degreeReducer,
  weekWeather: weekWeatherReducer,
});

export default rootReducer;
