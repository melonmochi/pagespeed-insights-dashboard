import { FC } from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import './categories.less';

const options = [
  { label: 'Performance', value: 'performance' },
  { label: 'Progressive Web app', value: 'pwa' },
  { label: 'Best Practices', value: 'best-practices' },
  { label: 'Accessibility', value: 'accessibility' },
  { label: 'SEO', value: 'seo' },
];

interface CategoriesGroupProps {
  defaultValue?: CheckboxValueType[];
  onChange?: CheckboxGroupProps['onChange'];
}

const CategoriesGroup: FC<CategoriesGroupProps> = (props) => {
  const { defaultValue, onChange } = props;
  return (
    <AntCheckbox.Group
      className="categories-group"
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
    />
  );
};

export default CategoriesGroup;
