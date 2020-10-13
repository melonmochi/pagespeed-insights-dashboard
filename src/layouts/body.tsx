import { FC } from 'react';
import { Layout } from 'antd';
import { Pages } from '@/components';
import './body.less';

const { Content } = Layout;

const Body: FC = () => (
  <Content className="layout-body">
    <Pages />
  </Content>
);

export default Body;
