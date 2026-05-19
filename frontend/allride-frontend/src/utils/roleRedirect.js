import { ROLES } from "../constants/roles";

export const getRedirectPathByRole = (role) => {
  switch (role) {
    case ROLES.RIDER:
      return "/rider/home";

    case ROLES.DRIVER:
      return "/driver/dashboard";

    case ROLES.ADMIN:
      return "/admin/dashboard";

    default:
      return "/";
  }
};
