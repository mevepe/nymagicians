import React from 'react'

export default function Button ({ buttonText, buttonUrl, isGhost }) {
  return (
    <a href={buttonUrl} className={`hero-button${isGhost ? ' ghost' : ''}`}>
      {buttonText}
    </a>
  )
}
