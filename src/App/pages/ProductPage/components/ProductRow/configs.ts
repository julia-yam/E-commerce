import ProductListStore from 'store/ProductListStore';

export interface ProductRowProps {
  index: number;
  store: ProductListStore;
}

export const ROUTES = {
  PRODUCT_CARD: (id: string | number) => `/product-card/${id}`,
};
