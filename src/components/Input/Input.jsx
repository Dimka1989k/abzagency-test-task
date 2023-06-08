import "./input.scss";

const Input = ({
  error = false,
  placeholder,
  type,
  state,
  setState,

  valid,
}) => {
  const focusInput = (e) => {
    if (e.target.type === "tel" && state.length < 4) {
      setState("");
    }
  };

  const handleChange = (e) => {
    valid(e.target.value);
    setState(e.target.value);
  };

  let inputErrorText = "";
  if (error) {
    switch (type) {
      case "text":
        inputErrorText = "Username should contain 2-60 characters";
        break;
      case "email":
        inputErrorText =
          "User email, must be a valid email according to RFC2822";
        break;
      case "tel":
        inputErrorText =
          "User phone number should start with code of Ukraine +380";
        break;

      default:
        return;
    }
  }

  return (
    <div
      className={`input-title${state.length > 0 ? " focused" : ""} ${
        error ? " input__error" : ""
      }`}
      data-placeholder={placeholder}
    >
      <input
        className={error ? "input__error" : ""}
        type={type}
        value={state}
        onFocus={(e) => focusInput(e)}
        onChange={(e) => handleChange(e)}
        name={type === "text" ? "name" : placeholder}
        aria-label={type === "text" ? "name" : placeholder}
        required
      />
      {(error || type === "tel") && (
        <p className={`text-help${error ? " error" : ""}`}>
          {type === "tel" && !inputErrorText
            ? "+38 (XXX) XXX - XX - XX"
            : inputErrorText}
        </p>
      )}
    </div>
  );
};

export default Input;
