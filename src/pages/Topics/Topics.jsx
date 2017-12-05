import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getTopics, deleteTopic } from '../../requests/topics';

class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
    };

    this.deleteTopic = this.deleteTopic.bind(this);
  }

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics: topics.data });
    });
  }

  deleteTopic(id) {
    deleteTopic(id)
      .then(() => getTopics())
      .then((topics) => {
        this.setState({ topics: topics.data });
      });
  }

  render() {
    const { topics } = this.state;
    return topics && topics.length ? (
      <div className="topics">
        {topics.map(topic => (
          <div key={topic.id}>
            <Link to={`/topics/${topic.id}`}>{topic.caption}</Link>

            <button
              onClick={() => {
                this.deleteTopic(topic.id);
              }}
            >
              x
            </button>
          </div>
        ))}

        <Link to="/topics/new">new topic</Link>
      </div>
    ) : (
      <div>
        no data
        <br />
        It&apos;s time to make a new one
        <br />
        <Link to="/topics/new">new topic</Link>
      </div>
    );
  }
}

export default Topics;
