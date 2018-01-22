import React, { Component } from 'react';
import PropTypes from 'prop-types';
import quizQuestions from '../api/quizQuestions';


class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: quizQuestions.length,
      currentPage: parseInt(props.questionId, 10) || 1
    };
  }

  componentWillReceiveProps(){
    this.setState({ currentPage: parseInt(this.props.questionId, 10) })
  }

  _nextPage = () => {
    if (this.state.currentPage < this.state.totalPage) {
      let currentPage = this.state.currentPage + 1;
      this.setState({
        currentPage: currentPage
      });
      this.props.onPageSelected(currentPage);
    }
  }

  _previousPage = () => {
    if (this.state.currentPage > 1) {
      let currentPage = this.state.currentPage - 1;
      this.setState({
        currentPage: currentPage
      });
      this.props.onPageSelected(currentPage);
    }
  }

  render() {
    return (
      <div>
        <a onClick={this._previousPage} className={this.state.currentPage === 1 ? "previous" : "continue"}>&laquo; Previous</a>
        <a onClick={this._nextPage} className={this.state.currentPage === this.state.totalPage ? "previous" : "continue"}>Next &raquo;</a>
      </div>
    );
  }
}

Pagination.propTypes = {
  questionId: PropTypes.any.isRequired,
  onPageSelected: PropTypes.func.isRequired
};

export default Pagination;