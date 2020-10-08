import { FC } from 'react';
import { Tag } from 'antd';
import { TagProps } from 'antd/lib/tag';

const colorOptions: TagProps['color'][] = [
  'red',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

interface ColorTagProps extends TagProps {
  colorNumberKey?: number;
}

const ColorTag: FC<ColorTagProps> = (props) => {
  const { colorNumberKey, children, ...otherProps } = props;
  return (
    <Tag
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
      color={
        colorNumberKey !== undefined
          ? colorOptions[colorNumberKey % colorOptions.length]
          : 'default'
      }
    >
      {children}
    </Tag>
  );
};

export default ColorTag;
