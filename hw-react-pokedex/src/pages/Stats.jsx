import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Stats.module.css';

function Stats() {
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
      <div className={styles.pokemonStats}>
        {pokemonData && (
          <div className={styles.stats}>
            <h2>Base Stats:</h2>
            <div className={styles.statsContent}>
              {pokemonData.stats.map((stat, index) => (
                <p key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
            </div>

            <h2>Main Abilities:</h2>
            <div className={styles.statsContent}>
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

export default Stats;
