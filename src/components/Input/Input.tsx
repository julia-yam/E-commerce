import React, { useCallback } from 'react';
import styles from './Input.module.scss';
import { type InputProps, getInputWrapperClasses } from './configs';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className = '', ...rest }, ref) => {
    const wrapperClasses = getInputWrapperClasses(styles, className, rest.disabled);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <div className={wrapperClasses}>
        <input
          {...rest}
          type="text"
          ref={ref}
          className={styles['input-wrapper__field']}
          value={value}
          onChange={handleChange}
        />
        {afterSlot && <div className={styles['input-wrapper__after']}>{afterSlot}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
