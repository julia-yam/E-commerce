import React from 'react';

import { CheckIcon } from 'components';

import { type CheckBoxProps, CHECK_ICON_CONFIG, getCheckBoxClasses } from './configs';

import styles from './CheckBox.module.scss';

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked, className, disabled, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const classes = getCheckBoxClasses(styles, { checked, disabled, className });

  return (
    <label className={classes.wrapper}>
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles['checkboxInput']}
      />
      <div className={classes.custom}>
        {checked && (
          <CheckIcon
            className={styles['checkboxIcon']}
            width={CHECK_ICON_CONFIG.width}
            height={CHECK_ICON_CONFIG.height}
            color={CHECK_ICON_CONFIG.color}
          />
        )}
      </div>
    </label>
  );
};

export default CheckBox;
