import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./styles/PokeInfoPage.css";

const PokeInfoPage = () => {
  const { name } = useParams();

  const [pokemon, getPokemon] = useFetch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    getPokemon(url);
  }, [name]);

  return (
    <article className="card">
      <header className="pokedex__header">
        <Link to="/pokedex">
          <img className="pokedex__img" src="pokedex.png" alt="pokedex" />
        </Link>
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
      <div className="card__body">
        <div className={`card__info bg__${pokemon?.types[0].type.name}`}>
          <div className={`card__header bg__${pokemon?.types[0].type.name}`}>
            <img
              className="card__img"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <h2 className="card__id">#{pokemon?.id}</h2>
          <div className="card__name-cont">
            <hr className="card__hr-l" />
            <h2 className="card__name">{pokemon?.name}</h2>
            <hr className="card__hr-r" />
          </div>
          <ul className="card__size">
            <li>
              <span className="card__size-md">Weight</span>
              <span className="card__size-nu">{pokemon?.weight / 10} kg</span>
            </li>
            <li>
              <span className="card__size-md">Height</span>
              <span className="card__size-nu">{pokemon?.height / 10} m</span>
            </li>
          </ul>
          <div className="card__types-cont">
            
              <h3 className="card__title">Type</h3>
              <ul className="card__container-ul">
                {pokemon?.types.map((typeInfo) => (
                  <li className="card__types" key={typeInfo.type.url}>
                    
                    <span className="card__types-name">
                      {typeInfo.type.name}
                    </span>
                  </li>
                ))}
              <h3 className="card__title">Abilities</h3>
                {pokemon?.abilities.map((abilityInfo) => (
                  <li className="card__abilities" key={abilityInfo.ability.url}>
                    {abilityInfo.ability.name}
                  </li>
                ))}
              </ul>
          </div>
          <div className="stats">
            <h2 className="card__stats">Stats</h2>
            <hr className="stats__hr" />
          </div>
            <ul className="stats__ul">
              {pokemon?.stats.map((statInfo) => (
                <li className="stats__list" key={statInfo.stat.name}>
                  <span className="stats__label">{statInfo.stat.name}</span> {statInfo.base_stat}/150<hr className={`poke_br br_${statInfo.base_stat}`} style={{'--porcentaje': `${statInfo.base_stat}%`}} />
                </li>
              ))}
            </ul>
          
        </div>
        <div className={`card__move-cont bg__${pokemon?.types[0].type.name}`}>
          <h2>Movements</h2>
          <hr className="move__hr" />
          <ul className="move__ul">
            {pokemon?.moves.slice(0, 10).map((moveInfo) => (
              <li className="move__list" key={moveInfo.move.name}>
                {moveInfo.move.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default PokeInfoPage;
