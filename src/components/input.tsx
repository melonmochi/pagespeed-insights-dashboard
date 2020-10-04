/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react';
import { Input as AntInput } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { SearchProps } from 'antd/lib/input';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import useSWR from 'swr';
import { getInsights } from '@/api';
import CategoriesGroup from './categories-group';
import './input.less';
import Result from './result';

const { Search } = AntInput;

const defaultCategories = ['performance'] as CheckboxValueType[];

const Input: FC = () => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [categories, setCategories] = useState<CheckboxValueType[]>(defaultCategories);
  const [results, setResults] = useState<any[]>([]);

  const onSuccess = (data: any, key: string) => {
    if (data.id) setResults([...results, { ...data, key }]);
  };
  const { isValidating } = useSWR(shouldFetch ? getInsights({ url, categories, apiKey }) : null, {
    onSuccess,
  });

  const categoriesOnChange: CheckboxGroupProps['onChange'] = (checkedValues) => {
    setCategories(checkedValues);
  };

  const apiKeyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const onSearch: SearchProps['onSearch'] = (value) => {
    setUrl(value);
  };

  useEffect(() => {
    if (url) {
      setShouldFetch(true);
    }
  }, [url]);

  return (
    <>
      <Search
        className="input"
        enterButton="Analyze"
        size="large"
        onSearch={onSearch}
        placeholder="Enter a webpage URL"
        loading={isValidating}
      />
      <AntInput className="input" onChange={apiKeyOnChange} placeholder="Enter an apiKey" />
      <CategoriesGroup defaultValue={defaultCategories} onChange={categoriesOnChange} />
      <Result results={results} />
    </>
  );
};

export default Input;
