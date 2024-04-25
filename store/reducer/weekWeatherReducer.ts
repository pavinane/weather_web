const initialState = {
  weekWeather: null,
  loading: false,
  error: null,
};

export const weekWeatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_WEEK_WEATHER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_WEEK_WEATHER_SUCCESS":
      return {
        ...state,
        weatherData: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_WEEK_WEATHER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
