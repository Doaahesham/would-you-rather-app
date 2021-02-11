import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/auth'
import { withRouter } from 'react-router-dom'

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
                <ul className='nav nav-Logout'>
                    <li onClick={this.handleLogout} className='nav-li'>
                        Logout
                    </li>
                    <li className='user-name nav-li'>
                        <img 
                                    src={avatar}
                                    alt={`Avatar of ${avatar}`}
                                    className='profile-pic scale-down'/>
                    </li>
                    <li className='padding-zero username nav-li'>
                       Hello {authedUser}
                    </li>
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