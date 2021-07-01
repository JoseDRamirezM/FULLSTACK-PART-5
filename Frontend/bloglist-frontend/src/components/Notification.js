import React from 'react'

const Notification = ({ message, style }) => {
  if(message === null) {
    return null
  }

  if (style) {
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
export default Notification