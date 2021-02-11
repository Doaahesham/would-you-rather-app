export const AUTH = 'AUTH'

export function auth (id) {
    return {
        type: AUTH,
        id
    }
}