import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answerType: props.answerType,
      answer: props.answer,
      questionId: props.questionId
    }
  }


  componentWillMount(){
    const { answerType, answer, questionId } = this.props;
    this.setState({ answerType, answer, questionId });
  }

  render(){
    return(
      <li className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={this.state.answerType === this.state.answer}
          id={this.state.answerType}
          question_id={this.state.questionId}
          value={this.state.answerType}
          onChange={this.props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={this.props.answerType}>
          {this.props.answerContent}
        </label>
      </li>
    );
  }
  
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;