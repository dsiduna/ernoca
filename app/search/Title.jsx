import React from 'react'

const Title = ({title}) => {
  return (
    <div className='text-xl font-semibold leading-12'>Showing search results for 
    <span className='italic  text-[#201c78]'> {title}</span>
    </div>
  )
}

export default Title