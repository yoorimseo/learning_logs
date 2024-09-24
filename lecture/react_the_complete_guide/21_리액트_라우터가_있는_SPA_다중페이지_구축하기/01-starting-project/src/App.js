import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: 'true', path: '', element: <Home /> },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
