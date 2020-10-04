import { FC } from 'react';
import { Layout } from 'antd';
import './header.less';

const { Header: AntHeader } = Layout;

const Header: FC = () => (
  <AntHeader className="layout-header">PageSpeed Insights Dashboard</AntHeader>
);

export default Header;
