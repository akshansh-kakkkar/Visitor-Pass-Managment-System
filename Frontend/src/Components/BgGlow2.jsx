import React from 'react'

const BgGlow2 = () => {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[150px] hidden sm:block" />
    </>
  )
}

export default BgGlow2