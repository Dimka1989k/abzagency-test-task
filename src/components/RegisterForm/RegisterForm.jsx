import { useState, useEffect } from "react";
import "./RegisterForm.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useLazyGetTokenQuery,
  useAddUserMutation,
  useGetPositionsQuery,
} from "../../redux/agency/agencyApi";

import Button from "../Buttons/Button";
import Input from "../Input/Input";
import Loader from "../Loader/Loader";
import SuccessRegister from "../SuccessRegister/SuccessRegister";
import Positions from "../Positions/Positions";
import PhotoUpload from "../UploadImage/UploadImage";
import { useAction } from "../../redux/actions";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userIdPosition, setUserIdPosition] = useState(0);
  const [userNameImage, setuserNameImage] = useState("Upload your photo");
  const [userFileImage, setUserFileImage] = useState(null);
  const [userErrorPhoto, setUserErrorPhoto] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    userposition: true,
  });
  const [formFilled, setFormFilled] = useState(false);

  // const [registrationError, setRegistrationError] = useState("");

  const [registerUser, { isLoading: isUserLoading }] = useAddUserMutation();

  const { resetUsers } = useAction();

  const {
    data: positions,
    isError: userPositionsError,
    error: positionsError,
    isLoading: positionsLoading,
  } = useGetPositionsQuery();

  const [fetchToken] = useLazyGetTokenQuery();

  const photoUpload = (e) => {
    setUserErrorPhoto("");
    setUserFileImage(null);

    const file = e.target.files[0];
    let isUploadError = false;

    if (file.size > 5 * 1024 * 1024) {
      setUserErrorPhoto("The photo may not be greater than 5 Mbytes");
      isUploadError = true;
    }

    if (file) {
      const allowedFormats = ["image/jpeg", "image/jpg"];
      if (!allowedFormats.includes(file.type)) {
        setUserErrorPhoto("Photo must be in jpeg/jpg format");
        isUploadError = true;
      }
    }

    const userImage = new Image();
    userImage.src = URL.createObjectURL(file);
    userImage.onload = () => {
      if (userImage.width < 70 && userImage.height < 70) {
        setUserErrorPhoto("Dimensions must be at least 70x70px");
        isUploadError = true;
      }
    };

    setuserNameImage(file.name);
    !isUploadError && setUserFileImage(file);
  };

  const validaName = (value) => {
    if (value.length > 1 && value.length < 63) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: false,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        name: true,
      }));
    }
  };

  const validEmail = (value) => {
    const regEmail =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (email.length <= 74 && regEmail.test(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: false,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        email: true,
      }));
    }
  };

  const validPhone = (value) => {
    const regPhone = /^[\\+]{0,1}380([0-9]{9})$/;

    if (regPhone.test(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        phone: false,
      }));
    } else {
      setFormErrors((prevState) => ({
        ...prevState,
        phone: true,
      }));
    }
  };

  const handlePosition = (position, id) => {
    setUserPosition(position);
    setUserIdPosition(id);

    setFormErrors((prevState) => ({
      ...prevState,
      userposition: false,
    }));
  };

  const clearFormStates = () => {
    setName("");
    setEmail("");
    setPhone("");
    setUserPosition("");
    setuserNameImage("Upload your photo");
    setUserFileImage(null);
    // setRegistrationError("");

    setFormErrors((prevState) => ({
      ...prevState,
      userposition: true,
    }));
  };

  const submitForm = async () => {
    if (
      !formErrors.email &&
      !formErrors.phone &&
      !formErrors.userposition &&
      !formErrors.name
    ) {
      const { token } = await fetchToken().unwrap();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("position_id", userIdPosition);
      formData.append("photo", userFileImage);

      try {
        await registerUser({ token, formData }).unwrap();

        setValidForm(true);
      } catch (error) {
        toast.warn("User with this phone or email already exist", {
          icon: false,
          theme: "colored",
        });
        // setRegistrationError(error.data.message);
      }
    } else {
      setValidForm(false);
    }
  };

  const checkedForm = async () => {
    if (
      name.length > 1 &&
      email.length &&
      phone.length > 12 &&
      userPosition.length &&
      !formErrors.email &&
      userFileImage !== null
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  };

  useEffect(() => {
    checkedForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone, userPosition, userFileImage, userErrorPhoto]);

  useEffect(() => {
    if (validForm) {
      clearFormStates();
      resetUsers();
      setTimeout(() => {
        setValidForm(false);
      }, 3000);
    }
  }, [validForm]);

  return (
    <section className="section-post" id="signup">
      {validForm ? (
        <SuccessRegister />
      ) : (
        <>
          <h1 className="title">Working with POST request</h1>
          <form className="form">
            <Input
              type="text"
              placeholder="Your name"
              state={name}
              setState={setName}
              valid={validaName}
              error={formErrors.name}
            />
            <Input
              type="email"
              placeholder="Email"
              valid={validEmail}
              error={formErrors.email}
              state={email}
              setState={setEmail}
            />
            <Input
              type="tel"
              placeholder="Phone"
              valid={validPhone}
              error={formErrors.phone}
              setState={setPhone}
              state={phone}
            />

            <Positions
              userPositionsError={userPositionsError}
              positions={positions}
              handlePosition={handlePosition}
              userPosition={userPosition}
              positionsError={positionsError}
              positionsLoading={positionsLoading}
            />

            <PhotoUpload
              photoUpload={photoUpload}
              userErrorPhoto={userErrorPhoto}
              userNameImage={userNameImage}
            />

            {/* {registrationError &&
              toast.error("User with this phone or email already exist")} */}
            {!isUserLoading ? (
              <Button
                className="btn disabled"
                text="Sign up"
                disabled={!formFilled}
                submitForm={submitForm}
              />
            ) : (
              <Loader />
            )}
          </form>
        </>
      )}
    </section>
  );
};

export default RegisterForm;
