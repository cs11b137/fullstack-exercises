import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

const LOGIN = gql `
mutation login($username: String!, $password: String!) {
    login(
        username: $username
        password: $password
    ) {
        value
    }
}
`

const LoginForm = ({ setToken }) => {
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('userToken', token)
        }
    }, [result.data])// eslint-disable-line

    const handleSubmit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
            </div>
            <div>
                password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <div>
                <button type="submit">login</button>
            </div>
        </form>
    )
}

export default LoginForm