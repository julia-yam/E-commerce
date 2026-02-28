import React from 'react';
import cn from 'classnames';
import { Text } from 'components';
import styles from './Card.module.scss';
import { type CardProps, CARD_TEXT_CONFIG } from './configs';

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
  const classes = cn(styles.card, { [styles['card--clickable']]: !!onClick }, className);

  const imageAlt = typeof title === 'string' ? title : '';

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.cardHeader}>
        <img src={image} alt={imageAlt} className={styles.cardImage} />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardBodyMain}>
          {captionSlot && <Text {...CARD_TEXT_CONFIG.caption}>{captionSlot}</Text>}

          <div data-testid="text">
            <Text {...CARD_TEXT_CONFIG.title}>{title}</Text>
          </div>

          <div data-testid="text">
            <Text {...CARD_TEXT_CONFIG.subtitle}>{subtitle}</Text>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        {contentSlot && (
          <Text {...CARD_TEXT_CONFIG.content} className={styles.cardContent}>
            {contentSlot}
          </Text>
        )}

        {actionSlot && (
          <div className={styles.cardAction} onClick={handleActionClick}>
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
