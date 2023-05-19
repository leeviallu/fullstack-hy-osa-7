import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, removeBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
        dispatch(
            setNotification(
                `a new blog ${blogObject.title} by ${blogObject.author} added`,
                5
            )
        )
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog.id))
            window.location.reload()
        }
    }
    const blogFormRef = useRef()

    return (
        <div>
            <Notification message={notification} />
            {user ? (
                <div>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                    {[...blogs]
                        .sort((blog1, blog2) => blog2.likes - blog1.likes)
                        .map((blog) => (
                            <div key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>
                                    {blog.title}
                                </Link>
                                {user.username === blog.user.username ? (
                                    <button onClick={() => deleteBlog(blog)}>
                                        delete
                                    </button>
                                ) : null}
                            </div>
                        ))}
                </div>
            ) : null}
        </div>
    )
}

export default Blogs
