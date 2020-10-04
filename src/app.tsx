import { FC, StrictMode } from 'react';
import { Layout } from 'antd';
import { Body, Header } from '@/layouts';
import './app.less';

const App: FC = () => (
  <StrictMode>
    <Layout className="layout">
      <Header />
      <Body />
    </Layout>
  </StrictMode>
);

export default App;
