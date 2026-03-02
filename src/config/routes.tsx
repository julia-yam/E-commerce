import { type RouteObject } from 'react-router';
import App from '../App/App.tsx';
import ProductDetailsPage from '../App/pages/ProductDetailsPage/ProductDetailsPage.tsx';
import ProductPage from '../App/pages/ProductPage/ProductPage.tsx';
import CartPage from '../App/pages/CartPage/CartPage.tsx';

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
