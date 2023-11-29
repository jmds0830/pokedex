import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PokemonInfo.module.css';

function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState(null);
  const { pokemonId } = useParams();

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        console.log('Fetching data for Pokemon ID:', pokemonId); // Log for debugging
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    }

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <img
          className={styles.image}
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
        />
      </div>
      <div>
        <h2 className={styles.pokemonName}>{pokemonData.name}</h2>
      </div>
      <div>
        <p className={styles.para}>Height: {pokemonData.height}</p>
        <p className={styles.para}>Weight: {pokemonData.weight}</p>
        <p className={styles.para}>
          Moves: {pokemonData.moves.map((move) => move.move.name).join(', ')}
        </p>
      </div>
    </>
  );
}

export default PokemonInfo;
