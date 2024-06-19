export const login = () => ({
  type: "LOGIN",
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});
