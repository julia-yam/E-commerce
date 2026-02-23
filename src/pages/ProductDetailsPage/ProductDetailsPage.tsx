import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { strapiService, type FormattedProduct } from 'api/strapi.ts';

import Button from 'components/Button';
import Text from 'components/Text';
import Card from 'components/Card';
import BackButton from 'components/BackButton';

import styles from './ProductDetailsPage.module.scss';

interface ProductCardProps {
  id?: string;
}

const ProductDetailsPage = ({ id: propsId }: ProductCardProps) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = propsId || params.id;

  const [product, setProduct] = useState<FormattedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<FormattedProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [targetProduct, allProducts] = await Promise.all([
          strapiService.getOneProduct(id),
          strapiService.getProducts(),
        ]);

        setProduct(targetProduct);
        setRelatedProducts(allProducts.filter((item) => item.documentId !== id).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchData();
  }, [id]);

  const handleBackClick = () => navigate(-1);

  if (!isInitialized) return null;

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <Text view="title">Product not found</Text>
        <Button onClick={handleBackClick}>Back</Button>
      </div>
    );
  }

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
            {relatedProducts.map((item) => (
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

export default ProductDetailsPage;
