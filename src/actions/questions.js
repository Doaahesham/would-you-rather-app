export const RECEIVE_Questions = 'RECEIVE_Questions'
export const Question_ANSWER = 'Question_ANSWER'
export const ADD_Question = 'ADD_Question'
export function receiveQuestions (questions) {
    console.log(questions);
    return {
        type: RECEIVE_Questions,
        questions
    }
}

export function questionAnswer (authedUser, qid, answer) {
    return {
        type: Question_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion (poll) {
    return {
        type: ADD_Question,
        poll,
    }
}