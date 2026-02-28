import * as React from 'react';
import { Icon } from 'components';
import { type IconProps } from 'components/icons/Icon/configs.ts';

const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.07996"
      stroke="currentColor"
      fill="none"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowRightIcon;
