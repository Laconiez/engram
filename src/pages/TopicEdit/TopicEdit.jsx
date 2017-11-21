import React, { PureComponent } from 'react';
import pt from 'prop-types';
import ReactMarkdown from 'react-markdown';

class TopicEdit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  render() {
    const { topicId } = this.props.match.params;
    const { description } = this.state;

    return (
      <div>
        topic edit {topicId}
        <div>
          <h5>Topic name</h5>
          <input />

          <h5>Description</h5>
          <textarea
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
          />
          <ReactMarkdown className="holy llll" source={description} />
        </div>
      </div>
    );
  }
}

TopicEdit.propTypes = {
  match: pt.shape({
    params: pt.object,
  }).isRequired,
};

export default TopicEdit;
