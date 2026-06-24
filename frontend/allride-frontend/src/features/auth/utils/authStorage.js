const STORAGE_KEY = "allride-auth";

export const saveAuthData = (tokens, user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tokens, user }));
};

export const getAccessToken = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data?.tokens?.accessToken;
};

export const getRefreshToken = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data?.tokens?.refreshToken;
};

export const getUser = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data?.user;
};

export const getAuthData = () => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return {
      token: data?.tokens?.accessToken,
      refreshToken: data?.tokens?.refreshToken,
      user: data?.user,
    };
  } catch (error) {
    return {
      token: null,
      refreshToken: null,
      user: null,
    };
  }
};

export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEY);
};


export const updateAccessToken = (accessToken) => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  const data = JSON.parse(raw);
  data.tokens.accessToken = accessToken;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};