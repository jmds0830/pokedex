import { useState, useEffect } from 'react';
import styles from './FetchData.module.css';
import { Link, Outlet } from 'react-router-dom';

const typeStyles = {
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

      setPokemon([...pokemon, ...pokemonList]);
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
  };

  const filteredPokemon =
    selectedType === 'All'
      ? pokemon.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pokemon
          // .filter((item) => item.type.includes(selectedType))
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

  return (
    <>
      <div className={styles.navbar}>
        <img
          className={styles.navbarImage}
          src="https://ntrung1008.github.io/FrontEnd_Pokedex/resources/Pokedex.png"
        />
        <div className={styles.searchBox}>
          <select
            className={styles.select}
            defaultValue="All"
            onChange={handleTypeChange}
          >
            <option value disabled>
              Select Type
            </option>
            <option value="All">All Types</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Poison">Poison</option>
            <option value="Bug">Bug</option>
            <option value="Flying">Flying</option>
            <option value="Normal">Normal</option>
            <option value="Electric">Electric</option>
            <option value="Ground">Ground</option>
            <option value="Fairy">Fairy</option>
            <option value="Fighting">Fighting</option>
            <option value="Psychic">Psychic</option>
            <option value="Rock">Rock</option>
            <option value="Steel">Steel</option>
            <option value="Ice">Ice</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
          </select>
          <input
            className={styles.search}
            type="text"
            placeholder="Search Pokemon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.pokemonCard}>
        {filteredPokemon.map((item, index) => (
          <div className={styles.pokemonBorder} key={item.name}>
            <div className={styles.pokemonNumber}>#{item.number}</div>
            <div className={styles.pokemon} key={index}>
              <Link to={`/${item.name}`} className={styles.link}>
                <img
                  className={styles.pokemonImage}
                  src={item.sprite}
                  alt={item.name}
                />
                <div className={styles.pokemonName}>{item.name}</div>
              </Link>

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
        ))}
      </div>
      <button className={styles.loadMoreButton} onClick={loadMore}>
        Load More
      </button>

      <div className={styles.footer}>
        <span>© Jhune Michael Segismundo</span>
        <br />
        <span>Made using React</span>
      </div>
    </>
  );
}

export default FetchData;
