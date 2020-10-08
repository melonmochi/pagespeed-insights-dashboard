import { FC, StrictMode } from 'react';
import { Layout } from 'antd';
import { Body, Footer, Header } from '@/layouts';
import './app.less';
import { GlobalContextProvider } from './contexts';

const App: FC = () => (
  <StrictMode>
    <GlobalContextProvider>
      <Layout className="layout">
        <Header />
        <Body />
        <Footer />
      </Layout>
    </GlobalContextProvider>
  </StrictMode>
);

export default App;
