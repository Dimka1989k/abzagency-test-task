import "./SuccessRegister.scss";
import successImage from "../../image/success-image.svg";

const SuccessRegister = () => {
  return (
    <div className="success-window">
      <h1 className="title">User successfully registered</h1>
      <img width="328" height="290" src={successImage} alt="Success" />
    </div>
  );
};

export default SuccessRegister;
