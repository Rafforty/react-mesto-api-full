function PopupWithForm(props) {
  
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_type_open" : ""}`}>
      <form className="popup__container" name={`${props.formName}`} onSubmit={props.onSubmit} noValidate>
        <button
          className="popup__close"
          type="button"
          aria-label="close"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button className="popup__submit" type="submit">{props.text}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
