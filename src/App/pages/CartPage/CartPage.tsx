import { observer } from 'mobx-react-lite';
import cartStore from 'store/CartStore';
import { Button, Text } from 'components';

import styles from './CartPage.module.scss';

const CartPage = observer(() => {
  if (cartStore.items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <Text tag="h2" view="title">
          Cart is empty
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <Text tag="h1" view="title">
        Cart
      </Text>

      <div className={styles.content}>
        <div className={styles.itemsList}>
          {cartStore.items.map(({ product, quantity }) => (
            <div key={product.id} className={styles.cartItem}>
              <img src={product.image} alt={product.title} className={styles.image} />

              <div className={styles.info}>
                <Text tag="h3" view="p-18">
                  {product.title}
                </Text>
                <Text tag="p" view="p-18" color="secondary" className={styles.category}>
                  {product.category}
                </Text>
                <Text tag="p" view="p-18" weight="bold" className={styles.price}>
                  ${product.price}
                </Text>
              </div>

              <div className={styles.controls}>
                <div className={styles.quantity}>
                  <button onClick={() => cartStore.changeQuantity(product.id, -1)}>−</button>
                  <Text tag="span" view="p-16">
                    {quantity}
                  </Text>
                  <button onClick={() => cartStore.changeQuantity(product.id, 1)}>+</button>
                </div>

                <Button onClick={() => cartStore.removeFromCart(product.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <Text tag="h3" view="p-16">
            Total
          </Text>
          <div className={styles.summaryDetails}>
            {cartStore.items.map(({ product, quantity }) => (
              <div key={product.id} className={styles.summaryRow}>
                <Text tag="span" view="p-14">
                  {product.title} {quantity > 1 && `(${quantity})`}
                </Text>
                <Text tag="span" view="p-14">
                  ${(product.price * quantity).toFixed(2)}
                </Text>
              </div>
            ))}
          </div>
          <hr />
          <div className={styles.total}>
            <Text tag="span" view="p-16">
              For payment:
            </Text>
            <Text tag="span" view="p-16" className={styles.totalAmount}>
              ${cartStore.totalPrice}
            </Text>
          </div>
          <Button className={styles.checkoutBtn}>Place an order</Button>
        </aside>
      </div>
    </div>
  );
});

export default CartPage;
