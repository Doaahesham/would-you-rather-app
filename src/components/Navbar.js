import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

class TitleBar extends Component {
    render () {
        return (
            <div className='Nav-bar'>
                 <nav>
            <ul className='nav'>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/' exact activeClassName='activeted'>
                        Home
                    </NavLink>
                </li>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/leaderboard' exact activeClassName='activeted'>
                        Leaderboard
                    </NavLink>
                </li>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/add' exact activeClassName='activeted'>
                        New Question
                    </NavLink>
                </li>
            </ul>        
        </nav>
                <Logout />
            </div>
        )
    }
}

export default TitleBar