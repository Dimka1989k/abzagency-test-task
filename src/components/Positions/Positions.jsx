import RadioButtons from "../RadioButtons/RadioButtons";
import Loader from "./../Loader/Loader";

const Positions = ({
  isError,
  error,
  isLoading,
  userPosition,
  positions,
  handlePosition,
}) => {
  return (
    <div className="positions">
      <p style={{ marginBottom: 11 }}>Select your position</p>

      {isError && (
        <p className="error">
          Error positions: {error.status} {error.originalStatus}
        </p>
      )}
      {isLoading && <Loader />}

      {positions?.map((position) => (
        <RadioButtons
          position={position.name}
          handlePosition={handlePosition}
          userPosition={userPosition}
          positionId={position.id}
          key={position.id}
        />
      ))}
    </div>
  );
};

export default Positions;
