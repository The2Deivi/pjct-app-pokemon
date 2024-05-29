import { useRef } from "react";
import { setTrainer } from "../store/slices/trainer.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../pages/HomePage.css";

const HomePage = () => {
  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainer(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="home">
      <img className="home__img" src="pokedex.png" alt="pokedex" />
      <span className="home__span">¡Hi trainer!</span>
      <p className="home__p">
        If you want to find your favorite pokemon, please give me your trainer
        name
      </p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="home__input" ref={inputTrainer} type="text" placeholder="Tu nombre..." />
        <button className="home__btn">Cath them all</button>
      </form>
      <footer className="footer">
        <div className="footer__stripe footer__stripe--red"></div>
        <div className="footer__stripe footer__stripe--black"></div>
        <div className="circle-container">
        <div className="outer-circle">
          <div className="inner-circle"></div>
        </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
