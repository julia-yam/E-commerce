import React from 'react';
import cn from 'classnames';
import { Text, Loader } from 'components';
import styles from './Button.module.scss';
import { type ButtonProps, BUTTON_TEXT_CONFIG, BUTTON_LOADER_SIZE } from './configs';

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const classes = cn(
    styles.button,
    {
      [styles.loading]: loading,
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <button {...props} disabled={loading || disabled} className={classes}>
      {loading && <Loader size={BUTTON_LOADER_SIZE} />}

      <Text {...BUTTON_TEXT_CONFIG}>{children}</Text>
    </button>
  );
};

export default Button;
