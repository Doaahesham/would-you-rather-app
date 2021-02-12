import { receiveUsers, userAnswer, addUserQuestion } from '../actions/users'
import { receiveQuestions, questionAnswer, addQuestion } from '../actions/questions'
import { auth } from '../actions/auth'
import { showLoading, hideLoading } from 'react-redux-loading'
import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
  } from "../dataApi/_DATA";


//fn in home
export function handleInitialQuestions () {
    return (dispatch) => {
        dispatch(showLoading())
        return _getQuestions()
            .then((questions) => {
                console.log(questions);
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}

export function handleInitialUsers (AUTHED_ID) {
    return (dispatch) => {
        dispatch(showLoading())
        return _getUsers()
            .then((users) => {
                // console.log(users);
                dispatch(receiveUsers(users))
                dispatch(auth(AUTHED_ID))
                dispatch(hideLoading())
        })
    }
  }

export function handleSaveQuestionAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(() => {
                dispatch(questionAnswer(authedUser, qid, answer))
                dispatch(userAnswer(authedUser, qid, answer))
                dispatch(hideLoading())
            })  
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        const author = authedUser
        dispatch(showLoading())
        return _saveQuestion({optionOneText, optionTwoText, author})
            .then((poll) => {
                dispatch(addQuestion(poll))
                dispatch(addUserQuestion(authedUser, poll.id))
                dispatch(hideLoading())
            })
    }
}