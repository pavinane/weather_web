export const fetchPlaceData = async (place: string) => {
  const apiUrl = `https://api.unsplash.com/search/photos?query=${place}&client_id=${process.env.CLIENT_ID}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
