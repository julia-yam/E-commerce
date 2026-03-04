import * as React from 'react';

import { Icon } from 'components';
import { type IconProps } from 'components/icons/Icon/configs';

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
      stroke="currentColor"
      strokeWidth={0}
      fill="currentColor"
    />
  </Icon>
);

export default ArrowDownIcon;
