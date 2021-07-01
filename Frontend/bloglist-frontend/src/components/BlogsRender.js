import React from 'react'
import Blog from './Blog'
const BlogsRender = ({ blogs, handleLikeBlog, handleRemoveBlog, user }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeBlog={handleLikeBlog}
          handleRemoveBlog={handleRemoveBlog}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogsRender