import * as React from 'react';
import cn from 'classnames';

import { type TextProps, getMaxLinesStyle } from './configs';

import styles from './Text.module.scss';

const Text: React.FC<TextProps> = ({
  className,
  maxLines,
  children,
  view,
  tag: Component = 'p',
  weight,
  color,
}) => {
  const toPascalCase = (str: string) =>
    str
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

  const classes = cn(
    styles.text,
    view && styles[`view${toPascalCase(view)}`],
    weight && styles[`weight${toPascalCase(weight)}`],
    color && styles[`color${toPascalCase(color)}`],
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
