import React, { Component } from 'react';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

import { getQuestion, createQuestion, updateQuestion } from '../../requests/questions';

const Answer = ({ item, onAnswerChange }) => (
  <div>
    <textarea
      value={item.text}
      onChange={(e) => {
        onAnswerChange(item, 'text', e.target.value);
      }}
    />
    <input
      type="checkbox"
      value={item.isCorrect}
      onChange={(e) => {
        onAnswerChange(item, 'isCorrect', e.target.checked);
      }}
    />
  </div>
);

Answer.propTypes = {
  item: pt.shape({}).isRequired,
  onAnswerChange: pt.func.isRequired,
};

class QuestionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        text: '',
        answers: [],
      },
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
  }

  componentDidMount() {
    const { topicId, articleId, questionId } = this.props.match.params;
    if (questionId && !questionId.match(/^(\d+|new)$/)) {
      this.props.history.push('/404');
    } else if (questionId !== 'new') {
      getQuestion(topicId, articleId, questionId).then(question =>
        this.setState({ data: question.data }));
    }
  }

  onChangeAnswer(item, field, value) {
    const answerIndex = this.state.data.answers.findIndex(ans => ans === item);
    if (answerIndex >= 0) {
      const newAnswers = [...this.state.data.answers];
      newAnswers[answerIndex][field] = value;
      this.setState({ data: { ...this.state.data, answers: newAnswers } });
    }
  }

  saveChanges() {
    const { topicId, articleId, questionId } = this.props.match.params;

    const { answers } = this.state.data;

    const correctAnswers = answers.filter(answer => answer.isCorrect);

    if (!correctAnswers.length || correctAnswers.length === answers.length) {
      // eslint-disable-next-line
      console.log('one but not all questions have to be correct');

      return;
    }

    if (questionId === 'new') {
      createQuestion(topicId, articleId, this.state.data).then(() => {
        this.props.history.push(`/topics/${topicId}/articles/${articleId}`);
      });
    } else {
      updateQuestion(topicId, articleId, questionId, this.state.data).then(() => {
        this.props.history.push(`/topics/${topicId}/articles/${articleId}`);
      });
    }
  }

  addAnswer() {
    const { answers } = this.state.data;
    const newAnswers = [...answers];

    newAnswers.push({ id: answers.length + 1, text: '', isCorrect: false });

    this.setState({ data: { ...this.state.data, answers: newAnswers } });
  }

  render() {
    const { topicId, articleId, questionId } = this.props.match.params;
    const { text, answers } = this.state.data;
    return (
      <div>
        test {topicId} {articleId} {questionId}
        <textarea
          value={text}
          onChange={(e) => {
            this.setState({ data: { ...this.state.data, text: e.target.value } });
          }}
        />
        answers <button onClick={this.addAnswer}>+</button>
        {answers.map(answer => (
          <Answer key={answer.id} item={answer} onAnswerChange={this.onChangeAnswer} />
        ))}
        <div>
          <Link to={`/topics/${topicId}`}>Cancel</Link>
          <button onClick={this.saveChanges}>Save</button>
        </div>
      </div>
    );
  }
}

QuestionEdit.propTypes = {
  match: pt.shape({
    params: pt.object,
  }).isRequired,
  history: pt.shape({
    push: pt.func,
  }),
};

QuestionEdit.defaultProps = {
  history: {
    push: () => {},
  },
};

export default QuestionEdit;
