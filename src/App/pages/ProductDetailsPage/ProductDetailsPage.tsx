import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';

import cartStore from 'store/CartStore';
import ProductDetailsStore from 'store/ProductDetailsStore';
import { BackButton, Text, Button, Loader, ProductAction } from 'components';
import { useCartActions } from 'hooks/useCartActions';

import { RelatedItemList } from './components/RelatedItemList';

import styles from './ProductDetailsPage.module.scss';

const ProductDetailsPage = observer(({ id: propsId }: { id?: string }) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = propsId || params.id;

  const [store] = useState(() => new ProductDetailsStore());
  const { handleAddToCart } = useCartActions();

  useEffect(() => {
    if (id) store.fetchData(id);
    return () => store.destroy();
  }, [id, store]);

  const handleBackClick = () => navigate(-1);

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    const isInCart = cartStore.items.some(
      (item) =>
        item.product.id === product.documentId || item.product.documentId === product.documentId
    );

    if (!isInCart) {
      handleAddToCart(e, product);
    }
    navigate('/cart-page');
  };

  if (!store.isInitialized) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="l" />
      </div>
    );
  }

  if (!store.product) {
    return (
      <div className={styles.productDetail}>
        <div className={styles.container}>
          <Text view="title">Product not found</Text>
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </div>
    );
  }

  const { product, relatedProducts } = store;

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        <div className={styles.back}>
          <BackButton onClick={handleBackClick} className={styles.backButton}>
            Назад
          </BackButton>
        </div>

        <div className={styles.productBody}>
          <section className={styles.product}>
            <div className={styles.img}>
              <img src={product.image} alt={product.title} className={styles.cardImage} />
            </div>

            <div className={styles.details}>
              <div className={styles.description}>
                <Text className={styles.title} weight="bold" maxLines={2}>
                  {product.title}
                </Text>
                <Text view="p-20" weight="normal" tag="p" color="secondary">
                  {product.description}
                </Text>
              </div>

              <Text weight="bold" className={styles.price} view="p-20">
                ${product.price}
              </Text>

              <div className={styles.actionsBlock}>
                <Button
                  disabled={!product.isInStock}
                  onClick={(e) => handleBuyNow(e, product)}
                  className={styles.buyNow}
                >
                  {product.isInStock ? 'Buy Now' : 'Not Available'}
                </Button>

                <div className={styles.cartActionWrapper}>
                  <ProductAction product={product} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <RelatedItemList items={relatedProducts} />
    </div>
  );
});

export default ProductDetailsPage;
