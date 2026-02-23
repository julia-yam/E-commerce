import React from 'react';
import cn from 'classnames';
import Text from 'components/Text';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './BackButton.module.scss';

export type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  /** Текст кнопки */
  children: React.ReactNode;
};

const BackButton: React.FC<BackButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={cn(styles.backButton, className)}>
      <ArrowRightIcon width={32} height={32} className={styles.back}></ArrowRightIcon>
      <Text className={styles.text} view="p-20" weight="normal" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default BackButton;
