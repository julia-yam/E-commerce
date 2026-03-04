import React, { useState, useEffect, useRef, useMemo } from 'react';

import { Input, ArrowDownIcon } from 'components';

import { type MultiDropdownProps, type Option, getFilteredOptions } from './configs';

import styles from './MultiDropdown.module.scss';

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFilter('');
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    return getFilteredOptions(options, filter);
  }, [options, filter]);

  const handleOptionClick = (option: Option) => {
    const isSelected = value.some((v) => v.key === option.key);
    if (isSelected) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(false);
      setFilter('');
      event.currentTarget.blur();
    }
  };

  const displayValue = isOpen ? filter : value.length > 0 ? getTitle(value) : '';

  return (
    <div className={`${styles.multiDropdown} ${className || ''}`} ref={rootRef}>
      <Input
        disabled={disabled}
        placeholder={getTitle(value)}
        value={displayValue}
        onChange={setFilter}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />

      {isOpen && !disabled && filteredOptions.length > 0 && (
        <div className={`${styles.multiDropdownOptions} ${styles.viewP16} ${styles.weightNormal}`}>
          {filteredOptions.map((option) => {
            const isSelected = value.some((v) => v.key === option.key);
            const itemClasses = `${styles.multiDropdownItem} ${
              isSelected ? styles.multiDropdownItemSelected : ''
            }`.trim();

            return (
              <div
                key={option.key}
                className={itemClasses}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
