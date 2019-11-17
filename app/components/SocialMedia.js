import React from 'react'
import Link from 'next/link'

export default function SocialMedia({ socialMediaQuery }) {
  return (
    <div className="social-media">
      <div className="wrap">
        {
          socialMediaQuery.map((social, index) => (
            <a key={index} href={social.url} className="social-media__element">
              <img src={social.image.publicUrl} />
            </a>
          ))}
      </div>
    </div>
  )
}