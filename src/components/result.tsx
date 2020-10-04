// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Progress } from 'antd';

const Result: FC<any> = (props) => {
  const { results } = props;
  const simpleResults = results.map(
    (result: {
      key: any;
      lighthouseResult: { categories: { performance: { score: number } } };
    }) => ({
      key: result.key,
      score: result.lighthouseResult.categories.performance.score * 100,
    }),
  );

  const renderScores = simpleResults.map(
    (simpleResult: { key: string | number | null | undefined; score: number | undefined }) => {
      return (
        <Progress
          key={simpleResult.key}
          percent={simpleResult.score}
          format={(percent) => percent}
        />
      );
    },
  );
  return <>{renderScores}</>;
};

export default Result;
