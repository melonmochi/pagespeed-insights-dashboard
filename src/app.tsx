import { FC, StrictMode } from 'react';
import { Layout } from 'antd';
import { Body, Footer, Header } from '@/layouts';
import './app.less';

const App: FC = () => (
  <StrictMode>
    <Layout className="layout">
      <Header />
      <Body />
      <Footer />
    </Layout>
  </StrictMode>
);

export default App;
