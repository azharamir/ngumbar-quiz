import React, { Component } from 'react';
import Quiz from './Quiz';
import sampleQuestions from '../api/quizQuestions';
import { getAnswer, getLocalStorage, setAnswer, getSameAnswer } from '../services/local-storage';
import _ from 'lodash';

class Topic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: 1,
      question: '',
      answer: '',
      counter: 0,
      answerOptions: [],
      questionSelected: [],
      storage: getLocalStorage(),
      result: ''
    };

    this._handleAnswerSelected = this._handleAnswerSelected.bind(this);
    this._handlePageSelected = this._handlePageSelected.bind(this);
  }

  componentDidMount() {
    const { storage, questionId } = this.state;
    getAnswer(storage, questionId).then((result) => {
      if (!_.isEmpty(result)) {
        this.setState({
          answer: result.answer
        })
      }
      return getAnswer(sampleQuestions, questionId);
    }).then((answerOption) => {
      if (!_.isEmpty(answerOption)) {
        this.setState({
          question: answerOption.question,
          answerOptions: answerOption.answers
        })
      }
    });
  }

  _handleAnswerSelected(event) {
    const questionId = this.state.questionId + 1;
    setAnswer(event.currentTarget, this);
    this.setState({
      questionId: questionId > sampleQuestions.length ? 1 : questionId
    });
    setTimeout(() => this._setNextQuestion(), 300);
  }

  _handlePageSelected(page) {
    if(Number(page) >= 1) {
      this.setState({ questionId: page });
      if (page <= sampleQuestions.length) {
        setTimeout(() => this._nextPageQuestion(), 300);
      } 
    }
  }

  _nextPageQuestion() {
    const { storage, questionId } = this.state;
    getAnswer(storage, questionId).then((result) => {
      if (result !== undefined) {
        this.setState({
          answer: result.answer
        });
      } else {
        this.setState({
          answer: ""
        });
      }
      return getSameAnswer(sampleQuestions, questionId);
    }).then((result) => {
      this.setState({
        question: result[0].question,
        answerOptions: result[0].answers
      });
    });

    this.setState({
      counter: questionId
    });
  }

  _setNextQuestion() {
    getSameAnswer(sampleQuestions, this.state.questionId).then((resultFilter) => {
      this.setState({
        question: resultFilter[0].question,
        answerOptions: resultFilter[0].answers
      });
    });
    this.setState({
      counter: this.state.questionId
    });
  }

  render() {
    return (
        <Quiz
          answer={this.state.answer}
          counter={this.state.counter}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={sampleQuestions.length}
          onAnswerSelected={this._handleAnswerSelected}
          onPageSelected={this._handlePageSelected}
        />
    );
  }
}

export default Topic;