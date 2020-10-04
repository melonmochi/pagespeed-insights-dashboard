import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface GetInsightsProperties {
  url?: string;
  categories?: CheckboxValueType[];
  apiKey?: string;
  strategy?: string;
}

const getInsights = ({
  url,
  categories = [],
  apiKey,
  strategy = 'mobile',
}: GetInsightsProperties): string => {
  const key = (process && process.env && process.env.PSI_API_KEY) || apiKey || '';
  const insightsHost = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const categoriesQueryParameters = categories.map((cat) => `category=${cat}`).join('&');
  const insightsUrl = `${insightsHost}?key=${key}&url=${url}${
    categoriesQueryParameters ? '&' : ''
  }${categoriesQueryParameters}&strategy=${strategy}`;
  return insightsUrl;
};

// eslint-disable-next-line import/prefer-default-export
export { getInsights };
