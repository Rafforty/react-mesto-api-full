import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      formName="profile-edit"
      title="Редактировать профиль"
      text="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_name"
        type="text"
        name="name"
        id="profileName"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={`${name}`}
        onChange={handleChangeName}
      />
      <span className="popup__input-error profileName-error" />
      <input
        className="popup__input popup__input_about"
        type="text"
        name="about"
        id="profileAbout"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={`${description}`}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error profileAbout-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
