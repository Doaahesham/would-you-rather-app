
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { handleSaveQuestionAnswer } from "../actions/shared";

class QuestionResults extends Component {
  state = {
    selectedOption: "",
  };

  selectRadio = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  submitAnswer = (event) => {
    event.preventDefault();

    const { savePollAnswer } = this.props;
    const answer = this.state.selectedOption;
    savePollAnswer(answer);
  };

  render() {
    const { poll, users, authedUser, question_id} = this.props;
    const optionOne = poll.optionOne.text;
    const optionTwo = poll.optionTwo.text;
    const current_user=users[authedUser];
    const isOneAnswered = poll.optionOne.votes.includes(authedUser);
    const isTwoAnswered = poll.optionTwo.votes.includes(authedUser);
    const answered = isOneAnswered || isTwoAnswered;
    const optionOneVotes = poll.optionOne.votes.length;
    const optionTwoVotes = poll.optionTwo.votes.length;
    const ans=current_user.answers[question_id];
    const ans_text=poll[ans]?poll[ans].text:""
    // console.log(ans);
    // console.log(poll);
    // console.log(ans_text);
    const optionOnePercentage = (
      (optionOneVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2);
    const optionTwoPercentage = (
      (optionTwoVotes / (optionOneVotes + optionTwoVotes)) *
      100
    ).toFixed(2);
    return (
      <Fragment>
        <Navbar />
        <div className="form-ans ">
          {answered ? (
            <div>
              <div className="grad1">
                <img
                  className="img"
                  src={this.props.users[poll.author].avatarURL}
                  alt="Avatar"
                />
                <p className="name">{this.props.users[poll.author].name}</p>
              </div>
              <div className="question">
                <p className="would">would you rather</p>
                <div className="detail">
                    <div>{`Your Answer is ${ans_text} `}</div>
                  <p className="op">{`${optionOne} got :  ${optionOneVotes} vote`}</p>
                  <progress value={optionOnePercentage}>
                    {optionOnePercentage}
                  </progress>
                  <br></br>
                  <p className="or">OR</p>
                  <p className="op">{`${optionTwo} got :  ${optionTwoVotes} vote`}</p>
                  <progress value={optionTwoPercentage}>
                    {optionTwoPercentage}
                  </progress>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={this.submitAnswer}>
                <div className="grad1">
                  <img
                    className="img"
                    src={this.props.users[poll.author].avatarURL}
                    alt="Avatar"
                  />
                  <p className="name">{this.props.users[poll.author].name}</p>
                </div>
                <div className="question">
                  <p className="would">would you rather</p>
                  <div className="detail">
                    <input
                      type="radio"
                      name="select_option"
                      value="optionOne"
                      onClick={this.selectRadio}
                    />
                    <span className="op margin-bottom">{optionOne}</span>
                    <div className="margin-bottom"></div>
                    <p className="or">OR</p>
                    <div className="margin-bottom"></div>
                    <input
                      type="radio"
                      name="select_option"
                      value="optionTwo"
                      onClick={this.selectRadio}
                    />
                    <span className="op">{optionTwo}</span>
                  </div>
                  <button type="submit" disabled={this.state.selectedOption===""} className="button">Submit</button>
                </div>

                
              </form>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { question_id } = props.match.params;
  const poll = questions[question_id];
  return {
    poll,
    users,
    questions,
    authedUser,
    question_id,
  };
}

function mapDispatchToProps(dispatch, props) {
  const { question_id } = props.match.params;
  return {
    savePollAnswer: (answer) => {
      dispatch(handleSaveQuestionAnswer(question_id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionResults);
