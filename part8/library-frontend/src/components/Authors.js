import React, { useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String, $born: Int!) {
    editAuthor(
        name: $name
        born: $born
    ) {
        name
        born
    }
}
`

const Authors = (props) => {
    const { loading, error, data } = useQuery(ALL_AUTHORS)
    const [selectedName, setSelectedName] = useState('please select')
    const [born, setBorn] = useState('')
    const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    })

    if (!props.show) {
        return null
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error: `${error}`</div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(selectedName)
        console.log(born)

        const response = await updateAuthor({ variables: { name: selectedName, born: parseInt(born) } })
        console.log(response)

        setSelectedName('')
        setBorn('')
    }

    const handleChange = (event) => {
        setSelectedName(event.currentTarget.value)
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {data.allAuthors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>set author birthyear</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <select value={selectedName} onChange={handleChange}>
                        <option value="please select">please select</option>
                        {data.allAuthors.map(a =>
                            <option key={a.name} value={a.name}>{a.name}</option>
                        )}
                    </select>
                </p>
                <p>
                    born <input value={born} onChange={({ target }) => setBorn(target.value)} />
                </p>
                <p>
                    <button type="submit">update author</button>
                </p>
            </form>
        </div>
    )
}

export default Authors
