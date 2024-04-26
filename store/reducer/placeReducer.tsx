const initialState = {
  placeData: null,
  loading: false,
  error: null,
};

export const placeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_PLACE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_PLACE_SUCCESS":
      return {
        ...state,
        placeData: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_PLACE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
