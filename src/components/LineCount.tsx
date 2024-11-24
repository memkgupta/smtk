import React from 'react'

const LineCount = ({count}:{count:number[]}) => {
  return (
    <div className='grid gap-1'>
        {
            count.map(c=>(<div>{c}</div>))
        }
    </div>
  )
}

export default LineCount