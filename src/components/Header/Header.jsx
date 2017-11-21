import React from 'react';
import pt from 'prop-types';

const Header = ({ children }) => <div>{children}</div>;

Header.propTypes = {
  children: pt.node.isRequired,
};

export default Header;
