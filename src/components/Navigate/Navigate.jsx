import Logo from "../../image/Logo.svg";
import Button from "../Buttons/Button";
import "./Navigate.scss";

const Navigate = () => {
  return (
    <nav className="navigate">
      <div className="navigate-title">
        <a href="#page">
          <img height="26" width="104" src={Logo} alt="TASK" className="logo" />
        </a>
        <div className="navigate-btn">
          <Button text="Users" className="btn" />
          <Button text="Sign up" className="btn" />
        </div>
      </div>
    </nav>
  );
};

export default Navigate;
