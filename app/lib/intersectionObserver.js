import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const Component = () => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.95,
  })

  if (entry) {
    console.log(entry.isIntersecting)
  }

  return (
    <div ref={ref} className="tstpurposeonly">
      <h2>{`Header inside viewport ${inView}.`}</h2>
    </div>
  )
}

export default Component