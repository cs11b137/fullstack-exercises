import React from 'react'
import { useDispatch } from 'react-redux'
import { voteof } from '../reducers/anecdoteReducer'
import { notificationOfVote, notificationOfNull } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes }) => {
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteof(id))
        dispatch(notificationOfVote(content))
        setTimeout(() => {
            dispatch(notificationOfNull())
        }, 2000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList