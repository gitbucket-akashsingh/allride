import logoDark from "@/assets/allride-logo-dark.png";
import logoLight from "@/assets/allride-logo-light.png";

function AllRideLogo({ className = "", style, alt = "AllRide" }) {
  return (
    <>
      <img
        src={logoLight}
        alt={alt}
        style={style}
        className={`${className} hidden dark:block`}
      />
      <img
        src={logoDark}
        alt={alt}
        style={style}
        className={`${className} block dark:hidden`}
      />
    </>
  );
}

export default AllRideLogo;