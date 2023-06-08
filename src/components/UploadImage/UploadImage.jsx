import "./UploadImage.scss";

const UploadImage = ({ userNameImage, userErrorPhoto, photoUpload }) => {
  return (
    <div className={`image-input${userErrorPhoto ? " error" : ""}`}>
      <label
        className={`image-upload${userNameImage ? " filled" : ""}`}
        data-file={userNameImage}
      >
        <input type="file" onChange={(e) => photoUpload(e)} required />
        Upload
      </label>
      {userErrorPhoto && <p className="text-help">{userErrorPhoto}</p>}
    </div>
  );
};

export default UploadImage;
