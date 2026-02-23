import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { strapiService, type FormattedProduct } from 'api/strapi.ts';

import Card from 'components/Card';
import Button from 'components/Button';
import InfoProducts from 'components/InfoProducts';
import Search from 'components/Search';
import Pagination from 'components/Pagination/Pagination.tsx';

import styles from './ProductPage.module.scss';

const useItemsCount = () => {
  const [count, setCount] = useState(window.innerWidth < 768 ? 8 : 9);

  useEffect(() => {
    const handleResize = () => setCount(window.innerWidth < 768 ? 8 : 9);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return count;
};

const ProductPage = () => {
  const navigate = useNavigate();
  const itemsToShow = useItemsCount();
  const [products, setProducts] = useState<FormattedProduct[]>([]);

  useEffect(() => {
    strapiService
      .getProducts()
      .then(setProducts)
      .catch((error) => console.error('Ошибка при загрузке товаров:', error));
  }, []);

  const visibleProducts = useMemo(() => products.slice(0, itemsToShow), [products, itemsToShow]);

  return (
    <div className={styles.productPage}>
      <InfoProducts className={styles.infoProduct} />

      <div className={styles.searchProduct}>
        <Search className={styles.search} />

        <div className={styles.productGrid}>
          {visibleProducts.map((product) => (
            <Card
              key={product.documentId}
              image={product.image}
              title={product.title}
              subtitle={product.description}
              captionSlot={product.category}
              contentSlot={`$${product.price}`}
              onClick={() => navigate(`/product-card/${product.documentId}`)}
              actionSlot={
                <Button disabled={!product.isInStock}>
                  {product.isInStock ? 'Add To Cart' : 'Not Available'}
                </Button>
              }
            />
          ))}
        </div>

        <Pagination className={styles.pagination} />
      </div>
    </div>
  );
};

export default ProductPage;
