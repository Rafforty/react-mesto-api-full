import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      formName="add-cards"
      title="Новое место"
      text="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="placeName"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={nameRef}
      />
      <span className="popup__input-error placeName-error" />
      <input
        className="popup__input"
        id="placeLink"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={linkRef}
      />
      <span className="popup__input-error placeLink-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;