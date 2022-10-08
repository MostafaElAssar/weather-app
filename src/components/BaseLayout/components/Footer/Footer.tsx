import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import style from './Footer.style';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }: FooterProps) => (
  <Layout.Footer className={className}>Weather App ©2022</Layout.Footer>
);

export default styled(Footer)`
  ${style}
`;
