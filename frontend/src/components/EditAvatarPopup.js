import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      formName="avatar-form"
      title="Обновить аватар"
      text="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatarLink"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatarLink-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
