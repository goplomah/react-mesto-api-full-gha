import successImage from "../images/popup_success.svg";
import failImage from "../images/popup_fail.svg";
import usePopupClose from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, isSuccessReg }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          type="button"
          className="popup__close-btn"
          aria-label={"кнопка закрытия модального окна"}
          onClick={onClose}
        ></button>
        <img
          src={isSuccessReg ? successImage : failImage}
          alt="крестика или галочки в зависимости от ответа сервера."
          className="popup__info-img"
        />
        <h2 className="popup__title popup__title_type_tooltip">
          {isSuccessReg
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
