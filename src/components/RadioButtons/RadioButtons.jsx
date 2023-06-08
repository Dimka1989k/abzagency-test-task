import "./RadioButtons.scss";

const RadioButtons = ({
  position,
  positionId,
  userPosition,
  handlePosition,
}) => {
  return (
    <div className="radio-button">
      <input
        type="radio"
        value={position}
        name="position"
        onChange={() => handlePosition(position, positionId)}
        checked={userPosition === position}
        id={position}
        className="radio-button-position"
      />
      <label htmlFor={position}>{position}</label>
    </div>
  );
};

export default RadioButtons;
