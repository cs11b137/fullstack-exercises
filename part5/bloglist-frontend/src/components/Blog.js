import React, { useState } from 'react'

const Blog = ({ blog, user, addLike, remove }) => {
    const [visible, setVisible] = useState(false)

    const show = { display: visible ? 'none' : '' }
    const hide = { display: visible ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const removeBtnStyle = {
        border: 'solid',
        borderWidth: 1,
        borderColor: '#666',
        background: '#666',
        color: '#fff'
    }

    return (
        <div className="blog" style={blogStyle}>
            <p>
                {blog.title}
                <button style={show} onClick={() => setVisible(true)}>show</button>
                <button style={hide} onClick={() => setVisible(false)}>hide</button>
            </p>
            <div style={hide}>
                <p>{blog.url}</p>
                <p>
                    {blog.likes}
                    <button onClick={() => addLike(blog)}>like</button>
                </p>
                <p>{blog.author}</p>
                {user.username === blog.user.username ?
                    <button onClick={() => remove(blog)} style={removeBtnStyle} >remove</button> : null}
            </div>
        </div>
    )
}

export default Blog
