import { Link, Routes, Route } from "react-router-dom";
import logo from "../images/header__logo.svg";
import { useState } from "react";

function Header({ email, onExit }) {
  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow(!isShow);
  };

  return (
    <header className={`header ${isShow && "header_show"}`}>
      <a
        href="/"
        className="header__link"
      >
        <img src={logo} alt="логотип сайта место." className="header__logo" />
      </a>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Вход
            </Link>
          }
        />
        <Route
          path="*"
          element={
            <Link className="header__link" to="/">
              На главную
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <nav className={`header__nav ${isShow && "header__nav_show"}`}>
                <p className="header__email">{email}</p>
                <Link className="header__link" to="/sign-in" onClick={onExit}>
                  Выход
                </Link>
              </nav>
              <button className="menu" onClick={handleShow}>
                <span
                  className={`menu__line ${isShow && "menu__line-1"}`}
                ></span>
                <span
                  className={`menu__line ${isShow && "menu__line-2"}`}
                ></span>
                <span
                  className={`menu__line ${isShow && "menu__line-3"}`}
                ></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
