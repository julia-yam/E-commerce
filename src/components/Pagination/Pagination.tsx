import React from 'react';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Text from 'components/Text';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ className }) => {
  return (
    <div className={`${styles.pagination} ${className || ''}`}>
      <ArrowRightIcon className={styles.leftIcon} width={35} height={35}></ArrowRightIcon>
      <div className={styles.number}>
        <Text className={styles.select} view={'p-18'}>
          1
        </Text>
        <Text view={'p-18'}>2</Text>
        <Text view={'p-18'}>3</Text>
        <Text view={'p-18'}>...</Text>
      </div>
      <ArrowRightIcon className={styles.rightIcon} width={35} height={35}></ArrowRightIcon>
    </div>
  );
};

export default Pagination;
