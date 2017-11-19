import { Component } from 'react';
import pt from 'prop-types';

class HeadTitle extends Component {
  render() {
    const { title } = this.props;
    return title;
  }
}

HeadTitle.propTypes = {
  title: pt.string.isRequired,
};

export default HeadTitle;
