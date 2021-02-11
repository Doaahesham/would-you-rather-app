export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ANSWER = 'USER_ANSWER'
export const ADD_USER_Question = 'ADD_USER_Question'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function userAnswer (authedUser, qid, answer) {
    return {
        type: USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addUserQuestion (authedUser, id) {
    return {
        type: ADD_USER_Question,
        authedUser,
        id,
    }
}