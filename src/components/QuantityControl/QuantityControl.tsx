import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import cartStore from 'store/CartStore';
import { Text } from 'components';

import styles from './QuantityControl.module.scss';

interface QuantityControlProps {
  id: string | number;
  quantity: number;
  className?: string;
}

const QuantityControl = observer(({ id, quantity, className }: QuantityControlProps) => {
  return (
    <div className={cn(styles.quantity, className)} onClick={(e) => e.stopPropagation()}>
      <button
        className={styles.controlBtn}
        onClick={(e) => {
          e.stopPropagation();
          cartStore.changeQuantity(id, -1);
        }}
      >
        −
      </button>

      <Text tag="span" view="p-16" className={styles.value}>
        {quantity}
      </Text>

      <button
        className={styles.controlBtn}
        onClick={(e) => {
          e.stopPropagation();
          cartStore.changeQuantity(id, 1);
        }}
      >
        +
      </button>
    </div>
  );
});

export default QuantityControl;
