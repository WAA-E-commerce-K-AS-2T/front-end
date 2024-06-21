const initialUser = {
  user: null,
};

const initialLoading = {
  isLoading: false,
};

const initialAddress = {
  address: {},
};

export const addressReducer = (state = initialAddress, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
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
