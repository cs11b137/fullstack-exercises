import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const newObj = {
            title,
            author,
            url
        }

        await createBlog(newObj)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default BlogForm