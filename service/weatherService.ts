export const fetchWeatherData = async (city: string) => {
  const apiKey = process.env.NEXT_API_KEY;
  console.log("process", process);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
export const fetchAirData = async (lat: any, lon: any) => {
  const apiKey = process.env.NEXT_API_KEY;
  const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
