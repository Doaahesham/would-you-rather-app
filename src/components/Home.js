import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Navbar from './Navbar'
import { handleInitialQuestions } from '../actions/shared'

class Home extends Component {
    state = {
        selectedTab: 'unanswered'
    }

    componentDidMount () {
        this.props.dispatch(handleInitialQuestions())
    }

    render () {
        const { answeredPolls, unansweredPolls,loadingBar } = this.props
            return (
            <Fragment>
                <Navbar />
                <ul className='toggler'>
                    <li 
                        className={ this.state.selectedTab === 'unanswered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedTab: 'unanswered'})}}>
                        Unanswered
                    </li>
                    <li 
                        className={ this.state.selectedTab === 'answered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedTab: 'answered'})}}>
                        Answered
                    </li>
                </ul>
                {
                    !loadingBar.default && Object.keys(unansweredPolls).length === 0 && this.state.selectedTab === 'unanswered'
                    ? <p className='no-results'>no results</p>
                    : null
                }
                {
                    !loadingBar.default && Object.keys(answeredPolls).length === 0 && this.state.selectedTab === 'answered'
                    ? <p className='no-results'>no results</p>
                    : null
                }
                { 
                    loadingBar.default
                    ? <p className='loading'>Loading ...</p>
                    : this.state.selectedTab === 'unanswered' && Object.keys(unansweredPolls).length !== 0
                        ? <div className='question-form margin'>
                            {unansweredPolls.map((id) => (
                            <Question key={id} id={id}/> ))}
                        </div>     
                        : this.state.selectedTab === 'answered' && Object.keys(answeredPolls).length !== 0
                        ? <div className='question-form margin'>
                            {answeredPolls.map((id) => (
                            <Question key={id} id={id}/> ))}
                        </div>     
                        : null
                 }             
            </Fragment>
            )
    }
}

function mapStateToProps ({ polls, authedUser, users, loadingBar }) {
    const user = users[authedUser]

    const answeredPolls = Object.keys(polls).length !== 0
        ? Object.keys(user.answers)
            .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
        : []

    const unansweredPolls = Object.keys(polls).length !== 0
        ? Object.keys(polls)
            .filter(pollID => !answeredPolls.includes(pollID))
            .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
        : []

    return {
        answeredPolls,
        unansweredPolls,
        loadingBar,
    }
}

export default connect(mapStateToProps)(Home)