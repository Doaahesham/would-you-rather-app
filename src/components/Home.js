import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Navbar from './Navbar'
import { handleInitialQuestions } from '../actions/shared'

class Home extends Component {
    state = {
        selectedPage: 'unanswered'
    }

    componentDidMount () {
        this.props.dispatch(handleInitialQuestions())
    }

    render () {
        const { answeredQuestions, unansweredQuestions,loadingBar } = this.props
            return (
            <Fragment>
                <Navbar />
                <div className="note">
                Please Click On The Card To Get Answers
                </div>
                {/* answered and unanswered Tab  */}
                <ul className='pages'>
                    <li className={ this.state.selectedPage === 'unanswered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedPage: 'unanswered'})}}>Unanswered </li>
                   
                    <li className={ this.state.selectedPage === 'answered' ? 'active' : 'li-hover'}
                        onClick={() => {this.setState({ selectedPage: 'answered'})}}>Answered</li></ul>
                {
                    // no results
                    !loadingBar.default && Object.keys(unansweredQuestions).length === 0 && this.state.selectedPage === 'unanswered'
                    ? <p className='no-results'>No Results</p>
                    : null
                }
                {
                    !loadingBar.default && Object.keys(answeredQuestions).length === 0 && this.state.selectedPage === 'answered'
                    ? <p className='no-results'>No Results</p>
                    : null
                }
                { 
                    loadingBar.default
                    ? <p className='loading'>Loading ...</p>
                    : this.state.selectedPage === 'unanswered' && Object.keys(unansweredQuestions).length !== 0
                        ? <div className='question-form margin'>
                            {unansweredQuestions.map((id) => (<Question key={id} id={id}/> ))}</div>     
                        : this.state.selectedPage === 'answered' && Object.keys(answeredQuestions).length !== 0
                        ? <div className='question-form margin'>
                            {answeredQuestions.map((id) => (<Question key={id} id={id}/> ))}</div>     
                        : null
                 }             
            </Fragment>
            )
    }
}

function mapStateToProps ({ questions, authedUser, users, loadingBar }) {
    const user = users[authedUser]
// console.log(questions);
    const answeredQuestions = Object.keys(questions).length !== 0
        ? Object.keys(user.answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        : []

    const unansweredQuestions = Object.keys(questions).length !== 0
        ? Object.keys(questions).filter(pollID => !answeredQuestions.includes(pollID)).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
        : []

    return {loadingBar, answeredQuestions, unansweredQuestions,}
}

export default connect(mapStateToProps)(Home)