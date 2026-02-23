import React from 'react';
import cn from 'classnames';
import Text from 'components/Text';
import styles from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  const classes = cn(
    styles.card,
    {
      [styles['card--clickable']]: !!onClick, // Используем квадратные скобки для классов с дефисом
    },
    className
  );

  return (
    <div
      className={classes} // 3. Применяем подготовленную переменную classes
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className={styles.cardHeader}>
        <img src={image} alt="" className={styles.cardImage} />
      </div>

      <div className="cardBody">
        {' '}
        {/* Можно оставить обычную строку, если класс не описан в CSS, но лучше через styles */}
        <div className={styles.cardBody}>
          <div className={styles.cardBodyMain}>
            {captionSlot && (
              <Text view="p-14" weight="normal" tag="p" color="secondary">
                {captionSlot}
              </Text>
            )}

            <div data-testid="text">
              <Text view="p-20" weight="medium" tag="h3" maxLines={2}>
                {title}
              </Text>
            </div>

            <div data-testid="text">
              <Text view="p-16" weight="normal" tag="p" color="secondary" maxLines={3}>
                {subtitle}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cardFooter}>
        {contentSlot && (
          <Text view="p-18" weight="bold" className={styles.cardContent}>
            {contentSlot}
          </Text>
        )}

        {actionSlot && (
          <div className={styles.cardAction} onClick={(e) => e.stopPropagation()}>
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
