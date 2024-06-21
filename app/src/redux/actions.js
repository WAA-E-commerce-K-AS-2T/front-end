export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setAddress = (address) => ({
  type: "SET_ADDRESS",
  payload: address,
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});
