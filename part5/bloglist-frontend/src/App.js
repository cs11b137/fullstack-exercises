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

    const [successMsg, setSuccessMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const initBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const createBlog = async (newBlog) => {
        const returnedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(returnedBlog))
    }

    const addLike = async (blog) => {
        const newObject = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }
        delete newObject.id

        try {
            const updatedBlog = await blogService.update(blog.id, newObject)
            const newBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
            setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
        } catch (error) {
            console.log(error)
        }
    }

    const remove = async (blog) => {
        if (window.confirm(`Remove ${blog.title}! by ${blog.author}`)) {
            try {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
            } catch (error) {
                console.log(error)
            }
        }
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
                        logout={logout}
                        addLike={addLike}
                        remove={remove}
                    />
                </div> :
                <LoginForm login={login} />}
        </div>
    )
}

export default App