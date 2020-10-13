import { FC, useState, useContext } from 'react';
import { Button, Input as AntInput, InputNumber, Typography } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
import { CheckboxGroupProps } from 'antd/lib/checkbox';
import { SearchProps } from 'antd/lib/input';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { RadioChangeEvent } from 'antd/lib/radio';
import { InputNumberProps } from 'antd/lib/input-number';
import { PageContext } from '@/contexts';
import { VersionsGroup, Categories, PSI, Strategies } from '@/components';
import './input.less';

const { Search } = AntInput;
const { Text } = Typography;

const defaultCategories = ['performance'];
const defaultStrategy = 'mobile';

const Input: FC = () => {
  const {
    state: { versions },
  } = useContext(PageContext);
  const [url, setUrl] = useState<string>('');
  const [strategy, setStrategy] = useState<string>(defaultStrategy);
  const [categories, setCategories] = useState<CheckboxValueType[]>(defaultCategories);
  const [pollingNum, setPollingNum] = useState<number>(10);
  const [isPaused, setIsPaused] = useState(true);

  const onSearch: SearchProps['onSearch'] = () => {
    setIsPaused(false);
  };

  const onPause = () => {
    setIsPaused(true);
  };

  const categoriesOnChange: CheckboxGroupProps['onChange'] = (checkedValues) => {
    setCategories(checkedValues);
  };

  const strategyOnChange: (e: RadioChangeEvent) => void = (e) => {
    setStrategy(e.target.value);
  };

  const onChange: SearchProps['onChange'] = (e) => {
    setUrl(e.target.value);
  };

  const onChangePolling: InputNumberProps['onChange'] = (value) => {
    setPollingNum(Number(value));
  };

  return (
    <>
      <Search
        className="input"
        disabled={!isPaused}
        enterButton="Analyze"
        size="large"
        onChange={onChange}
        onSearch={onSearch}
        placeholder="Enter a webpage URL"
        loading={!isPaused}
        addonAfter={
          <Button
            disabled={isPaused}
            key="pause-button"
            style={{ marginLeft: 10, marginRight: 10 }}
            shape="circle"
            icon={<PauseOutlined />}
            onClick={onPause}
          />
        }
      />
      <Strategies defaultValue={defaultStrategy} onChange={strategyOnChange} />
      <Text type="secondary">Categories: </Text>
      <Categories defaultValue={defaultCategories} onChange={categoriesOnChange} />
      <Text type="secondary">Versions: </Text>
      <VersionsGroup />
      <Text type="secondary">Nº of polling: </Text>
      <InputNumber
        size="small"
        min={1}
        max={99}
        defaultValue={pollingNum}
        onChange={onChangePolling}
      />
      {versions.map((version) => (
        <PSI
          categories={categories}
          key={version}
          pollingNum={pollingNum}
          shouldFetch={!isPaused}
          strategy={strategy}
          url={url}
          version={version}
        />
      ))}
    </>
  );
};

export default Input;
