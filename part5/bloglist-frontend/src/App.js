import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const initBlogs = async () => {
            const result = await blogService.getAll()
            setBlogs(result)
        }
        initBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const login = async (credentials) => {
        try {
            const returnedUser = await loginService.login(credentials)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(returnedUser))
            setUser(returnedUser)
            blogService.setToken(returnedUser.token)

            setSuccessMsg('login success')
            setTimeout(() => {
                setSuccessMsg(null)
            }, 5000)
        } catch (error) {
            setErrorMsg(error.response.data.error)
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        }
    }

    const handleLogoutClick = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const createBlog = async (newBlog) => {
        const returnedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(returnedBlog))
    }

    const addLike = async () => {
        
    }

    return (
        <div>
            <Notification message={successMsg} status="success" />
            <Notification message={errorMsg} status="error" />
            {user ?
                <div>
                    <Togglable>
                        <BlogForm createBlog={createBlog} />
                    </Togglable>
                    <BlogList 
                        blogs={blogs} 
                        user={user} 
                        handleLogoutClick={handleLogoutClick} 
                    />
                </div> :
                <LoginForm login={login} />}
        </div>
    )
}

export default App