import { useState, useEffect } from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';
import styles from '../styles/PokemonInfo.module.css';
import { typeStyles } from './FetchData';
import Header from '../components/Header';
import { FaArrowLeftLong } from 'react-icons/fa6';

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

  const primaryType = pokemonData.types[0].type.name;
  const backgroundColor = typeStyles[primaryType].backgroundColor;

  return (
    <>
      <Header>
        <h3 className={styles.back}>
          <Link className={styles.backButton} to="/">
            <FaArrowLeftLong size="20px" />
          </Link>
        </h3>
        <div className={styles.box}>
          <div className={styles.pokemonCard}>
            <div
              className={styles.numberContainer}
              style={{ backgroundColor: backgroundColor }}
            >
              <h2 className={styles.pokemonNumber}>#{number}</h2>
              <h2 className={styles.pokemonName}>{pokemonData.name}</h2>
            </div>
            <div className={styles.imageContainer}>
              <img
                className={styles.pokemonImage}
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
              />{' '}
              <img
                className={styles.pokemonImageBack}
                src={pokemonData.sprites.back_default}
                alt={pokemonData.name}
              />
            </div>
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
            <div className={styles.sizeContainer}>
              <div className={styles.size}>
                <span>Height: {height} m</span>
              </div>
              <div className={styles.size}>
                <span>Weight: {weight} kg</span>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <span className={styles.description}>Description:</span>
              <p className={styles.para}>{pokemonText}</p>
            </div>
            <div className={styles.children}>
              <div>
                <Link
                  className={styles.link}
                  to="stats"
                  style={{ color: backgroundColor }}
                >
                  <h3>STATS</h3>
                </Link>
              </div>
              <div>
                <Link
                  className={styles.link}
                  to="abilities"
                  style={{ color: backgroundColor }}
                >
                  <h3> ABILITIES</h3>
                </Link>
              </div>
            </div>
            <Outlet className={styles.outlet} />
          </div>
        </div>
      </Header>
    </>
  );
}

export default PokemonInfo;
