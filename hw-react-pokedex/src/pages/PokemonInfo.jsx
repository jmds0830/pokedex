import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from './PokemonInfo.module.css';
import { typeStyles } from './FetchData';
import { Link } from 'react-router-dom';

function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonText, setPokemonText] = useState('');
  const { pokemonId } = useParams();

  async function fetchPokeData() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  async function fetchPokeText() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      const result = await response.json();
      const flavorText = result.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );

      setPokemonText(flavorText.flavor_text);
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  useEffect(() => {
    fetchPokeData();
    fetchPokeText();
  }, [pokemonId]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const number = String(pokemonData.id).padStart(3, '0');
  const height = (pokemonData.height * 0.1).toFixed(1);
  const weight = (pokemonData.weight * 0.1).toFixed(1);

  return (
    <>
      {/* <div className={styles.navbar}>
        <img
          className={styles.navbarImage}
          src="https://ntrung1008.github.io/FrontEnd_Pokedex/resources/Pokedex.png"
        />
      </div> */}

      <h3 className={styles.back}>
        <Link to="/">Go back</Link>
      </h3>

      <div className={styles.box}>
        <div className={styles.pokemonCard}>
          <div className={styles.numberContainer}>
            <h2 className={styles.pokemonNumber}>#{number}</h2>
            <h2 className={styles.pokemonName}>{pokemonData.name}</h2>
          </div>
          <img
            className={styles.pokemonImage}
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
          />
          {/* <div className={styles.size}>
            {pokemonData.stats.map((stat, index) => (
              <p key={index}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
          </div> */}

          <div>
            {pokemonData.types.map((type, typeIndex) => (
              <span
                key={typeIndex}
                className={styles.pokemonType}
                style={typeStyles[type.type.name]}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <span className={styles.size}>Height: {height} m</span>
          <span className={styles.size}>Weight: {weight} kg</span>
          <span className={styles.description}>Description:</span>
          <p className={styles.para}>{pokemonText}</p>
          <div className={styles.children}>
            <h3>
              <Link to="stats">Stats</Link>
            </h3>
            <h3>
              <Link to="moves">Moves</Link>
            </h3>
          </div>

          <Outlet />
        </div>
      </div>

      {/* <div className={styles.footer}>
        <div>© Jhune Michael Segismundo</div>
        <div>Made using React</div>
      </div> */}
    </>
  );
}

export default PokemonInfo;
