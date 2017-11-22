import React from 'react';
// import pt from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import colors from '../../styles/colors';
import Logo from '../Icons/Logo';

const LogoTitle = styled('span')`
  font-family: 'LogoTitle';
  font-size: 42px;
  color: ${colors.independence};
`;

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Header = () => (
  <Container>
    <Link to="/">
      <Logo />
    </Link>

    <LogoTitle>Engram Admin Panel</LogoTitle>
  </Container>
);

Header.propTypes = {
  // children: pt.node.isRequired,
};

export default Header;
