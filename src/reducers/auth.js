import { AUTH } from '../actions/auth'

export default function authedUser (state = null, action) {
    switch (action.type) {
        case AUTH:
            return action.id
        default:
            return state
    }
}