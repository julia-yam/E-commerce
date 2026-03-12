import React, { useCallback } from 'react';

import cartStore from 'store/CartStore';

export const useCartActions = () => {
  const handleAddToCart = useCallback((e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    e.preventDefault();

    cartStore.addToCart(product);
  }, []);

  return { handleAddToCart };
};
