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

  return (
    <>
      <div className={styles.navbar}>
        <img
          className={styles.navbarImage}
          src="https://ntrung1008.github.io/FrontEnd_Pokedex/resources/Pokedex.png"
        />
      </div>
      <Link to="/">Go back</Link>
      <div className={styles.pokemonCard}>
        <img
          className={styles.image}
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
        <h2 className={styles.pokemonName}>{pokemonData.name}</h2>

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
        <p className={styles.para}>Height: {pokemonData.height} in.</p>
        <p className={styles.para}>Weight: {pokemonData.weight} lbs.</p>
        <p className={styles.para}> {pokemonText}</p>
        <Link to="about">About</Link>
        <Link to="moves">Moves</Link>
        <Outlet />
      </div>

      <div className={styles.footer}>
        <div>© Jhune Michael Segismundo</div>
        <div>Made using React</div>
      </div>
    </>
  );
}

export default PokemonInfo;
