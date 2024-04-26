const initialState = {
  day: "day",
  degree: "celsius",
};

const degreeReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "SET_DEGREE":
      return {
        ...state,
        degree: action.payload,
      };
    default:
      return state;
  }
};

export default degreeReducer;
