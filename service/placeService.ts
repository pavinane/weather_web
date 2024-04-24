export const fetchPlaceData = async (place: string) => {
  const apiUrl = `https://api.unsplash.com/search/photos?query=${place}&client_id=OEZfrYiedpa9RSucQHA7RF95XyVrZ1wLOKf2nScGAXk`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
