import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className = '', ...rest }, ref) => {
    return (
      <div
        className={`${styles['input-wrapper']} ${className} ${
          rest.disabled ? styles['input-wrapper--disabled'] : ''
        }`}
      >
        <input
          type="text"
          ref={ref}
          className={styles['input-wrapper__field']}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {afterSlot && <div className={styles['input-wrapper__after']}>{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
