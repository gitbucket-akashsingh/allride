export const ROUTE_TITLES = {
    "/rider/home": "Home",
    "/rider/book": "Book a Ride",
    "/rider/history": "Ride History",
    "/rider/tracking": "Track Ride",
    "/rider/payments": "Payments",
    "/rider/profile": "Profile",
  
    "/driver/home": "Home",
    "/driver/dashboard": "Dashboard",
    "/driver/earnings": "Earnings",
    "/driver/history": "Trip History",
    "/driver/profile": "Profile",
  
    "/admin/home": "Home",
    "/admin/dashboard": "Dashboard",
  };
  
  export function getPageTitle(pathname) {
    return ROUTE_TITLES[pathname] || "AllRide";
  }