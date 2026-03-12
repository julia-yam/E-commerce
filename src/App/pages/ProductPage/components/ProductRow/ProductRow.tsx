import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Card, ProductAction } from 'components';

import { type ProductRowProps, ROUTES } from './configs';

import styles from './ProductRow.module.scss';

const ProductRow = observer(({ index, store }: ProductRowProps) => {
  const navigate = useNavigate();
  const { columnsCount, products } = store;

  const startIndex = index * columnsCount;
  const isRowLoaded = startIndex < products.length;
  const rowItems = products.slice(startIndex, startIndex + columnsCount);

  const skeletonItems = Array.from({ length: columnsCount });

  return (
    <div className={styles.rowWrapper}>
      {!isRowLoaded ? (
        <div className={styles.gridRow}>
          {skeletonItems.map((_, i) => (
            <Card key={`skeleton-${index}-${i}`} isLoading={true} />
          ))}
        </div>
      ) : (
        <div className={styles.gridRow}>
          {rowItems.map((product) => {
            return (
              <Card
                key={product.documentId}
                image={product.image}
                title={product.title}
                subtitle={product.description}
                captionSlot={product.category}
                contentSlot={`$${product.price}`}
                onClick={() => navigate(ROUTES.PRODUCT_CARD(product.documentId))}
                actionSlot={<ProductAction product={product} />}
              />
            );
          })}

          {rowItems.length < columnsCount &&
            Array.from({ length: columnsCount - rowItems.length }).map((_, i) => (
              <div key={`empty-${i}`} className={styles.emptySlot} />
            ))}
        </div>
      )}
    </div>
  );
});

export default ProductRow;
