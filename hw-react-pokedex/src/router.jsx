import { createBrowserRouter } from 'react-router-dom';
import FetchData from './pages/FetchData';
import NotFoundPage from './pages/NotFoundPage';
import PokemonInfo from './pages/PokemonInfo';
import AboutPokemon from './pages/AboutPokemon';
import Moves from './pages/Moves';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FetchData />,
  },
  {
    path: ':pokemonId',
    element: <PokemonInfo />,
    children: [
      {
        path: 'about',
        element: <AboutPokemon />,
      },
      {
        path: 'moves',
        element: <Moves />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
