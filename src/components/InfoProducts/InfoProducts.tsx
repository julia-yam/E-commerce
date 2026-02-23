import React from 'react';
import Text from 'components/Text';
import styles from './InfoProducts.module.scss';

export type InfoProductsProps = {
  className?: string;
};

const InfoProducts: React.FC<InfoProductsProps> = ({ className }) => {
  return (
    <div className={`${styles.infoProduct} ${className || ''}`}>
      <Text className={styles.title} tag={'h1'} weight={'bold'}>
        Products
      </Text>
      <Text tag={'p'} view={'p-20'} color={'secondary'} maxLines={5}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
    </div>
  );
};

export default InfoProducts;
