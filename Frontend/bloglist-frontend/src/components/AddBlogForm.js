import React, { useState } from 'react'
const AddBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSetTitle = ({ target }) => setTitle(target.value)
  const handleSetAuthor = ({ target }) => setAuthor(target.value)
  const handleSetUrl = ({ target }) => setUrl(target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    title:
          <input
            type="text"
            value={title}
            id="Title"
            onChange={handleSetTitle}
            className="title"
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            id="Author"
            onChange={handleSetAuthor}
            className="author"
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            id="BlogUrl"
            value={url}
            onChange={handleSetUrl}
            className="url"
          />
        </div>
        <button type="submit" id="create-button">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm