import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Card, Text, Button } from 'components/index.ts';
import { useCartActions } from 'hooks/useCartActions';
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

const RelatedItemList: React.FC<RelatedItemListProps> = ({ items }) => {
  const navigate = useNavigate();
  const { handleAddToCart } = useCartActions();

  if (items.length === 0) return null;

  return (
    <section className={styles.relatedItems}>
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
            onClick={() => navigate(`/product-card/${item.documentId}`)}
            actionSlot={
              <Button disabled={!item.isInStock} onClick={(e) => handleAddToCart(e, item)}>
                {item.isInStock ? 'Add To Cart' : 'Not Available'}
              </Button>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default observer(RelatedItemList);
