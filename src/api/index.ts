import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface GetInsightsProperties {
  url?: string;
  categories?: CheckboxValueType[];
}

const getInsights = ({ url, categories = [] }: GetInsightsProperties): string => {
  const insightsHost = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const categoriesQueryParameters = categories.map((cat) => `category=${cat}`).join('&');
  const insightsUrl = `${insightsHost}?key=${process.env.PSI_API_KEY}&url=${url}${
    categoriesQueryParameters ? '&' : ''
  }${categoriesQueryParameters}`;
  return insightsUrl;
};

// eslint-disable-next-line import/prefer-default-export
export { getInsights };
