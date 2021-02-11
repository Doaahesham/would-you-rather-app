import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { handleAddQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class AddPoll extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }
    
    handleOptionOne = (e) => {
        this.setState({
            optionOne: e.target.value
        })
    }

    handleOptionTwo = (e) => {
        this.setState({
            optionTwo: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOne, optionTwo} = this.state
        this.props.addQuestion(optionOne, optionTwo)
        this.setState(() => ({
            toHome: true
        }))
    }

    render () {
        const { toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                <Navbar />
                <div className='form margin poll-details-form'>
                    <div className='form-header'>
                        <p className='form-title'>Would You Rather</p>
                    </div>
                {
                    <form onSubmit={this.handleSubmit} id='addQuestion-form' className='form-body'>
                        <div className='input-text-container'>
                            <textarea  
                                className='block input-text' 
                                name="optionOne" 
                                placeholder='Option One'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionOne}
                                />

                            <textarea  
                                className='block input-text' 
                                name="optionTwo"
                                placeholder='Option Two'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionTwo}
                                />
                        </div>

                        <button className='button'>Submit</button>
                    </form>
                }
                </div>
            </Fragment>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addQuestion: (optionOne, optionTwo) => {
            dispatch(handleAddQuestion(optionOne, optionTwo))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddPoll)