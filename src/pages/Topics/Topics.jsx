import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getTopics } from '../../requests/topics';

class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
    };
  }

  componentDidMount() {
    getTopics().then((data) => {
      this.setState({ topics: data });
    });
  }

  render() {
    const { topics } = this.state;
    return topics && topics.length ? (
      <div className="topics">
        {topics.map(topic => <div key={topic.id}>{topic.caption}</div>)}

        <Link to="/topics/new">new topic</Link>
      </div>
    ) : (
      <div>no data</div>
    );
  }
}

export default Topics;
