import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import cartStore from 'store/CartStore';
import { Text } from 'components';

import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';

import styles from './CartPage.module.scss';

const CartPage = observer(() => {
  const navigate = useNavigate();
  const hasItems = cartStore.items.length > 0;

  return (
    <div className={styles.cartContainer}>
      <Text tag="h1" view="title" className={styles.title}>
        Cart
      </Text>

      <div className={styles.content}>
        {hasItems ? (
          <>
            <div className={styles.itemsList}>
              {cartStore.items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onClick={() => navigate(`/product-card/${item.product.documentId}`)}
                />
              ))}
            </div>
            <CartSummary />
          </>
        ) : (
          <div className={styles.emptyCart}>
            <Text tag="h2" view="title">
              Cart is empty
            </Text>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartPage;
