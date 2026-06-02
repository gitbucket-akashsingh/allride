import DriverMarker from "./DriverMarker";

const NearbyDrivers = ({ drivers }) => {
  return (
    <>
      {drivers.map((driver) => (
        <DriverMarker key={driver.id} driver={driver} />
      ))}
    </>
  );
};

export default NearbyDrivers;
