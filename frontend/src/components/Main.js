import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatarbutton"
          type="button"
          aria-label="avatar edit"
          onClick={onEditAvatar}
        />
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        <div className="profile__info-container">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="edit profile"
              onClick={onEditProfile}
            />
          </div>
          <h2 className="profile__about">{currentUser.about}</h2>
        </div>
        <button
          className="profile__addbutton"
          type="button"
          aria-label="add button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
