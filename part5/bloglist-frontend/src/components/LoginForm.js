import React from 'react'

const LoginForm = props => {
    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={props.handleLoginSubmit}>
                <div>
                    username:
                <input
                        type="text"
                        value={props.username}
                        onChange={props.handleUsernameChange}
                    />
                </div>
                <div>
                    password:
                <input
                        type="password"
                        value={props.password}
                        onChange={props.handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm