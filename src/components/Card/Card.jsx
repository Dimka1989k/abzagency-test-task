import "./Card.scss";
import photoImage from "../../image/photo-cover.svg";
import { useState } from "react";

const Card = ({ email, name, phone, photo, position }) => {
  const [prompt, setPrompt] = useState(false);

  const onMouseLeave = () => {
    setPrompt(false);
  };

  const onMouseEnter = () => {
    setPrompt(true);
  };

  return (
    <div className="card">
      <img
        src={photo}
        onError={({ currentTarget }) => {
          currentTarget.onError = null;
          currentTarget.src = photoImage;
        }}
        height="70"
        width="70"
        loading="lazy"
        alt={name}
        className="card__image"
      />
      <p className="card__name">{name}</p>
      <div className="card__inform">
        <p className="card__inform-position">{position}</p>
        <p
          className="card__inform-email"
          onMouseLeave={() => onMouseLeave()}
          onMouseEnter={() => onMouseEnter()}
        >
          {email}
        </p>
        {prompt && <p className="prompt__email">{email}</p>}
        <p className="card__inform-phone">{phone}</p>
      </div>
    </div>
  );
};

export default Card;
