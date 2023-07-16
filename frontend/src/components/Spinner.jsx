import spinner from "../images/preloader_type_white.svg";

function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} className="preloader rotate" />
    </div>
  );
}

export default Spinner;
