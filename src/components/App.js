import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialUsers } from "../actions/shared";
import Login from "./Login";
import Home from "./Home";
import QuestionResults from "./QuestionResults";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NotFoundPage from "./NotFoundPage";
import { handleInitialQuestions } from '../actions/shared'

class App extends Component {
  state = {
    fetched: false,
  };

  componentDidMount() {
    const authedUser = this.props.authedUser ? this.props.authedUser : null;
    this.props.dispatch(handleInitialUsers(authedUser)).then(() => {
      this.setState({ fetched: true });
    });
    this.props.dispatch(handleInitialQuestions());
  }

  render() {
    if (this.state.fetched === false) {
      return <p>Loading</p>;
    }
    return (
      <Router>
        {this.props.authedUser === null ? (
          <Route path="*" exact component={Login} />
        ) : (
          <Fragment>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/questions/:question_id" component={QuestionResults} />
                <Route path="/Leaderboard" exact component={Leaderboard} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </Fragment>
        )}
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);