import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { modifyBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { useState } from 'react'
import { createComment, initializeComments } from '../reducers/commentsReducer'

const Blog = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const comments = useSelector((state) => state.comments)
    const id = useParams().id
    const filteredComments = comments.filter((comment) => comment.blog === id)
    const blog = blogs.find((blog) => blog.id === id)
    const [newCommentTitle, setNewCommentTitle] = useState('')

    useEffect(() => {
        dispatch(initializeComments())
    }, [])

    const addBlogLikes = () => {
        const blogObject = {
            ...blog,
            likes: blog.likes + 1,
        }
        dispatch(modifyBlog(blog.id, blogObject))
    }

    const addComment = async () => {
        const commentObject = {
            title: newCommentTitle,
        }
        dispatch(createComment(id, commentObject))
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
                    <form onSubmit={addComment}>
                        comment:
                        <input
                            value={newCommentTitle}
                            onChange={(event) =>
                                setNewCommentTitle(event.target.value)
                            }
                        />
                        <button type="submit">save</button>
                    </form>
                    <ul>
                        {filteredComments
                            ? filteredComments.map((comment) => (
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
