import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.username} logged in
                <button onClick={props.handleLogoutClick}>logout</button>
            </p>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default BlogList