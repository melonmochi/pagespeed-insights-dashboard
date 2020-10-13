import { FC } from 'react';
import { Radio } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';

const options = [
  { label: 'Desktop', value: 'desktop' },
  { label: 'Mobile', value: 'mobile' },
];

interface StrategyProps {
  defaultValue?: string;
  onChange?: RadioGroupProps['onChange'];
}

const Strategies: FC<StrategyProps> = (props) => {
  const { defaultValue, onChange } = props;

  const renderStrategies = options.map((strategy) => (
    <Radio key={strategy.value} value={strategy.value}>
      {strategy.label}
    </Radio>
  ));
  return (
    <Radio.Group defaultValue={defaultValue} onChange={onChange}>
      {renderStrategies}
    </Radio.Group>
  );
};

export default Strategies;
