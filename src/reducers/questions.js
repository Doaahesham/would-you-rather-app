import { RECEIVE_Questions, Question_ANSWER, ADD_Question } from '../actions/questions'

export default function questions(state= {}, action) {
    switch(action.type) {
        case RECEIVE_Questions:
            console.log(action.questions);
            return {
                ...state,
                ...action.questions
            }
        case Question_ANSWER:
        const { authedUser, qid, answer } = action
        return {
            ...state,
            [qid]: {
              ...state[qid],
              [answer]: {
                ...state[qid][answer],
                votes: state[qid][answer].votes.concat([authedUser])
              }
            }
          }
        case ADD_Question: 
          return {
            ...state,
            [action.poll.id]: action.poll
          }
        default:
            return state
    }
}