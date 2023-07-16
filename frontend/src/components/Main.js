import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="аватар пользователя."
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="button-edit"
                onClick={onEditProfile}
                aria-label="кнопка редактирования"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="button-add"
          aria-label="кнопка добавления карточки на страницу"
          onClick={onAddPlace}
        ></button>
      </section>
      <section
        className="places"
        aria-label="сетка карточек красивых мест России."
      >
        <ul className="places__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
