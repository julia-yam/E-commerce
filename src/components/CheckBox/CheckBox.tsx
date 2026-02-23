import React from 'react';
import CheckIcon from 'components/icons/CheckIcon';
import styles from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked, className, disabled, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const wrapperClasses = [
    styles['checkboxWrapper'],
    disabled ? styles['checkboxWrapperDisabled'] : '',
    className || '',
  ]
    .join(' ')
    .trim();

  const customClasses = [styles['checkboxCustom'], checked ? styles['checkboxCustomChecked'] : '']
    .join(' ')
    .trim();

  return (
    <label className={wrapperClasses}>
      <input
        {...rest}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={styles['checkboxInput']}
      />
      <div className={customClasses}>
        {checked && (
          <CheckIcon className={styles['checkboxIcon']} width={40} height={40} color="accent" />
        )}
      </div>
    </label>
  );
};

export default CheckBox;
