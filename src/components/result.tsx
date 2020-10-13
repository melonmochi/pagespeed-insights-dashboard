// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-param-reassign */
import { FC } from 'react';
import { Table, Typography } from 'antd';
import './result.less';

const {
  Summary: { Row, Cell },
} = Table;
const { Text } = Typography;

const columns = [
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'FCP',
    dataIndex: 'first-contentful-paint',
    key: 'first-contentful-paint',
  },
  {
    title: 'SI',
    dataIndex: 'speed-index',
    key: 'speed-index',
  },
  {
    title: 'LCP',
    dataIndex: 'largest-contentful-paint',
    key: 'largest-contentful-paint',
  },
  {
    title: 'TTI',
    dataIndex: 'interactive',
    key: 'interactive',
  },
  {
    title: 'TBT',
    dataIndex: 'total-blocking-time',
    key: 'total-blocking-time',
  },
  {
    title: 'CLS',
    dataIndex: 'cumulative-layout-shift',
    key: 'cumulative-layout-shift',
  },
  {
    title: 'At',
    dataIndex: 'fetch-time',
    key: 'fetch-time',
  },
];

export interface PSIResult {
  key: string;
  lighthouseResult: {
    audits: {
      [key: string]: {
        displayValue: string;
        numericValue: number;
        id: string;
        score: number;
      };
    };
    categories: {
      performance: {
        score: number;
      };
    };
    fetchTime: string;
  };
}

interface ResultData {
  version: string;
  key: string;
  score: number;
  'first-contentful-paint': number;
  'speed-index': number;
  'largest-contentful-paint': number;
  interactive: number;
  'total-blocking-time': number;
  'cumulative-layout-shift': number;
  'fetch-time': string;
}

interface ResultProps {
  version: string;
  results: PSIResult[];
}

const Result: FC<ResultProps> = (props) => {
  const { results, version } = props;

  const dataSource = results.map((result: PSIResult, index: number) => ({
    version: `${version}(${index + 1})`,
    key: result.key + Math.random().toString(),
    score: Math.round(result?.lighthouseResult?.categories?.performance?.score * 10000) / 100,
    'first-contentful-paint':
      Math.round(result?.lighthouseResult.audits['first-contentful-paint'].numericValue) / 1000,
    'speed-index': Math.round(result?.lighthouseResult.audits['speed-index'].numericValue) / 1000,
    'largest-contentful-paint':
      Math.round(result?.lighthouseResult.audits['largest-contentful-paint'].numericValue) / 1000,
    interactive: Math.round(result?.lighthouseResult.audits.interactive.numericValue) / 1000,
    'total-blocking-time':
      Math.round(result?.lighthouseResult.audits['total-blocking-time'].numericValue) / 1000,
    'cumulative-layout-shift':
      Math.round(result?.lighthouseResult.audits['cumulative-layout-shift'].numericValue * 1000) /
      1000,
    'fetch-time': new Intl.DateTimeFormat('es', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(new Date(result?.lighthouseResult.fetchTime)),
  }));

  const resultSummary = (tableResults: ResultData[]) => {
    const valuesObj = tableResults.reduce<ResultData>(
      (obj, tableResult, index) => {
        (Object.keys(tableResult) as Array<keyof ResultData>).forEach((key) => {
          switch (key) {
            case 'version':
              obj[key] = tableResult[key];
              break;
            case 'key':
              obj[key] = tableResult[key];
              break;
            case 'fetch-time':
              obj[key] = tableResult[key];
              break;
            default:
              obj[key] = index
                ? Math.round(((obj[key] * index + tableResult[key]) / (index + 1)) * 1000) / 1000
                : tableResult[key];
              break;
          }
        });
        return obj;
      },
      {
        version: '',
        key: '',
        score: 0,
        'first-contentful-paint': 0,
        'speed-index': 0,
        'largest-contentful-paint': 0,
        interactive: 0,
        'total-blocking-time': 0,
        'cumulative-layout-shift': 0,
        'fetch-time': '',
      },
    );

    return (
      <>
        <Row style={{ backgroundColor: '#FCFAF2' }}>
          <Cell index={0}>Average</Cell>
          <Cell index={1}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={valuesObj.score < 50 ? 'danger' : valuesObj.score < 90 ? 'warning' : 'success'}
            >
              {valuesObj.score}
            </Text>
          </Cell>
          <Cell index={2}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={
                valuesObj['first-contentful-paint'] > 4
                  ? 'danger'
                  : valuesObj['first-contentful-paint'] > 2
                  ? 'warning'
                  : 'success'
              }
            >
              {valuesObj['first-contentful-paint']}
            </Text>
          </Cell>
          <Cell index={3}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={
                valuesObj['speed-index'] > 5.8
                  ? 'danger'
                  : valuesObj['speed-index'] > 4.3
                  ? 'warning'
                  : 'success'
              }
            >
              {valuesObj['speed-index']}
            </Text>
          </Cell>
          <Cell index={4}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={
                valuesObj['largest-contentful-paint'] > 4
                  ? 'danger'
                  : valuesObj['largest-contentful-paint'] > 2.5
                  ? 'warning'
                  : 'success'
              }
            >
              {valuesObj['largest-contentful-paint']}
            </Text>
          </Cell>
          <Cell index={5}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={
                valuesObj.interactive > 7.3
                  ? 'danger'
                  : valuesObj.interactive > 3.8
                  ? 'warning'
                  : 'success'
              }
            >
              {valuesObj.interactive}
            </Text>
          </Cell>
          <Cell index={6}>
            <Text
              // eslint-disable-next-line no-nested-ternary
              type={
                valuesObj['total-blocking-time'] > 0.6
                  ? 'danger'
                  : valuesObj['total-blocking-time'] > 0.3
                  ? 'warning'
                  : 'success'
              }
            >
              {valuesObj['total-blocking-time']}
            </Text>
          </Cell>
          <Cell index={7}>
            <Text>{valuesObj['cumulative-layout-shift']}</Text>
          </Cell>
          <Cell index={8} />
        </Row>
      </>
    );
  };

  return (
    <Table
      className="result-table"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: 240 }}
      summary={resultSummary}
    />
  );
};

export default Result;
