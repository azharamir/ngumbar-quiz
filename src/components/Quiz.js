import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import Pagination from '../components/Pagination';
import PropTypes from 'prop-types';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
  }

  renderAnswerOptions = (key) => {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={this.props.answer}
        questionId={this.props.questionId}
        onAnswerSelected={this.props.onAnswerSelected}
        onClickSelected={this.props.onClickSelected}
      />
    );
  }

  render() {
    return(
      <ReactCSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}
      >
        <div key={this.props.questionId}>
          <QuestionCount
            counter={this.props.questionId}
            total={this.props.questionTotal}
          />
          <Question content={this.props.question} />
          <ul className="answerOptions">
            {this.props.answerOptions.map(this.renderAnswerOptions)}
          </ul>
        </div>
        <Pagination questionId={this.props.questionId} onPageSelected={this.props.onPageSelected}/>
      </ReactCSSTransitionGroup>
    );
  }
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  counter: PropTypes.number,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.any.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  onPageSelected: PropTypes.func.isRequired,
  onClickSelected: PropTypes.func.isRequired
};

export default Quiz;