import React from 'react'

const Glasscard = ({ children, classname = "" }) => {
    return (
        <div classname={`relative z-100 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-2xl shadow-[-0px_25px_60px_rgba(0,0,0,0.5)] ${classname}`}>
            {children}
        </div>
    )
}

export default Glasscard