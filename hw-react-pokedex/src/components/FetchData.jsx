import { useState, useEffect } from 'react';

async function FetchData() {
  try {
    const result = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
    const allPokemon = await result.json();
    return allPokemon;
  } catch (error) {
    return error('error fetching data:', error);
  }
}

function PokemonList() {
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}

export default PokemonList;
