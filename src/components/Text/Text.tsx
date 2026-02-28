import * as React from 'react';
import cn from 'classnames';
import styles from './Text.module.scss';

import { type TextProps, getMaxLinesStyle } from './configs';

const Text: React.FC<TextProps> = ({
  className,
  maxLines,
  children,
  view,
  tag: Component = 'p',
  weight,
  color,
}) => {
  const classes = cn(
    styles.text,
    view && styles[`view_${view}`],
    weight && styles[`weight_${weight}`],
    color && styles[`color_${color}`],
    className
  );

  const style = getMaxLinesStyle(maxLines);

  return (
    <Component className={classes} style={style}>
      {children}
    </Component>
  );
};

export default Text;
