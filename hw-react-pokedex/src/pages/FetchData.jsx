import { useState, useEffect } from 'react';
import styles from '../styles/FetchData.module.css';
import { Link } from 'react-router-dom';

export const typeStyles = {
  fire: { backgroundColor: 'rgb(240, 128, 48)' },
  water: { backgroundColor: 'rgb(24,71,215)' },
  grass: { backgroundColor: 'rgb(80, 199, 99)' },
  poison: { backgroundColor: 'rgb(160,64,160)' },
  bug: { backgroundColor: 'rgb(155,204,80)' },
  flying: { backgroundColor: 'rgb(48,167,215)' },
  normal: { backgroundColor: 'rgb(153, 153, 153)' },
  electric: { backgroundColor: 'rgb(248,208,48)' },
  ground: { backgroundColor: 'rgb(171,152,66)' },
  fairy: { backgroundColor: 'rgb(238,153,172)' },
  fighting: { backgroundColor: 'rgb(192,48,40)' },
  psychic: { backgroundColor: 'rgb(248,88,136)' },
  rock: { backgroundColor: 'rgb(135, 100, 60)' },
  steel: { backgroundColor: 'rgb(159, 158, 184)' },
  ice: { backgroundColor: 'rgb(81,196,231)' },
  ghost: { backgroundColor: 'rgb(123,98,163)' },
  dragon: { backgroundColor: 'rgb(112,56,248)' },
  dark: { backgroundColor: 'rgb(112,88,72)' },
};

function FetchData() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  async function fetchPokeImage(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const image = await response.json();
      return image.sprites.front_default;
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  async function fetchPokeNumber(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const number = await response.json();

      return String(number.id).padStart(3, '0');
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  async function fetchPokeType(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      const types = data.types.map((type) => type.type.name);
      return types;
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  async function fetchPokeData() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const result = await response.json();

      const pokemonList = await Promise.all(
        result.results.map(async (pokemon) => {
          const sprite = await fetchPokeImage(pokemon.name);
          const number = await fetchPokeNumber(pokemon.name);
          const type = await fetchPokeType(pokemon.name);

          return { ...pokemon, sprite, number, type };
        })
      );

      setPokemon((prevPokemon) => {
        const filteredNewPokemon = pokemonList.filter((newPokemon) => {
          if (
            !prevPokemon.some(
              (existingPokemon) => existingPokemon.name === newPokemon.name
            )
          ) {
            return true;
          } else {
            return false;
          }
        });
        return [...prevPokemon, ...filteredNewPokemon];
      });
    } catch (error) {
      console.error('Error fetching Pokemon data', error);
    }
  }

  const loadMore = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {
    fetchPokeData();
  }, [offset, limit]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setOffset(0);
    setLimit(200);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setLimit(200);
  };

  const filteredPokemon =
    selectedType === 'All'
      ? pokemon.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pokemon
          .filter((item) => item.type.includes(selectedType))
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

  return (
    <>
      <div className={styles.navbar}>
        <img
          className={styles.navbarImage}
          src="https://ntrung1008.github.io/FrontEnd_Pokedex/resources/Pokedex.png"
          alt="Pokedex"
        />
        <div className={styles.searchBox}>
          <select
            className={styles.select}
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="All">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="poison">Poison</option>
            <option value="bug">Bug</option>
            <option value="flying">Flying</option>
            <option value="normal">Normal</option>
            <option value="electric">Electric</option>
            <option value="ground">Ground</option>
            <option value="fairy">Fairy</option>
            <option value="fighting">Fighting</option>
            <option value="psychic">Psychic</option>
            <option value="rock">Rock</option>
            <option value="steel">Steel</option>
            <option value="ice">Ice</option>
            <option value="ghost">Ghost</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
          </select>
          <input
            className={styles.search}
            type="text"
            placeholder="Search Pokemon"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.pokemonCard}>
        {filteredPokemon.map((item, index) => (
          <Link to={`/${item.name}`} className={styles.link} key={index}>
            <div className={styles.pokemonBorder}>
              <div className={styles.pokemonNumber}>#{item.number}</div>
              <div className={styles.pokemon} key={index}>
                <img
                  className={styles.pokemonImage}
                  src={item.sprite}
                  alt={item.name}
                />
                <div className={styles.pokemonName}>{item.name}</div>
                <div>
                  {item.type.map((type, typeIndex) => (
                    <span
                      className={styles.pokemonType}
                      key={typeIndex}
                      style={typeStyles[type]}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load More
        </button>
      </div>

      <div className={styles.footer}>
        <div>Made by Jhune Michael Segismundo using React</div>
        <div>Information sourced from pokeAPI</div>
      </div>
    </>
  );
}

export default FetchData;
