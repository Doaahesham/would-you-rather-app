import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux"
import { auth } from '../actions/auth'


class NotFoundPage extends Component {

    resetUserToNull=()=> {
        this.props.dispatch(auth(null));
    }
    render() {
        return (
            <div className='center'>
            <h1>Error 404</h1>
            <p>Page Not Found!</p>
            <p className='padding-top'>
                <NavLink className='click-here' to='/'><button onClick={this.resetUserToNull}>click here</button></NavLink> to go back to home page
            </p>
        </div>
        );
    }
}

export default connect()(NotFoundPage);

