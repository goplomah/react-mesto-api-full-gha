import Spinner from "./Spinner";
import useFormValue from "../hooks/useFormValue";

function Login({ onLogin, isLoading }) {
  const { values, handleChange } = useFormValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.password, values.email);
  };

  return (
    <section className="login">
      <h2 className="form__title">Вход</h2>
      <form className="form form_type_login" onSubmit={handleSubmit}>
        <input
          id="email-input"
          type="email"
          name="email"
          className="form__input form__input_name_email form__input_type_dark"
          placeholder="E-mail"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="form__input-error form__input-error_type_dark email-input-error"></span>
        <input
          id="password-input"
          type="password"
          name="password"
          className="form__input form__input_name_password form__input_type_dark"
          placeholder="Пароль"
          required
          value={values.password || ""}
          minLength="5"
          maxLength="200"
          onChange={handleChange}
        />
        <span className="form__input-error form__input-error_type_dark password-input-error"></span>
        <button
          type="submit"
          className={`form__send form__send_type_dark hover_type_dark ${
            isLoading && "form__send_disabled"
          }`}
        >
          {isLoading ? <Spinner /> : "Войти"}
        </button>
      </form>
    </section>
  );
}

export default Login;
