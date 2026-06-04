export const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});
