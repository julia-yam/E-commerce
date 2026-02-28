import React from 'react';
import styles from './Input.module.scss';
import { type InputProps, getInputWrapperClasses } from './configs';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className = '', ...rest }, ref) => {
    const wrapperClasses = getInputWrapperClasses(styles, className, rest.disabled);

    return (
      <div className={wrapperClasses}>
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
