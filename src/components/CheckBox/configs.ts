import React from 'react';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

export const CHECK_ICON_CONFIG = {
  width: 40,
  height: 40,
  color: 'accent' as const,
};

export const getCheckBoxClasses = (
  styles: Record<string, string>,
  { checked, disabled, className }: { checked?: boolean; disabled?: boolean; className?: string }
) => {
  const wrapper = [
    styles['checkboxWrapper'],
    disabled ? styles['checkboxWrapperDisabled'] : '',
    className || '',
  ]
    .join(' ')
    .trim();

  const custom = [styles['checkboxCustom'], checked ? styles['checkboxCustomChecked'] : '']
    .join(' ')
    .trim();

  return { wrapper, custom };
};
