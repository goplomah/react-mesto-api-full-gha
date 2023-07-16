import { useState, useEffect } from "react";

function Scroll() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`to-top ${scroll > 500 && "to-top_active"}`}
      onClick={handleScrollToTop}
    ></button>
  );
}

export default Scroll;
