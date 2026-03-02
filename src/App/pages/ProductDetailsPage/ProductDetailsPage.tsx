import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { BackButton, Text, Button, Loader } from 'components';
import { RelatedItemList } from './components/RelatedItemList';
import ProductDetailsStore from 'store/ProductDetailsStore';
import { useCartActions } from 'hooks/useCartActions';

import styles from './ProductDetailsPage.module.scss';

interface ProductCardProps {
  id?: string;
}

const ProductDetailsPage = ({ id: propsId }: ProductCardProps) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = propsId || params.id;

  const [store] = useState(() => new ProductDetailsStore());

  const { handleAddToCart } = useCartActions();

  useEffect(() => {
    if (typeof id === 'string') {
      void store.fetchData(id);
    }

    return () => store.destroy();
  }, [id, store]);

  const handleBackClick = () => navigate(-1);

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    handleAddToCart(e, product);
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
        <Text view="title">Product not found</Text>
        <Button onClick={handleBackClick}>Back</Button>
      </div>
    );
  }

  const { product, relatedProducts } = store;

  return (
    <div className={styles.productDetail}>
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
              <Text view="p-20" weight="normal" tag="p" color="secondary" maxLines={3}>
                {product.description}
              </Text>
            </div>

            <Text weight="bold" className={styles.price} view="p-20">
              ${product.price}
            </Text>

            <div className={styles.button}>
              <Button disabled={!product.isInStock} onClick={(e) => handleBuyNow(e, product)}>
                {product.isInStock ? 'Buy Now' : 'Not Available'}
              </Button>

              <Button
                disabled={!product.isInStock}
                className={styles.buttonAdd}
                onClick={(e) => handleAddToCart(e, product)}
              >
                {product.isInStock ? 'Add To Cart' : 'Not Available'}
              </Button>
            </div>
          </div>
        </section>
        <RelatedItemList items={relatedProducts} />
      </div>
    </div>
  );
};

export default observer(ProductDetailsPage);
