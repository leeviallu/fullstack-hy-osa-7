import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { modifyBlog } from '../reducers/blogReducer'
import { useEffect } from 'react'
import blogsService from '../services/blogs'
import { useState } from 'react'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)
    const [comments, setComments] = useState(null)

    useEffect(() => {
        const fetchComments = async () => {
            const comments = await blogsService.getComments(id)
            const newComments = comments.filter(
                (comment) => comment.blog === id
            )
            setComments(newComments)
        }
        fetchComments()
    }, [])

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
                    <h3>comments</h3>
                    <ul>
                        {comments
                            ? comments.map((comment) => (
                                  <li key={comment.id}>{comment.title}</li>
                              ))
                            : null}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}

export default Blog
