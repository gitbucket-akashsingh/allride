import { login } from "../api/authApi";

import { saveAuthData } from "../utils/authStorage";

export const loginUser = async (credentials) => {
  /*
    API CALL
  */

  const response = await login(credentials);

  console.log("FULL LOGIN RESPONSE:", response.data);

  /*
    EXTRACT DATA
  */

  const accessToken = response.data.tokens.accessToken;

  const refreshToken = response.data.tokens.refreshToken;

  const user = response.data.user;

  console.log("USER:", user);

  /*
    SAVE AUTH
  */

  saveAuthData(accessToken, user);

  localStorage.setItem("refreshToken", refreshToken);

  /*
    RETURN USER
  */

  return user;
};
