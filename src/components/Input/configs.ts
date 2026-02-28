import React from 'react';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

export const getInputWrapperClasses = (
  styles: Record<string, string>,
  className: string,
  disabled?: boolean
): string => {
  return `${styles['input-wrapper']} ${className} ${
    disabled ? styles['input-wrapper--disabled'] : ''
  }`.trim();
};
