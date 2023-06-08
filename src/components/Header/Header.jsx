import Button from "../Buttons/Button";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__cover">
        <div className="header__wrapper">
          <h1 className="header__caption">
            Test assignment for front-end developer
          </h1>
          <p className="header__text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button text="Sign up" />
        </div>
      </div>
    </header>
  );
};

export default Header;
