import "../index.css";
import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { useHistory, Switch, Route } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/Auth.js";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImageOpen, setIsImageOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipOpen(false);
    setIsImageOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImageOpen(true);
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  React.useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
      }
  }, [isLoggedIn, history]);

  function handleUpdateUser(user) {
    api.changeUser(user)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(() => cards.filter((evt) => evt._id !== card._id));
        closeAllPopups();
      })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
  }

  function handleRegistrationSubmit(data) {
    auth.register(data)
      .then(() => {
        setIsSuccess(true);
        handleTooltipOpen();
        history.push("/signin")
      },
      () => {
        setIsSuccess(false);
        handleTooltipOpen()
      }
    );
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            // console.log(res)
            setEmail(res.email);
            setIsLoggedIn(true);
            history.push("/");
          };
        });
    };
  };

  React.useEffect (() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleLogout() {
    localStorage.removeItem('jwt');
    setEmail('');
    history.push("/signin");
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((jwt) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', jwt.token);
        setEmail(email);
        history.push("/");
      })
        .catch((error) => {
          console.log(`Error: ${error}`);
        })
  }



  return (
    <CurrentUserContext.Provider value = {currentUser}>
      <div className="root">
        <Header email={email} onLogout={handleLogout}/>
        <Switch>
          <Route path="/signup">
            <Register onRegistration={handleRegistrationSubmit} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
          path="/"
          loggedIn={isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          />  
        </Switch>
        {isLoggedIn && <Footer />}
        <InfoTooltip 
          isSuccess={isSuccess}
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} 
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}        
        />
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup 
          isOpen={isImageOpen}
          card={selectedCard} 
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
