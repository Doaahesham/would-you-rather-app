import React, { Component } from "react";

class Rating extends Component {
  state = {};
  render() {
    const { rank,photo,name, num_ans, num_q } = this.props;

    return (
      <div >
        <div className="grad1">
          <img className="img" src={photo} alt="Avatar" />
          <p className="name">{name}</p>
        </div>
        <div className="question">
            <div className="rank">RANK <div >{rank}</div></div>
          <div>
            <p className="res">{`Asked ${num_q} questions`}</p>
            <p className="res">{`Answerd ${num_ans} questions`}</p>
            <p className="res">Total Score : {num_ans + num_q}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Rating;























