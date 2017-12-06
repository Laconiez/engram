import React, { Component } from 'react';
import pt from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { createTopic, updateTopic, getTopic } from '../../requests/topics';
import { getArticles } from '../../requests/articles';

class TopicEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        caption: '',
        description: '',
      },
      articles: [],
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    const { topicId } = this.props.match.params;
    if (topicId && !topicId.match(/^(\d+|new)$/)) {
      this.props.history.push('/404');
    } else if (topicId !== 'new') {
      getTopic(topicId).then(topic => this.setState({ data: topic.data }));

      getArticles(topicId).then(articles => this.setState({ articles: articles.data }));
    }
  }

  saveChanges() {
    const { topicId } = this.props.match.params;
    if (topicId === 'new') {
      createTopic(this.state.data).then(() => {
        this.props.history.push('/topics');
      });
    } else {
      updateTopic(topicId, this.state.data).then(() => {
        this.props.history.push('/topics');
      });
    }
  }

  render() {
    const { topicId } = this.props.match.params;
    const { description, caption } = this.state.data;
    const { articles } = this.state;

    return (
      <div>
        topic edit {topicId}
        <div>
          <h5>Topic name</h5>
          <input
            value={caption}
            onChange={(e) => {
              this.setState({ data: { ...this.state.data, caption: e.target.value } });
            }}
          />

          <h5>Description</h5>
          <textarea
            value={description}
            onChange={(e) => {
              this.setState({ data: { ...this.state.data, description: e.target.value } });
            }}
          />
          <ReactMarkdown className="holy llll" source={description} />

          <Link to="/topics">Cancel</Link>
          <button onClick={this.saveChanges}>Save</button>
        </div>
        Articles
        <div>
          {articles.map(article => (
            <div key={article.id}>
              <Link to={`/topics/${topicId}/articles/${article.id}`}>{article.caption}</Link>
            </div>
          ))}
        </div>
        <Link to={`/topics/${topicId}/articles/new`}> new </Link>
      </div>
    );
  }
}

TopicEdit.propTypes = {
  match: pt.shape({
    params: pt.object,
  }).isRequired,
  history: pt.shape({
    push: pt.func,
  }),
};

TopicEdit.defaultProps = {
  history: {
    push: () => {},
  },
};

export default TopicEdit;
