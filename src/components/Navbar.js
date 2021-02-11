import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'

class TitleBar extends Component {
    render () {
        return (
            <div className='title-bar'>
                 <nav>
            <ul className='nav'>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/leaderboard' exact activeClassName='active'>
                        Leaderboard
                    </NavLink>
                </li>
                <li className='nav-li'>
                    <NavLink className='nav-li' to='/add' exact activeClassName='active'>
                        Add Poll
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