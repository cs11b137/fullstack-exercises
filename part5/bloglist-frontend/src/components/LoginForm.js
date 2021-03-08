import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }

        login(credentials)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    username:
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password:
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm