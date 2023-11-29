import { createBrowserRouter } from 'react-router-dom';
import FetchData from './pages/FetchData';
import NotFoundPage from './pages/NotFoundPage';
import PokemonInfo from './pages/PokemonInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FetchData />,
  },
  {
    path: ':pokemonId',
    element: <PokemonInfo />,
    children: [],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
