import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Allbooks from '@/pages/Allbooks';
import AddNewBook from '@/pages/AddNewBook';
import Signup from '@/pages/Signup';
import BookDetails from '@/pages/BookDetails';

import WishList from '@/pages/WishList';
import UpdateBook from '@/pages/UpdateBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/allbooks',
        element: <Allbooks />,
      },
      {
        path: '/book-details/:id',
        element:<BookDetails /> ,
      },
      {
        path: '/book-edit/:id',
        element: <UpdateBook />,
      },
      {
        path: '/addnewbook',
        element:  <AddNewBook />,
      },
      {
        path: '/wishlist',
        element:  <WishList />,
      },
      
    ],
    
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  
]);

export default routes;
