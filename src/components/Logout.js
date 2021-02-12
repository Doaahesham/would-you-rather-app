import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../actions/auth'


class Logout extends Component {
    handleLogout = () => {
        const { auth, history } = this.props
        auth(null)
        history.push('/')
    }

    render () {
        const { authedUser, avatar } = this.props
        return (
            <Fragment>
                <ul className='nav'>
                    <li className='nav-li'onClick={this.handleLogout} >Logout</li>
                    <li className='nav-li'>
                        <img className='scale' src={avatar} alt={`Avatar of ${avatar}`}/></li>
                    <li className='username nav-li'>Hello {authedUser}</li>
                </ul>
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    const avatar = users[authedUser].avatarURL
    return {
        authedUser,
        avatar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (id) => {
            dispatch(auth(id))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))