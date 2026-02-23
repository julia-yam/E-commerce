import * as React from 'react';
import Icon, { type IconProps } from 'components/icons/Icon';

const CheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M4 11.6129L9.87755 18L20 7" strokeWidth={2} stroke="currentColor" fill="none" />
  </Icon>
);

export default CheckIcon;
