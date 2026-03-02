import React from 'react';
import ProductListStore from 'store/ProductListStore';

export interface ProductRowProps {
  index: number;
  style: React.CSSProperties;
  store: ProductListStore;
}

export const BREAKPOINTS = {
  MOBILE: 768,
};

export const ROUTES = {
  PRODUCT_CARD: (id: string | number) => `/product-card/${id}`,
};

export const getButtonLabel = (isInStock: boolean, isMobile: boolean): string => {
  if (!isInStock) {
    return isMobile ? 'Not' : 'Not Available';
  }
  return isMobile ? 'Add' : 'Add To Cart';
};
