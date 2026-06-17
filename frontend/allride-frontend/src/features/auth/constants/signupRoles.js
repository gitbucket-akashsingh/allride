export const ALLOWED_SIGNUP_ROLES = ["RIDER", "DRIVER"];

export function getValidSignupRole(roleParam) {
  const role = roleParam?.trim().toUpperCase();
  return ALLOWED_SIGNUP_ROLES.includes(role) ? role : null;
}