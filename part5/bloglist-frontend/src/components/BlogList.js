import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.username} logged in
                <button onClick={props.handleLogoutClick}>logout</button>
            </p>
            <div>
                <h1>create new</h1>
                <form onSubmit={props.handleCreate}>
                    <div>
                        title: <input type="text" value={props.title} onChange={props.handleTitleChange}/>
                    </div>
                    <div>
                        author: <input type="text" value={props.author} onChange={props.handleAuthorChange}/>
                    </div>
                    <div>
                        url: <input type="text" value={props.url} onChange={props.handleUrlChange}/>
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default BlogList