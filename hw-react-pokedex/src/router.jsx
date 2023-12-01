import { createBrowserRouter } from 'react-router-dom';
import FetchData from './pages/FetchData';
import NotFoundPage from './pages/NotFoundPage';
import PokemonInfo from './pages/PokemonInfo';
import Moves from './pages/Moves';
import Stats from './pages/Stats';

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
