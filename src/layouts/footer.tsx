import { FC } from 'react';
import { Layout } from 'antd';
import './footer.less';

const { Footer: AntFooter } = Layout;

const Footer: FC = () => <AntFooter className="layout-footer">Prisa ©2020</AntFooter>;

export default Footer;
