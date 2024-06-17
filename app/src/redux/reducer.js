const initialState = {
  loggedIn: true,
  //   loggedIn: localStorage.getItem("loggedIn") === "true",
};

const authReducer = (state = initialState, action) => {
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

export default authReducer;
