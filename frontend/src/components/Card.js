import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id; 

  const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete_hidden' :'cards__delete'}`); 

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = `cards__like ${isLiked ? "cards__like_type_active" : ''}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="cards__element" key={card._id}>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="delete button"
        onClick={handleDeleteClick}
      />
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="cards__caption">
        <p className="cards__text">{card.name}</p>
        <div className="cards__like_container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          />
          <span className="cards__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
