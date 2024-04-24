const initialState = {
  airData: null,
  loading: false,
  error: null,
};

export const airReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FETCH_AIR_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_AIR_SUCCESS":
      return {
        ...state,
        airData: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_AIR_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
