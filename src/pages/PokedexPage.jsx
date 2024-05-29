import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "./styles/PokedexPage.css";
import { Link } from "react-router-dom";

const PokedexPage = () => {
  const [searchedName, setSearchedName] = useState("");

  const [typeSelected, setTypeSelected] = useState("allPokemons");

  const trainer = useSelector((states) => states.trainer);

  const [pokemons, getPokemons, getTypePokemon] = useFetch();

  useEffect(() => {
    if (typeSelected === "allPokemons") {
      //Hacemos la peticion de todos los pokemons
      const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
      getPokemons(url);
    } else {
      //Peticion de los pokemons por tipo
      getTypePokemon(typeSelected);
    }
  }, [typeSelected]);

  const inputName = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedName(inputName.current.value.trim().toLowerCase());
  };

  const callbackFilter = (poke) => {
    const filterName = poke.name.includes(searchedName);
    return filterName;
  };

  return (
    <div className="pokedex">
      <header className="pokedex__header">
      <Link to='/'><img className="pokedex__img" src="pokedex.png" alt="pokedex" /></Link>
      <div className="pokedex--footer">
        <div className="footer__stripe footer__stripe--red"></div>
        <div className="footer__stripe footer__stripe--black"></div>
        <div className="circle--container">
          <div className="outer--circle">
            <div className="inner--circle"></div>
          </div>
        </div>
      </div>
      </header>
      <p className="poke__p">
        <span className="span__name">Welcome {trainer}</span>, here you find your favorite pokemon
      </p>
      <div className="container__form">
      <form className="poke__form" onSubmit={handleSearch} action="">
        <input className="form__input" ref={inputName} type="text" placeholder="Search for a Pokémon" />
        <button className="form__btn">Search</button>
      </form>
      <form className="poke__select">
        <SelectType setTypeSelected={setTypeSelected} />
      </form>
      </div>
      <div className="poke__cards">
        {pokemons && pokemons.results.filter(callbackFilter).length === 0 ? (
          <h2>No Pokémon found with that name</h2>
        ) : (
          pokemons?.results
            .filter(callbackFilter)
            .map((poke) => <PokeCard key={poke.url} poke={poke} />)
        )}
      </div>
    </div>
  );
};

export default PokedexPage;
