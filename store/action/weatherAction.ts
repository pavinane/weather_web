export const fetchWeatherRequest = () => ({
  type: "FETCH_WEATHER_REQUEST",
});

export const fetchWeatherSuccess = (data: any) => ({
  type: "FETCH_WEATHER_SUCCESS",
  payload: data,
});

export const fetchWeatherFailure = (error: any) => ({
  type: "FETCH_WEATHER_FAILURE",
  payload: error,
});
