import anecdoteService from '../services/anecdote'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data

        case 'ADD_ANECDOTE':
            return state.concat(action.data).sort((a, b) => b.votes - a.votes)

        case 'VOTE':
            return state.map(anecdote =>
                anecdote.id === action.data.id ? action.data : anecdote
            ).sort((a, b) => b.votes - a.votes)

        default:
            return state.sort((a, b) => b.votes - a.votes)
    }
}

export const voteof = (anecdote) => {
    return async dispatch => {
        const newObject = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        const ret = await anecdoteService.update(anecdote.id, newObject)

        dispatch({
            type: 'VOTE',
            data: ret
        })
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create({
            content,
            votes: 0
        })

        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initialAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()

        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export default reducer