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
    
    handleOptionOne = (event) => {
        this.setState({
            optionOne: event.target.value
        })
    }

    handleOptionTwo = (event) => {
        this.setState({
            optionTwo: event.target.value
        })
    }

    handleSubmited = (event) => {
        event.preventDefault()
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
                <div className="margin new-Question">
                    <div className='header'>
                       <p className='form-title'>Would You Rather</p>
                    </div>
                {<form onSubmit={this.handleSubmited}  className='question-body'>
                        <div>
                            <textarea className='block input' 
                                name="optionOne" 
                                placeholder='Option One'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionOne}/>

                            <textarea className='block input' 
                                name="optionTwo"
                                placeholder='Option Two'
                                required
                                spellCheck="false"
                                onChange={this.handleOptionTwo}/>
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