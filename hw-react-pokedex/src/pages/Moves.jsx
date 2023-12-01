import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Moves.module.css';

function Moves() {
  const [moves, setMoves] = useState([]);
  const { pokemonId } = useParams();

  async function getAllMoves() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const result = await response.json();
      const moveUrls = result.moves.map((move) => move.move.url);

      const moveDetails = await Promise.all(
        moveUrls.map((url) => fetch(url).then((response) => response.json()))
      );

      const moveNames = moveDetails.map((move) => move.name);

      setMoves(moveNames);
    } catch (error) {
      console.error('Error fetching data', error.message);
    }
  }

  useEffect(() => {
    getAllMoves();
  }, [pokemonId]);

  return (
    <div className={styles.pokemonMoves}>
      {moves.map((move, index) => (
        <span key={index}>{move}, </span>
      ))}
    </div>
  );
}

export default Moves;
