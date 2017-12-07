import React, { Component } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

import { createArticle, updateArticle, getArticle } from '../../requests/articles';
import { getQuestions } from '../../requests/questions';

class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        caption: '',
        text: '',
      },
      questions: [],
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    const { topicId, articleId } = this.props.match.params;
    if (articleId && !articleId.match(/^(\d+|new)$/)) {
      this.props.history.push('/404');
    } else if (articleId !== 'new') {
      getArticle(topicId, articleId).then(article => this.setState({ data: article.data }));
      getQuestions(topicId, articleId).then(questions =>
        this.setState({ questions: questions.data }));
    }
  }

  saveChanges() {
    const { topicId, articleId } = this.props.match.params;
    if (articleId === 'new') {
      createArticle(topicId, this.state.data).then(() => {
        this.props.history.push(`/topics/${topicId}`);
      });
    } else {
      updateArticle(topicId, articleId, this.state.data).then(() => {
        this.props.history.push(`/topics/${topicId}`);
      });
    }
  }

  render() {
    const { topicId, articleId } = this.props.match.params;
    const { caption, text } = this.state.data;
    const { questions } = this.state;
    return (
      <div>
        test {topicId} {articleId}
        <input
          value={caption}
          onChange={(e) => {
            this.setState({ data: { ...this.state.data, caption: e.target.value } });
          }}
        />
        <br />
        <textarea
          value={text}
          onChange={(e) => {
            this.setState({ data: { ...this.state.data, text: e.target.value } });
          }}
        />
        <div>
          <Link to={`/topics/${topicId}`}>Cancel</Link>
          <button onClick={this.saveChanges}>Save</button>
        </div>
        <div>Questions</div>
        <div>{questions.map(question => <div key={question.id}>{question.text}</div>)}</div>
        <Link to={`/topics/${topicId}/articles/${articleId}/questions/new`}>new question</Link>
      </div>
    );
  }
}

ArticleEdit.propTypes = {
  match: pt.shape({
    params: pt.object,
  }).isRequired,
  history: pt.shape({
    push: pt.func,
  }),
};

ArticleEdit.defaultProps = {
  history: {
    push: () => {},
  },
};

export default ArticleEdit;
