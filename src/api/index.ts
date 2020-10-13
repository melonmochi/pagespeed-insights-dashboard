import { GetInsightsProperties } from '@/typings';

const isValidUrl = (url?: string) => {
  if (!url) return false;
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (_) {
    return false;
  }

  return true;
};

const getInsights = ({
  url,
  categories = [],
  strategy,
  version = '',
}: GetInsightsProperties): string => {
  const insightsHost = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  // const key = (process && process.env && process.env.PSI_API_KEY) || apiKey || '';
  if (isValidUrl(url)) {
    const categoriesQueryParameters = categories.map((cat) => `category=${cat}`).join('&');
    const hasParams = url && url.split('?')[1];
    const urlParam = encodeURIComponent(
      `${url}${version && version !== 'main' ? `${hasParams ? '&' : '?'}d=${version}` : ''}`,
    );
    const categoriesParam = categoriesQueryParameters ? `&${categoriesQueryParameters}` : '';
    const insightsUrls = `${insightsHost}?url=${urlParam}${categoriesParam}&strategy=${strategy}`;
    return insightsUrls;
  }
  return '';
};

// eslint-disable-next-line import/prefer-default-export
export { getInsights };
