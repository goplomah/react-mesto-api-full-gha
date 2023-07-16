import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({ name, card, onClose }) {
  const isOpen = Object.keys(card).length;
  usePopupClose(isOpen, onClose);
  return (
    <div
      className={`popup popup_type_${name} ${card.name ? "popup_opened" : ""}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          className="popup__close-btn"
          aria-label={"кнопка закрытия модального окна"}
          onClick={onClose}
        ></button>
        <figure className="popup__image-wrapper">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__discription">
            <p className="popup__text">{card.name}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
