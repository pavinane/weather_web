export const fetchWeekWeatherRequest = () => ({
  type: "FETCH_WEEK_WEATHER_REQUEST",
});

export const fetchWeekWeatherSuccess = (data: any) => ({
  type: "FETCH_WEEK_WEATHER_SUCCESS",
  payload: data,
});

export const fetchWeekWeatherFailure = (error: any) => ({
  type: "FETCH_WEEK_WEATHER_FAILURE",
  payload: error,
});
