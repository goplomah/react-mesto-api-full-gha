import useSound from "use-sound";
import blinking from "../sounds/blink.mp3";

function PageNotFound() {
  const [play, { stop }] = useSound(blinking);
  return (
    <>
      <section className="not-found">
        <div className="not-found__container">
          <div className="blink-lamp">
            <p
              className="not-found__code"
              onMouseEnter={() => play()}
              onMouseLeave={() => stop()}
            >
              4<span className="not-found__code_type_blink">0</span>4
            </p>
          </div>
        </div>
        <h2 className="not-found__title">
          Упс...кажется страничка не нашлась)
        </h2>
        <p className="not-found__text">
          К сожалению, запрашиваемая страница не найдена. Возможно, вы перешли
          по ссылке, в которой была допущена ошибка, или ресурс был удален.
          Попробуйте перейти на главную страницу
        </p>
      </section>
    </>
  );
}

export default PageNotFound;
