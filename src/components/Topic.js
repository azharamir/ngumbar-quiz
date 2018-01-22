import React, { Component } from 'react';
import Quiz from './Quiz';
import quizQuestions from '../api/quizQuestions';
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
      answerSelected: [],
      result: ''
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleClickSelected = this.handleClickSelected.bind(this);
    this.handlePageSelected = this.handlePageSelected.bind(this);
  }

  componentDidMount() {
    const result = JSON.parse(localStorage.getItem("users") || "[]");
    const selectedAnswer = _.find(result, (attr) => { return parseInt(attr.questionId, 10) === this.state.questionId; });
    const resultQuizQuestions = quizQuestions.filter((question) => { return parseInt(question.questionId, 10) === this.state.questionId});
    const shuffledAnswerOptions = resultQuizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: resultQuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      answer: (selectedAnswer && selectedAnswer.answer) || this.state.answer
    });
  }

  componentWillReceiveProps(){
    this.setState({ questionId: parseInt(this.props.questionId, 10) })
  }

  setUserAnswer(currentObject) {
    const answer = currentObject.attributes.getNamedItem("answer").value;
    let result = JSON.parse(localStorage.getItem("users") || "[]");
    const selectedAnswer = _.find(result, (attr) => { return parseInt(attr.questionId, 10) === parseInt(answer, 10); });
    if (selectedAnswer) {
      result = result.filter((attr) => {
        return attr.questionId !== selectedAnswer.questionId;
      });
    }
    result.push({questionId: currentObject.attributes.getNamedItem("answer").value, answer: currentObject.value});
    localStorage.setItem("users", JSON.stringify(result));
    this.setState({
        answer: currentObject.value,
        answerSelected: result
    });
  }

  handleAnswerSelected(event) {
    const questionId = this.state.questionId + 1;
    this.setUserAnswer(event.currentTarget);
    if (questionId <= quizQuestions.length) {
        this.setState({ questionId: questionId });
        setTimeout(() => this.setNextQuestion(), 300);
    }
  }

  handleClickSelected(event) {
    const questionId = this.state.questionId + 1;
    if (event.currentTarget.value === this.state.answer) {
      if (questionId <= quizQuestions.length) {
        this.setState({ questionId: questionId });
        setTimeout(() => this.setNextQuestion(), 300);
      } 
    }
  }

  handlePageSelected(page) {
    if(Number(page) >= 1) {
      this.setState({ questionId: page });
      if (page <= quizQuestions.length) {
        setTimeout(() => this.nextPageQuestion(), 300);
      } 
    }
  }

  nextPageQuestion() {
    const result = JSON.parse(localStorage.getItem("users") || "[]");
    const selectedAnswer = _.find(result, (attr) => { return parseInt(attr.questionId, 10) === this.state.questionId; });
    const resultQuizQuestions = quizQuestions.filter( (question) => { return parseInt(question.questionId, 10) === this.state.questionId; });
    this.setState({
        counter: this.state.questionId,
        questionId: this.state.questionId,
        question: resultQuizQuestions[0].question,
        answerOptions: resultQuizQuestions[0].answers,
        answer: (selectedAnswer && selectedAnswer.answer) || this.state.answer
    });
  }

  setNextQuestion() {
    const result = JSON.parse(localStorage.getItem("users") || "[]");
    const selectedAnswer = _.find(result, (attr) => { return parseInt(attr.questionId, 10) === this.state.questionId; });
    const resultQuizQuestions = quizQuestions.filter( (question) => { return parseInt(question.questionId, 10) === this.state.questionId; });
    this.setState({
        counter: this.state.questionId,
        questionId: this.state.questionId,
        question: resultQuizQuestions[0].question,
        answerOptions: resultQuizQuestions[0].answers,
        answer: (selectedAnswer && selectedAnswer.answer) || this.state.answer
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  render() {
    return (
      <div>
        <Quiz
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
          onPageSelected={this.handlePageSelected}
          onClickSelected={this.handleClickSelected}
        />
      </div>
      
    );
  }
}

export default Topic;