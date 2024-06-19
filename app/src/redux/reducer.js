const initialUser = {
  user: null,
};

const initialLoading = {
  isLoading: false,
};

export const authReducer = (state = initialUser, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const loadingReducer = (state = initialLoading, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
