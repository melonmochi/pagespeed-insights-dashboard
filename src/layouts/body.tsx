import { FC } from 'react';
import { Layout } from 'antd';
import { Input } from '@/components';
import './body.less';

const { Content } = Layout;

const Body: FC = () => (
  <Content className="layout-body">
    <Input />
  </Content>
);

export default Body;
