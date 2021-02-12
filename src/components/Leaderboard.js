import React, { Component } from "react";
import { connect } from "react-redux";
import Rating from "./RatingCard";
import Navbar from "./Navbar";

class Leaderboard extends Component {
  render() {
    const { users, data } = this.props;
    return (
      <div>
        <Navbar />
        <div className="res-ul-div">
          {data.map((user, index) => (
            <div className="div-li" key={index}>
              <li className="res-li" key={index}>
                <div className="border">
                  <Rating
                    rank={index + 1}
                    photo={users[user.uid].avatarURL}
                    name={users[user.uid].name}
                    num_ans={user.pollsAnswered}
                    num_q={user.pollsCreated}
                  />
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const data = Object.keys(users)
    .map((uid) => {
      return {
        uid,
        pollsCreated: users[uid].questions.length,
        pollsAnswered: Object.keys(users[uid].answers).length,
      };
    })
    .sort(
      (a, b) =>
        b.pollsCreated + b.pollsAnswered - (a.pollsCreated + a.pollsAnswered)
    );

  return {
    users,
    data,
  };
}

export default connect(mapStateToProps)(Leaderboard);
