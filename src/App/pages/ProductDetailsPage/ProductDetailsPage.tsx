import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { BackButton, Card, Text, Button } from 'components';
import ProductDetailsStore from '../../../store/ProductDetailsStore';

import styles from './ProductDetailsPage.module.scss';

interface ProductCardProps {
  id?: string;
}

const ProductDetailsPage = ({ id: propsId }: ProductCardProps) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = propsId || params.id;

  const [store] = useState(() => new ProductDetailsStore());

  useEffect(() => {
    if (typeof id === 'string') {
      void store.fetchData(id);
    }

    return () => store.destroy();
  }, [id, store]);

  const handleBackClick = () => navigate(-1);

  if (!store.isInitialized) return null;

  if (!store.product) {
    return (
      <div className={styles.productDetail}>
        <Text view="title">Product not found</Text>
        <Button onClick={handleBackClick}>Back</Button>
      </div>
    );
  }

  const { product } = store;

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

            <Text weight="bold" className={styles.price}>
              ${product.price}
            </Text>

            <div className={styles.button}>
              <Button disabled={!product.isInStock}>
                {product.isInStock ? 'Buy Now' : 'Not Available'}
              </Button>
              <Button disabled={!product.isInStock} className={styles.buttonAdd}>
                {product.isInStock ? 'Add To Cart' : 'Not Available'}
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.relatedItems}>
          <div className={styles.relatedItemsTitle}>
            <Text view="title" weight="bold">
              Related Items
            </Text>
          </div>

          <div className={styles.relatedItemsGrid}>
            {store.relatedProducts.map((item) => (
              <Card
                key={item.documentId}
                image={item.image}
                title={item.title}
                subtitle={item.description}
                captionSlot={item.category}
                contentSlot={`$${item.price}`}
                onClick={() => navigate(`/product-card/${item.documentId}`)}
                actionSlot={
                  <Button disabled={!item.isInStock}>
                    {item.isInStock ? 'Add To Cart' : 'Not Available'}
                  </Button>
                }
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default observer(ProductDetailsPage);
