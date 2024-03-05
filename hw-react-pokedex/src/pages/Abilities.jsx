import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Abilities.module.css';

function Abilities() {
  const [pokemonData, setPokemonData] = useState(null);
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

  useEffect(() => {
    fetchPokeData();
  }, [pokemonId]);

  return (
    <>
      <div className={styles.pokemonAbilities}>
        {pokemonData && (
          <div className={styles.abilities}>
            <h2>Main Abilities:</h2>
            <div className={styles.abilitiesContent}>
              {pokemonData.abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Abilities;
