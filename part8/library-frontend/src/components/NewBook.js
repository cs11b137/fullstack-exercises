import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author
        published
    }
}
`

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [ createBook ] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        },
        update: (store, response) => {
            const dataInStore = store.readQuery({ query: ALL_BOOKS })
            store.writeQuery({
                query: ALL_BOOKS,
                data: {
                    ...dataInStore,
                    allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
                }
            })
        }
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')
        const response = await createBook({ variables: { title, author, published: parseInt(published), genres } })
        console.log(response)

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                <input
                        value={author}
                        onChange={({ target }) => setAuhtor(target.value)}
                    />
                </div>
                <div>
                    published
                <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>
                <div>
                    genres: {genres.join(' ')}
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook