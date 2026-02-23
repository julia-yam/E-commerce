import React, { useState } from 'react';
import styles from './Search.module.scss';
import Input from 'components/Input';
import MultiDropdown, { type Option } from 'components/MultiDropdown';
import Button from 'components/Button';
import Text from 'components/Text';

export type SearchProps = {
  className?: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const options: Option[] = [
    { key: 'el', value: 'Electronics' },
    { key: 'fur', value: 'Furniture' },
    { key: 'shs', value: 'Shoes' },
  ];
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getDropdownTitle = (selected: Option[]): string => {
    if (selected.length === 0) return 'Filter';
    return selected.map((option) => option.value).join(', ');
  };
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className={`${styles.search} ${className || ''}`}>
      <div className={styles.searchAndFilter}>
        <div className={styles.searchProduct}>
          <Input
            className={styles.input}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search product"
          />
          <Button className={styles.button}>Find now</Button>
        </div>
        <div className={styles.filter}>
          <MultiDropdown
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            getTitle={getDropdownTitle}
          ></MultiDropdown>
        </div>
      </div>

      <div className={styles.total}>
        <Text className={styles.textTotal} weight={'bold'}>
          Total products
        </Text>

        <Text className={styles.number} view={'p-20'} color={'accent'} weight={'bold'}>
          777
        </Text>
      </div>
    </div>
  );
};

export default Search;
