export const saveAuthData = (token, user) => {
  localStorage.setItem("token", token);

  localStorage.setItem("allride-user", JSON.stringify(user));
};

// export const getToken = () => {
//   return localStorage.getItem("token");
// };
export const getAccessToken = () => {
  const tokens = JSON.parse(localStorage.getItem("allride-tokens"));

  return tokens?.accessToken;
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("refreshToken");
};
