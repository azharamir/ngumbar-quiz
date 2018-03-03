import Aigle from 'aigle';
import _ from 'lodash';

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function getAnswer(storageResult, questionId) {
  const iterator = (value) => {
    return parseInt(value.questionId, 10) === parseInt(questionId, 10);
  };
  return Aigle.resolve(storageResult).find(iterator);
}

export function filterAnswer(storageResult, selectedAnswer) {
  const iterator = (value) => {
    return value.questionId !== selectedAnswer.questionId;
  };
  return Aigle.resolve(storageResult).filter(iterator)
}

export function setAnswer(currentObject, _this) {
  const questionId = currentObject.attributes.getNamedItem("question_id").value;
  let tmpAnswers = _this.state.storage;
  getAnswer(tmpAnswers, questionId).then((result) => {
    if (!_.isEmpty(result)) {
      return filterAnswer(tmpAnswers, result);
    }
  })
  .then((result) => {
    if (result !== undefined) {
      tmpAnswers = result;
    }
    return getAnswer(_this.state.storage, _this.state.questionId);
  })
  .then((resultAnswer) => {
    if (resultAnswer !== undefined) {
      _this.setState({
        answer: resultAnswer.answer
      });
    } else {
      _this.setState({
        answer: ""
      });
    }
  })
  .finally(() => {
    tmpAnswers.push({questionId: questionId, answer: currentObject.value});
    _this.setState({ storage: tmpAnswers });
    localStorage.setItem("users", JSON.stringify(tmpAnswers));
  })
}


export function getSameAnswer(sampleQuestions, questionId) {
  const iterator = (value) => {
    return value.questionId === questionId;
  };
  return Aigle.resolve(sampleQuestions).filter(iterator)
}