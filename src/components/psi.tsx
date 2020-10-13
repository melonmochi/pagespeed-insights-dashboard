import { FC, useEffect, useState } from 'react';
import { usePsiSWR } from '@/hooks';
import { Result } from '@/components';
import { GetInsightsProperties } from '@/typings';
import { ConfigInterface } from 'swr';
import { PSIResult } from './result';

export interface PSIProps extends GetInsightsProperties {
  shouldFetch: boolean;
  pollingNum: number;
}

const PSI: FC<PSIProps> = (props) => {
  const { version, pollingNum, shouldFetch } = props;
  const [results, setResults] = useState<PSIResult[]>([]);
  const [hasEnough, setHasEnough] = useState<boolean>(false);

  const onSuccess: ConfigInterface['onSuccess'] = (data, key) => {
    if (!data.error) {
      setResults([...results, { ...data, key }]);
    }
  };

  usePsiSWR({
    ...props,
    onSuccess,
    shouldFetch: shouldFetch && !hasEnough,
  });

  useEffect(() => {
    setHasEnough(results.length >= pollingNum);
  }, [pollingNum, results.length]);

  return results.length > 0 ? <Result version={version} results={results} /> : null;
};

export default PSI;
