import React from 'react'
import { Html } from '../primitives/Html'

export default function InfoCard ({ value, imageSrc, body }) {
  return (
    <div className="info-card">
      <div className="layout-column">
      <img src={imageSrc} />
      </div>
      <div className="layout-column">
        <h2 className="info-card__value">{value}</h2>
        <Html markup={body} />
      </div>
    </div>
  )
}
