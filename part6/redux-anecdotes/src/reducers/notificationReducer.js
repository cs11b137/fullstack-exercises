const reducer = (state = null, action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':
            return action.data.message
        
        case 'ADD_ANECDOTE_NOTIFICATION':
            return action.data.message

        case 'NULL_NOTIFICATION':
            return null
        
        default:
            return state
    }
}

export const notificationOfVote = (content) => {
    return {
        type: 'VOTE_NOTIFICATION',
        data: {
            message: `you voted '${content}' `
        }
    }
}

export const notificationOfCreated = (content) => {
    return {
        type: 'ADD_ANECDOTE_NOTIFICATION',
        data: {
            message: `you created '${content}' `
        }
    }
}

export const notificationOfNull = () => {
    return {
        type: 'NULL_NOTIFICATION'
    }
}

export default reducer