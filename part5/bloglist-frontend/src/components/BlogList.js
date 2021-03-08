import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, logout, addLike, remove }) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.username} logged in
                <button onClick={logout}>logout</button>
            </p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} addLike={addLike} remove={remove} />
            )}
        </div>
    )
}

export default BlogList