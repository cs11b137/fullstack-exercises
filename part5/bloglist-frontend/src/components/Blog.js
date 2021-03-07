import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

    const addLike = () => {
        
    }

    return (
        <div style={blogStyle}>
            <p>
                {blog.title}
                <button style={show} onClick={() => setVisible(true)}>show</button>
                <button style={hide} onClick={() => setVisible(false)}>hide</button>
            </p>
            <div style={hide}>
                <p>{blog.url}</p>
                <p>
                    {blog.likes}
                    <button onClick={addLike}>like</button>
                </p>
                <p>{blog.author}</p>
            </div>
        </div>
    )
}

export default Blog
