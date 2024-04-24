export const fetchWeatherData = async (city: string) => {
  const apiKey = "b87e33652d6e9220fb80bbfb24df170a";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
export const fetchAirData = async (lat: any, lon: any) => {
  const apiKey = "b87e33652d6e9220fb80bbfb24df170a";
  const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
