import Header from "./Header.jsx";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmPopup from "./ConfirmPopup.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound.js";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.jsx";
import authorization from "../utils/Authorization.js";
import Scroll from "./ScrollToTop.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessReg, setIsSuccessReg] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCatchError = (err) => {
    console.log(`Упс...Ошибка получения данных с сервера: ${err}`);
  };

  useEffect(() => {
    if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getInitCard()])
      .then(([me, cards]) => {
        setCurrentUser(me);
        setCards(cards.reverse());
      })
      .catch(handleCatchError);
}}, [isLoggedIn]);

  const handleConfirmDeleteClick = (card) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setCardToDelete(card);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(handleCatchError);
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(handleCatchError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, job: about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleCatchError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .updateAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleCatchError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .addCard({ title: name, link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(handleCatchError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authorization
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/");
            setEmail(res.email);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = (password, email) => {
    setIsLoading(true);
    authorization
      .registration(password, email)
      .then((res) => {
        if (res) {
          setIsSuccessReg(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch(() => {
        setIsSuccessReg(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (password, email) => {
    setIsLoading(true);
    authorization
      .login(password, email)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setIsSuccessReg(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleExit = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate("/sign-in");
    setEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header onExit={handleExit} email={email} />
          <Scroll />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onClose={closeAllPopups}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteClick}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register onRegister={handleRegister} isLoading={isLoading} />
              }
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} isLoading={isLoading} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ImagePopup
            name="image"
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <ConfirmPopup
            onClose={closeAllPopups}
            isOpen={isConfirmPopupOpen}
            onConfirmDelete={handleCardDelete}
            cardToDelete={cardToDelete}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessReg={isSuccessReg}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;