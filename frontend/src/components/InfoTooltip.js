import React from "react";

function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_tooltips ${props.isOpen ? "popup_type_open" : ""}`}>
      <form className="popup__container popup__container-tooltip" name="tooltip" onSubmit={props.onSubmit} noValidate>
        <button
          className="popup__close"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        />
        <div className={`${props.isSuccess ? "popup__alert-success" : "popup__alert-error"}`}></div>
        <h2 className="popup__title popup__title_tooltips">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </form>
    </div>
  )
}

export default  InfoTooltip;