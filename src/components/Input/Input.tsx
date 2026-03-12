import React, { useCallback } from 'react';

import { type InputProps, getInputWrapperClasses } from './configs';

import styles from './Input.module.scss';

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
      <label className={wrapperClasses}>
        <input
          {...rest}
          type="text"
          ref={ref}
          className={styles.inputWrapperField}
          value={value}
          onChange={handleChange}
        />
        {afterSlot && <div className={styles.inputWrapperAfter}>{afterSlot}</div>}
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
