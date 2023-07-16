import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__button-like ${
    isLiked && "places__button-like_active"
  }`;

  return (
    <li className="places__item">
      <figure className="places__image-wrapper">
        <img
          src={card.link}
          alt={card.name}
          className="places__image"
          onClick={handleCardClick}
        />
        <figcaption className="places__discription">
          <p className="places__text">{card.name}</p>
          <div className="places__wrapper-like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="кнопка лайка"
              onClick={handleLikeClick}
            ></button>
            <p className="places__like-counter">{card.likes.length}</p>
          </div>
        </figcaption>
        {isOwn && (
          <button
            type="button"
            className="places__button-trash"
            onClick={handleDeleteClick}
            aria-label="кнопка удаления"
          ></button>
        )}
      </figure>
    </li>
  );
}

export default Card;
