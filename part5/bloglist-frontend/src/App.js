import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const credentials = {
            username,
            password
        }

        loginService.login(credentials).then(returnedUser => {
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(returnedUser))

            setUser(returnedUser)
            blogService.setToken(returnedUser.token)
            setUsername('')
            setPassword('')

            setSuccessMsg('login success')
            setTimeout(() => {
                setSuccessMsg(null)
            }, 5000)
        }).catch(exception => {
            setErrorMsg(exception.response.data.error)
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        })
    }

    const handleLogoutClick = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = event => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = event => {
        setUrl(event.target.value)
    }

    const handleCreate = () => {
        const newBlog = {
            title,
            author,
            url
        }
        blogService.create(newBlog).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        })
    }

    return (
        <div>
            <Notification message={successMsg} status="success" />
            <Notification message={errorMsg} status="error" />
            {user ?
                <BlogList
                    title={title}
                    author={author}
                    url={url}
                    handleTitleChange={handleTitleChange}
                    handleAuthorChange={handleAuthorChange}
                    handleUrlChange={handleUrlChange}
                    handleCreate={handleCreate}
                    blogs={blogs}
                    user={user}
                    handleLogoutClick={handleLogoutClick}
                /> :
                <LoginForm
                    username={username}
                    password={password}
                    handleLoginSubmit={handleLoginSubmit}
                    handleUsernameChange={handleUsernameChange}
                    handlePasswordChange={handlePasswordChange}
                />}
        </div>
    )
}

export default App