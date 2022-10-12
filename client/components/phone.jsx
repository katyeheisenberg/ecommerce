import React from 'react'

const Phone = ({ phone }) => {
  return (
    <div>
      <a href={`tel:${phone}`}>Contact me: +79114211544</a>
    </div>
  )
}

export default Phone
