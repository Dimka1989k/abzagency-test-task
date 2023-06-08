import "./Buttons.scss";

const Button = ({
  areCardsFinished = false,
  text,
  showMore = null,
  disabled = false,
  submitForm = null,
}) => {
  const link = `#${text.replace(/\s+/g, "").toLowerCase()}`;

  const handleClick = (e) => {
    e.preventDefault();
    if (showMore) {
      showMore();
    } else {
      submitForm();
    }
  };

  if (areCardsFinished) {
    return null;
  }

  return (
    <>
      <a
        href={link}
        className={`btn${disabled || areCardsFinished ? " disabled" : ""}`}
        onClick={(e) => (showMore || submitForm) && handleClick(e)}
      >
        {text}
      </a>
    </>
  );
};

export default Button;
