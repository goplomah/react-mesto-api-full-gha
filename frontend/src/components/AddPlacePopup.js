import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValue from "../hooks/useFormValue";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = useFormValue();

  useEffect(() => {
    setValues({
      title: "",
      link: "",
    });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.link,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      submitButtonText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="add-title-input"
        type="text"
        name="title"
        className="form__input form__input_name_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.title || ""}
        onChange={handleChange}
      />
      <span className="form__input-error add-title-input-error"></span>
      <input
        id="add-url-input"
        type="url"
        name="link"
        className="form__input form__input_name_link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="form__input-error add-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
