import { FC } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import './categories.less';

const { Option } = Select;

const options = [
  { label: 'Performance', value: 'performance' },
  { label: 'Progressive Web app', value: 'pwa', disabled: true },
  { label: 'Best Practices', value: 'best-practices', disabled: true },
  { label: 'Accessibility', value: 'accessibility', disabled: true },
  { label: 'SEO', value: 'seo', disabled: true },
];

const Options = options.map((option) => (
  <Option key={option.value} value={option.value} disabled={option.disabled}>
    {option.label}
  </Option>
));

interface CategoriesGroupProps {
  defaultValue?: SelectProps<string[]>['defaultValue'];
  onChange?: SelectProps<string[]>['onChange'];
}

const CategoriesGroup: FC<CategoriesGroupProps> = (props) => {
  const { defaultValue, onChange } = props;
  return (
    <Select
      mode="multiple"
      className="categories-group"
      placeholder="Please select categories"
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {Options}
    </Select>
  );
};

export default CategoriesGroup;
