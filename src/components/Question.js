import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  render() {
    const { poll } = this.props;

    if (poll === null) {
      return <p>This poll doesn't exist</p>;
    }

    const { optionOne, optionTwo } = poll;
    const { id } = this.props;

    return (
      <Link
        to={`/questions/${id}`}
        className="format margin poll-form"
      >
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
            <p className="op">{optionOne.text}</p>
            <p className="or">OR</p>
            <p className="op">{optionTwo.text}</p>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const poll = questions[id];

  return {
    authedUser,
    poll,
    id,
    users,
  };
}

export default connect(mapStateToProps)(Question);
