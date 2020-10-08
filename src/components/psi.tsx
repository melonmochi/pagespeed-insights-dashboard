import { FC, useState } from 'react';
import { usePsiSWR } from '@/hooks';
import { Result } from '@/components';
import { GetInsightsProperties } from '@/typings';
import { ConfigInterface } from 'swr';

export interface PSIProps extends GetInsightsProperties {
  shouldFetch: boolean;
}

const PSI: FC<PSIProps> = (props) => {
  const { version } = props;
  const [results, setResults] = useState<unknown[]>([]);

  const onSuccess: ConfigInterface['onSuccess'] = (data, key) => {
    setResults([...results, { ...data, key }]);
  };

  const isValidating = usePsiSWR({
    ...props,
    onSuccess,
  });

  return <Result results={results} isValidating={isValidating} version={version} />;
};

export default PSI;
