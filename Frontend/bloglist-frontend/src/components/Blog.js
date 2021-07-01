import React, { useState } from 'react'
const Blog = ({ blog, handleLikeBlog, handleRemoveBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    handleLikeBlog(blog)
  }

  const removeBlog = () => {
    handleRemoveBlog(blog)
  }

  const removeVisibility = () => {
    if (user && user.username && user.username) {
      if (blog.user && blog.user.username) {
        return user.username ===  blog.user.username.toString() ?
          removeButtonStyle : { display: 'none' }
      } else {
        return { display: 'none' }
      }
    } else {
      return { display: 'none' }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    margin: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    paddingTop: 2,
    marginLeft: 5,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <strong>{blog.author}</strong>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="details">
        {blog.title} <button onClick={toggleVisibility} className="hide">hide</button>
        <p>{blog.url}</p>
        <p className="likes">likes {blog.likes} <button onClick={likeBlog} className="likeButton">like</button></p>
        <p><strong>{blog.author}</strong></p>
        <button style={removeVisibility()} onClick={removeBlog} className="remove-button">remove</button>
      </div>
    </div>
  )
}

export default Blog