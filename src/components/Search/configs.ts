export type Option = {
  key: string;
  value: string;
};

export type SearchProps = {
  className?: string;
  options: Option[];
  selectedOptions: Option[];
  onFilterChange: (options: Option[]) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
};

export const TEXTS = {
  placeholder: 'Search product',
  button: 'Find now',
  totalLabel: 'Total products',
  filterDefault: 'Filter',
};

export const getDropdownTitle = (selected: Option[]): string => {
  if (selected.length === 0) return TEXTS.filterDefault;
  return selected.map((option) => option.value).join(', ');
};
