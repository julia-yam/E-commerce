import React from 'react';
import cn from 'classnames';
import Text from 'components/Text';
import Loader from 'components/Loader';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || false;

  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={cn(
        styles.button,
        {
          [styles.loading]: loading,
          [styles.disabled]: isDisabled,
        },
        className
      )}
    >
      {loading && <Loader size="s" />}

      <Text view="button" weight="normal" tag="span">
        {children}
      </Text>
    </button>
  );
};

export default Button;
