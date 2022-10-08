import React from 'react';
import { Image, Layout } from 'antd';
import styled from 'styled-components';
import style from './Header.style';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }: HeaderProps) => (
  <Layout.Header className={className}>
    <Image
      preview={false}
      src={`${process.env.PUBLIC_URL}/assets/images/weather-icon.svg`}
    />
  </Layout.Header>
);

export default styled(Header)`
  ${style}
`;
