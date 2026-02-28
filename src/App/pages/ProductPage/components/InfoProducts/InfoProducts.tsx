import React from 'react';
import { Text } from 'components/index.ts';
import styles from './InfoProducts.module.scss';
import { type InfoProductsProps, INFO_TEXTS, DESCRIPTION_MAX_LINES } from './configs.ts';

const InfoProducts: React.FC<InfoProductsProps> = ({ className }) => {
  return (
    <div className={`${styles.infoProduct} ${className || ''}`}>
      <Text className={styles.title} tag={'h1'} weight={'bold'}>
        {INFO_TEXTS.title}
      </Text>
      <Text tag={'p'} view={'p-20'} color={'secondary'} maxLines={DESCRIPTION_MAX_LINES}>
        {INFO_TEXTS.description}
      </Text>
    </div>
  );
};

export default InfoProducts;
