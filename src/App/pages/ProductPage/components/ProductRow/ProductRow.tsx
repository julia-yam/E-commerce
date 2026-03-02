import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'components';
import { useCartActions } from 'hooks/useCartActions';
import styles from './ProductRow.module.scss';
import { type ProductRowProps, BREAKPOINTS, ROUTES, getButtonLabel } from './configs';

const ProductRow = observer(({ index, style, store }: ProductRowProps) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < BREAKPOINTS.MOBILE;
  const { columnsCount, products } = store;

  const startIndex = index * columnsCount;
  const isRowLoaded = startIndex < products.length;
  const rowItems = products.slice(startIndex, startIndex + columnsCount);

  const skeletonItems = Array.from({ length: columnsCount });

  const { handleAddToCart } = useCartActions();

  return (
    <div style={style} className={styles.rowWrapper}>
      {!isRowLoaded ? (
        <div className={styles.gridRow}>
          {skeletonItems.map((_, i) => (
            <Card key={`skeleton-${index}-${i}`} isLoading={true} />
          ))}
        </div>
      ) : (
        <div className={styles.gridRow}>
          {rowItems.map((product) => (
            <Card
              key={product.documentId}
              image={product.image}
              title={product.title}
              subtitle={product.description}
              captionSlot={product.category}
              contentSlot={`$${product.price}`}
              onClick={() => navigate(ROUTES.PRODUCT_CARD(product.documentId))}
              actionSlot={
                <Button disabled={!product.isInStock} onClick={(e) => handleAddToCart(e, product)}>
                  {getButtonLabel(product.isInStock, isMobile)}
                </Button>
              }
            />
          ))}
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
