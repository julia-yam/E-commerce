import { observer } from 'mobx-react-lite';

import cartStore from 'store/CartStore';
import { Button, QuantityControl } from 'components';
import { useCartActions } from 'hooks/useCartActions';

import styles from './ProductAction.module.scss';

const ProductAction = observer(({ product }: { product: any }) => {
  const getButtonLabels = (isInStock: boolean) => {
    if (!isInStock) {
      return { desktop: 'Not Available', mobile: 'Not' };
    }
    return { desktop: 'Add To Cart', mobile: 'Add' };
  };

  const { handleAddToCart } = useCartActions();
  const labels = getButtonLabels(product.isInStock);

  const cartItem = cartStore.items.find(
    (item) =>
      item.product.id === product.documentId || item.product.documentId === product.documentId
  );

  return (
    <div className={styles.actionWrapper} onClick={(e) => e.stopPropagation()}>
      {cartItem ? (
        <QuantityControl id={cartItem.product.id} quantity={cartItem.quantity} />
      ) : (
        <Button
          disabled={!product.isInStock}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(e, product);
          }}
        >
          <span className={styles.desktopLabel}>{labels.desktop}</span>
          <span className={styles.mobileLabel}>{labels.mobile}</span>
        </Button>
      )}
    </div>
  );
});

export default ProductAction;
