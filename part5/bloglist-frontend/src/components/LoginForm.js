import React, { useState } from 'react'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }

        await login(credentials)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    username:
                <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:
                <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm