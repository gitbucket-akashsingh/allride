import { USER_ROLES } from "@/shared/constants/roles";

export const getRedirectPathByRole = (role) => {
  switch (role) {
    case USER_ROLES.RIDER:
      return "/rider/home";

    case USER_ROLES.DRIVER:
      return "/driver/dashboard";

    case USER_ROLES.ADMIN:
      return "/admin/dashboard";

    default:
      return "/";
  }
};
