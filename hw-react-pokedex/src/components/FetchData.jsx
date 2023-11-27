import { useState, useEffect } from 'react';

const typeStyles = {
  fire: { backgroundColor: 'rgb(240, 128, 48)' },
  water: { backgroundColor: 'rgb(24,71,215)' },
  grass: { backgroundColor: 'rgb(54,145,67)' },
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

  async function fetchPokeImage(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const image = await response.json();
      return image.sprites.front_default;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchPokeNumber(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const number = await response.json();

      return String(number.id).padStart(3, '0');
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchPokeType(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      const types = data.types.map((type) => type.type.name);
      return types;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchPokeData() {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
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

      setPokemon(pokemonList);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchPokeData();
  }, []);

  return (
    <>
      <div>NAV</div>
      <div className="pokemon-card">
        {pokemon.map((item, index) => (
          <div className="pokemon" key={index}>
            <div className="pokemon-number">#{item.number}</div>
            <img src={item.sprite} alt={item.name} />
            <p className="pokemon-name">{item.name}</p>
            <div>
              {item.type.map((type, typeIndex) => (
                <div key={typeIndex} style={typeStyles[type]}>
                  {type}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FetchData;
