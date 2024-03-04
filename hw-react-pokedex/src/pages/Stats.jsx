import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { typeStyles } from './FetchData';
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
      <hr />
      {pokemonData && (
        <div className={styles.stats}>
          <h2>Base Stats:</h2>
          <div className={styles.statsContent}>
            {/* {pokemonData.stats.map((stat, index) => (
              <p key={index}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))} */}

            <div className={styles.statContainer}>
              <span>hp: {pokemonData.stats[0].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[0].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
            <div className={styles.statContainer}>
              <span>attack: {pokemonData.stats[1].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[1].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
            <div className={styles.statContainer}>
              <span>defense: {pokemonData.stats[2].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[2].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
            <div className={styles.statContainer}>
              <span>sp.attack: {pokemonData.stats[3].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[3].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
            <div className={styles.statContainer}>
              <span>sp.defense: {pokemonData.stats[4].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[4].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
            <div className={styles.statContainer}>
              <span>speed: {pokemonData.stats[5].base_stat}</span>
              <div
                className={styles.graph}
                style={{
                  width: `${pokemonData.stats[5].base_stat + 10}px`,
                  backgroundColor:
                    typeStyles[pokemonData.types[0].type.name]?.backgroundColor,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stats;
