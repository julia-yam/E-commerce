import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Card, Text, ProductAction } from 'components';

import styles from './RelatedItemList.module.scss';

interface RelatedItem {
  documentId: string;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number | string;
  isInStock: boolean;
}

interface RelatedItemListProps {
  items: RelatedItem[];
}

const ROUTES = {
  PRODUCT_CARD: (id: string) => `/product-card/${id}`,
};

export const RelatedItemList: React.FC<RelatedItemListProps> = observer(({ items }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  return (
    <section className={styles.relatedItems}>
      <div className={styles.container}>
        <div className={styles.relatedItemsTitle}>
          <Text view="title" weight="bold">
            Related Items
          </Text>
        </div>

        <div className={styles.relatedItemsGrid}>
          {items.map((item) => (
            <Card
              key={item.documentId}
              image={item.image}
              title={item.title}
              subtitle={item.description}
              captionSlot={item.category}
              contentSlot={`$${item.price}`}
              onClick={() => navigate(ROUTES.PRODUCT_CARD(item.documentId))}
              actionSlot={<ProductAction product={item} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default RelatedItemList;
