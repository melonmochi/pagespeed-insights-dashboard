/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useContext } from 'react';
import { Button, Input as AntInput, Select } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { SearchProps } from 'antd/lib/input';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { GlobalContext } from '@/contexts';
import { VersionsGroup, CategoriesGroup, PSI } from '@/components';
import './input.less';

const { Search } = AntInput;
const { Option } = Select;

const defaultCategories = ['performance'] as CheckboxValueType[];

const Input: FC = () => {
  const {
    state: { versions },
  } = useContext(GlobalContext);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [categories, setCategories] = useState<CheckboxValueType[]>(defaultCategories);

  const onPause = () => {
    setShouldFetch(false);
  };

  const categoriesOnChange: CheckboxGroupProps['onChange'] = (checkedValues) => {
    setCategories(checkedValues);
  };

  const onSearch: SearchProps['onSearch'] = () => {
    setShouldFetch(true);
  };

  const onChange: SearchProps['onChange'] = (e) => {
    setUrl(e.target.value);
  };

  const outputTypesSelector = (
    <Select defaultValue="default" disabled>
      <Option value="default">default</Option>
    </Select>
  );

  return (
    <>
      <Search
        className="input"
        enterButton="Analyze"
        size="large"
        onChange={onChange}
        onSearch={onSearch}
        placeholder="Enter a webpage URL"
        loading={shouldFetch}
        addonAfter={
          <Button
            disabled={!shouldFetch}
            key="pause-button"
            style={{ marginLeft: 10, marginRight: 10 }}
            shape="circle"
            icon={<PauseOutlined />}
            onClick={onPause}
          />
        }
      />
      <VersionsGroup />
      <CategoriesGroup defaultValue={defaultCategories} onChange={categoriesOnChange} />
      <div className="selectors">
        <div className="output-types">output type: {outputTypesSelector}</div>
      </div>
      {versions.map((version) => (
        <PSI
          key={version}
          version={version}
          categories={categories}
          shouldFetch={shouldFetch}
          url={url}
        />
      ))}
    </>
  );
};

export default Input;
