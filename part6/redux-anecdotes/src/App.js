import React from 'react'
import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (!filter) {
            return anecdotes
        }

        return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    })
    const notification = useSelector(state => state.notification)

    return (
        <div>
            <Notification notification={notification} />  
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList anecdotes={anecdotes} />
            <AnecdoteForm />
        </div>
    )
}

export default App