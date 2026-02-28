import React, { useState, useEffect } from 'react';
import styles from './Search.module.scss';
import { Input, MultiDropdown, Button, Text } from 'components';

import { type SearchProps, TEXTS, getDropdownTitle } from './configs';

const Search: React.FC<SearchProps> = ({
  className,
  options,
  selectedOptions,
  onFilterChange,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  const [localValue, setLocalValue] = useState(searchQuery);

  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    onSearchChange(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={`${styles.search} ${className || ''}`}>
      <div className={styles.searchAndFilter}>
        <div className={styles.searchProduct}>
          <Input
            className={styles.input}
            value={localValue}
            onChange={(e: any) => {
              const val = typeof e === 'string' ? e : e?.target?.value || '';
              setLocalValue(val);
            }}
            onKeyDown={handleKeyDown}
            placeholder={TEXTS.placeholder}
          />
          <Button className={styles.button} onClick={handleSearch}>
            {TEXTS.button}
          </Button>
        </div>
        <div className={styles.filter}>
          <MultiDropdown
            options={options}
            value={selectedOptions}
            onChange={onFilterChange}
            getTitle={getDropdownTitle}
          />
        </div>
      </div>

      <div className={styles.total}>
        <Text className={styles.textTotal} weight={'bold'}>
          {TEXTS.totalLabel}
        </Text>
        <Text className={styles.number} view={'p-20'} color={'accent'} weight={'bold'}>
          {totalCount}
        </Text>
      </div>
    </div>
  );
};

export default Search;
