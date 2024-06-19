const initialLoggedIn = {
  loggedIn: true,
  //   loggedIn: localStorage.getItem("loggedIn") === "true",
};

const initialLoading = {
  isLoading: false,
  //   loggedIn: localStorage.getItem("loggedIn") === "true",
};

export const authReducer = (state = initialLoggedIn, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("loggedIn", true);
      return {
        ...state,
        loggedIn: true,
      };
    case "LOGOUT":
      localStorage.removeItem("loggedIn", true);
      return {
        ...state,
        loggedIn: false,
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
