export const fetchPlaceRequest = () => ({
  type: "FETCH_PLACE_REQUEST",
});

export const fetchPlaceSuccess = (data: any) => ({
  type: "FETCH_PLACE_SUCCESS",
  payload: data,
});

export const fetchPlaceFailure = (error: any) => ({
  type: "FETCH_PLACE_FAILURE",
  payload: error,
});
