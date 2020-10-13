import useSWR, { ConfigInterface } from 'swr';
import { getInsights } from '@/api';
import { PSIProps } from '@/components/psi';

interface usePsiSWRProps extends PSIProps {
  onSuccess: ConfigInterface['onSuccess'];
}

const usePsiSWR = ({
  url,
  strategy,
  categories,
  version,
  onSuccess,
  shouldFetch,
}: usePsiSWRProps): boolean => {
  const { isValidating } = useSWR(
    () => (shouldFetch ? getInsights({ url, strategy, categories, version }) : null),
    {
      onSuccess,
      refreshInterval: 1000,
      refreshWhenHidden: true,
      refreshWhenOffline: true,
    },
  );

  return isValidating;
};

export default usePsiSWR;
