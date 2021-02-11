import { RECEIVE_USERS, USER_ANSWER, ADD_USER_Question } from '../actions/users'

export default function user(state= {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            // console.log(action.users);
            return {
                ...state,
                ...action.users
            }
        case USER_ANSWER:
        const { authedUser, qid, answer } = action
        return {
            ...state,
            [authedUser]: {
            ...state[authedUser],
            answers: {
                ...state[authedUser].answers,
                [qid]: answer
            }
            }
        }
        case ADD_USER_Question: 
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.id])
                }
            }
        default:
            return state
    }
}