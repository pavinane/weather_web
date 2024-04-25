import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { airReducer } from "./airReducer";
import { placeReducer } from "./placeReducer";
import degreeReducer from "./degreeReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  air: airReducer,
  place: placeReducer,
  degree: degreeReducer,
});

export default rootReducer;
