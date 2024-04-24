export const fetchAirRequest = () => ({
  type: "FETCH_AIR_REQUEST",
});

export const fetchAirSuccess = (data: any) => ({
  type: "FETCH_AIR_SUCCESS",
  payload: data,
});

export const fetchAirFailure = (error: any) => ({
  type: "FETCH_AIR_FAILURE",
  payload: error,
});
