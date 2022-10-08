import React from 'react';
import { Col, Layout, Row } from 'antd';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import style from './BaseLayout.style';

interface BaseLayoutProps {
  children: any;
  className?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  className,
}: BaseLayoutProps) => (
  <Layout className={className}>
    <Header />
    <Layout.Content>
      <Row justify="center">
        <Col span={12}>{children}</Col>
      </Row>
    </Layout.Content>
    <Footer />
  </Layout>
);

export default styled(BaseLayout)`
  ${style}
`;
