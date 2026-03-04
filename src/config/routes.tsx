import { type RouteObject } from 'react-router';

import App from '../App/App';
import CartPage from '../App/pages/CartPage/CartPage';
import ProductDetailsPage from '../App/pages/ProductDetailsPage/ProductDetailsPage';
import ProductPage from '../App/pages/ProductPage/ProductPage';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
      {
        path: 'product-page',
        element: <ProductPage />,
      },
      {
        path: 'product-card/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'cart-page',
        element: <CartPage />,
      },
    ],
  },
];
