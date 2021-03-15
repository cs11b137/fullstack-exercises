import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteof } from '../reducers/anecdoteReducer'
import { notificationOfVote, notificationOfNull } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    // const dispatch = useDispatch()
    // const anecdotes = useSelector(({ anecdotes, filter }) => {
    //     if (!filter) {
    //         return anecdotes
    //     }
    //     return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    // })

    // const vote = (anecdote) => {
    //     dispatch(voteof(anecdote))
    //     dispatch(notificationOfVote(anecdote.content))
    //     setTimeout(() => {
    //         dispatch(notificationOfNull())
    //     }, 2000)
    // }

    const vote = (anecdote) => {
        props.voteof(anecdote)
        props.notificationOfVote(anecdote.content)
        setTimeout(() => {
            props.notificationOfNull()
        }, 1000)
    }

    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (!state.filter) {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
    }
}

const mapDispatchToProps = {
    voteof,
    notificationOfVote,
    notificationOfNull
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes