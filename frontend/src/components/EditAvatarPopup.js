import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="avatar-patch-url-input"
        type="url"
        name="avatar"
        className="form__input form__input_name_link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="form__input-error avatar-patch-url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
