import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/auth'

class Login extends Component {
    state = {
        userSelected: ''
    }

    handleLogin = (event) => {
        event.preventDefault()
        const { userSelected } = this.state
        const { auth } = this.props

        if (userSelected) {
            auth(userSelected)
        } else alert('Please Select a user First!')

    }

    onSelected = (userSelected) => this.setState({ userSelected })

    render () {
        const { users } = this.props
        const { userSelected } = this.state

        return (
            <Fragment>
                <div className='login'>
                    <div className='head'>
                        <p className='title'>Welcome to the Would You Rather App!</p>
                    </div>
                    <div className='login-body'>
                        <form onSubmit={this.handleLogin}>
                            <label className='sigin'>Please Sign in: </label>
                            <div className='form'>
                                <img src={userSelected === '' 
                                     ? 'http://www.masscue.org/wp-content/uploads/2017/03/male-no-image.jpg'
                                     : users[userSelected].avatarURL}
                                     alt={users[userSelected]}
                                     className='pic'/> 
                                    {/* {console.log(users)} */}
                                <select className='select-user' onChange={(event) => this.onSelected(event.target.value)}>
                                    <option value=""> Select User</option>
                                    { Object.keys(users).map(user => 
                                        <option className='test' key={user} value={user}>{user}</option>)}
                                </select>                        
                            </div>
                            <button className='signin-button '>SIGN IN</button>
                        </form>
                    </div>
                </div>
            </Fragment>

        )
    }
}

function mapStateToProps ({ users }) {
    // console.log(users);
    return {
        users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (id) => {
            dispatch(auth(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)