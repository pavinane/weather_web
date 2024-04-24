import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { airReducer } from "./airReducer";
import { placeReducer } from "./placeReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  air: airReducer,
  place: placeReducer,
});

export default rootReducer;
