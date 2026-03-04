import { observer } from 'mobx-react-lite';

import cartStore from 'store/CartStore';
import { Button, Text, QuantityControl } from 'components';

import styles from './CartItem.module.scss';

interface CartItemProps {
  item: {
    product: {
      id: string | number;
      title: string;
      category: string;
      price: number;
      image: string;
    };
    quantity: number;
  };
  onClick?: () => void;
}

const CartItem = observer(({ item, onClick }: CartItemProps) => {
  const { product } = item;

  return (
    <div className={styles.cartItem} onClick={onClick}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <div className={styles.info}>
        <Text tag="h3" view="p-18">
          {product.title}
        </Text>
        <Text tag="p" view="p-18" color="secondary">
          {product.category}
        </Text>
        <Text tag="p" view="p-18" weight="bold">
          ${product.price}
        </Text>
      </div>

      <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
        <QuantityControl id={product.id} quantity={item.quantity} />

        <Button onClick={() => cartStore.removeFromCart(product.id)}>Delete</Button>
      </div>
    </div>
  );
});

export default CartItem;
