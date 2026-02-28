export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

export const getFilteredOptions = (options: Option[], filter: string): Option[] => {
  return options.filter((option) => option.value.toLowerCase().includes(filter.toLowerCase()));
};
