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

const getInsights = ({ url, categories = [], version }: GetInsightsProperties): string => {
  const insightsHost = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  if (isValidUrl(url)) {
    const categoriesQueryParameters = categories.map((cat) => `category=${cat}`).join('&');
    const urlParams = new URL(url || '')?.searchParams;
    const hasParams = Object.keys(urlParams).length > 0;
    const insightsUrls = `${insightsHost}?key=${process.env.PSI_API_KEY}&url=${url}${
      version && version !== 'main' ? `${hasParams ? '&' : '?'}d=${version}` : ''
    }${categoriesQueryParameters ? '&' : ''}${categoriesQueryParameters}`;
    return insightsUrls;
  }
  return '';
};

// eslint-disable-next-line import/prefer-default-export
export { getInsights };
