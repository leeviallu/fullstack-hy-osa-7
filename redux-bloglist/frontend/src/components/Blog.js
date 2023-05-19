import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { modifyBlog } from '../reducers/blogReducer'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)
    const addBlogLikes = () => {
        const blogObject = {
            ...blog,
            likes: blog.likes + 1,
        }
        dispatch(modifyBlog(blog.id, blogObject))
    }

    return (
        <div>
            {blog ? (
                <div>
                    <h1>{blog.title}</h1>
                    <a target="_blank" href={blog.url}>
                        {blog.url}
                    </a>
                    <p>
                        {blog.likes} likes{' '}
                        <button onClick={addBlogLikes}>like</button>
                    </p>
                    <p>added by {blog.author}</p>
                </div>
            ) : null}
        </div>
    )
}

export default Blog
