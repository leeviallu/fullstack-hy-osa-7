import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {
    initializeBlogs,
    createBlog,
    modifyBlog,
    removeBlog,
} from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Notification from './Notification'
import Togglable from './Togglable'

const Blogs = () => {
    const dispatch = useDispatch()
    const notification = useSelector((state) => state).notification
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

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

    const addBlogLikes = async (id, blogObject) => {
        dispatch(modifyBlog(id, blogObject))
    }

    const deleteBlog = async (id) => {
        dispatch(removeBlog(id))
        window.location.reload()
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
                        .map((blog, i) => (
                            <Blog
                                key={i}
                                blog={blog}
                                updateBlog={addBlogLikes}
                                deleteBlog={deleteBlog}
                                user={user}
                            />
                        ))}
                </div>
            ) : null}
        </div>
    )
}

export default Blogs
