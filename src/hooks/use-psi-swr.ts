import useSWR, { ConfigInterface } from 'swr';
import { getInsights } from '@/api';
import { PSIProps } from '@/components/psi';

interface usePsiSWRProps extends PSIProps {
  onSuccess: ConfigInterface['onSuccess'];
}

const usePsiSWR = ({
  url,
  categories,
  version,
  onSuccess,
  shouldFetch,
}: usePsiSWRProps): boolean => {
  const { isValidating } = useSWR(shouldFetch ? getInsights({ url, categories, version }) : null, {
    onSuccess,
  });

  return isValidating;
};

export default usePsiSWR;
