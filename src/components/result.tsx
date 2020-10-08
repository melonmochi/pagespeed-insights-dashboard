// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Table } from 'antd';

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
    title: 'First Contentful Paint',
    dataIndex: 'first-contentful-paint',
    key: 'first-contentful-paint',
  },
  {
    title: 'Speed Index',
    dataIndex: 'speed-index',
    key: 'speed-index',
  },
  {
    title: 'Largest Contentful paint',
    dataIndex: 'largest-contentful-paint',
    key: 'largest-contentful-paint',
  },
  {
    title: 'Total Interactive Time',
    dataIndex: 'interactive',
    key: 'interactive',
  },
  {
    title: 'Total Blocking Time',
    dataIndex: 'total-blocking-time',
    key: 'total-blocking-time',
  },
  {
    title: 'Cumulative Layout Shift',
    dataIndex: 'cumulative-layout-shift',
    key: 'cumulative-layout-shift',
  },
  {
    title: 'Fetch Time',
    dataIndex: 'fetch-time',
    key: 'fetch-time',
  },
];

interface PSIResult {
  key: any;
  lighthouseResult: {
    audits: {
      [key: string]: {
        displayValue: string;
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

const Result: FC<any> = (props) => {
  const { results, version } = props;

  const dataSource = results.map((result: PSIResult) => ({
    version,
    key: result.key,
    score: result?.lighthouseResult?.categories?.performance?.score * 100,
    'first-contentful-paint':
      result?.lighthouseResult.audits['first-contentful-paint'].displayValue,
    'speed-index': result?.lighthouseResult.audits['speed-index'].displayValue,
    'largest-contentful-paint':
      result?.lighthouseResult.audits['largest-contentful-paint'].displayValue,
    interactive: result?.lighthouseResult.audits.interactive.displayValue,
    'total-blocking-time': result?.lighthouseResult.audits['total-blocking-time'].displayValue,
    'cumulative-layout-shift':
      result?.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
    'fetch-time': result?.lighthouseResult.fetchTime,
  }));

  return <Table dataSource={dataSource} columns={columns} />;
};

export default Result;
