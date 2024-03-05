import { createBrowserRouter } from 'react-router-dom';
import FetchData from './pages/FetchData';
import NotFoundPage from './pages/NotFoundPage';
import PokemonInfo from './pages/PokemonInfo';
import Stats from './pages/Stats';
import Abilities from './pages/Abilities';

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
        path: 'stats',
        element: <Stats />,
      },
      {
        path: 'abilities',
        element: <Abilities />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
