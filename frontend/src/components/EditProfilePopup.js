import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormValue from "../hooks/useFormValue";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useFormValue();

  useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.description,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      submitButtonText="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        className="form__input form__input_name_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="form__input-error name-input-error"></span>
      <input
        id="job-input"
        type="text"
        name="description"
        className="form__input form__input_name_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.description || ""}
        onChange={handleChange}
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
