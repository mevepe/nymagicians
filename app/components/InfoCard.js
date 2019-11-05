import React from 'react'
import { Html } from '../primitives/Html'

export default function InfoCard ({ value, imageSrc, body }) {
  return (
    <div className="info-card-wrap">
      <img src={imageSrc} />
      <div>
        <h2 className="info-card__value">{value}</h2>
        <Html markup={body} />
      </div>
    </div>
  )
}
