import React from 'react'

const BgGlow = () => {
  return (
    <>
       <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] hidden md:block" />

       <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] hidden md:block" />
    </>
  )
}

export default BgGlow