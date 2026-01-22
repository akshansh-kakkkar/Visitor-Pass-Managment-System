import React from 'react'
import { useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import BgGlow from './BgGlow';
import eyeIcon from '../../assets/eye.svg'
import eyeSlashIcon from '../../assets/eye-slash.svg'

const VisitorRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState('')
    const [showpassword, setShowpassword] = useState(false)
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post('/api/visitor/register', {
                name, email, password
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            Navigate('/visitor')
        }
        catch {
            console.log('something went wrong')
        }
    }


    return (
        <>
            <div className='relative min-h-screen bg-black overflow-hidden flex items-center justify-center'>
                <BgGlow />
                <form onSubmit={handleSubmit} className='relative z-10 w-[320px] sm:w-[420px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-white/5 border-white/10 border-2 shadow-[-0_25px_60px_rgba(0,0,0,0.85)] gap-5 backdrop-blur-2xl'>
                    <div className='font-bold justify-center p-5 rounded-2xl px-8 text-4xl  bg-gradient-to-r from-purple-500 to-indigo-500 hover:shadow-[0_2px_45px_rgba(139,92,246,0.8)] transition-all'>
                        <h1>P</h1>
                    </div>
                    <h1 className='text-center text-2xl font-bold font-semiboldbg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparen'>Welcome</h1>
                    <p className='text-sm text-gray-400'>Enter your credentials to access PASSIFY</p>
                    <label htmlFor="name" className='flex -translate-x-25 sm:-translate-x-37 translate-y-4'>Name</label>
                    <div className="relative w-full">
                        <input type="text" placeholder='John Doe' required onChange={(e) => { setName(e.target.value) }} className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition" />
                        <img src="/assets/name.svg" className=' absolute right-4 top-1/2 -translate-y-1/2 w-6 opacity-60 cursor-pointer hover:opacity-100 transition' alt="profile-icon" />
                    </div>
                    <label htmlFor="email" className='flex -translate-x-25 sm:-translate-x-37 translate-y-4'>Email</label>
                    <div className="relative w-full">
                        <input type="email" placeholder='name@gmail.com' required onChange={(e) => { setEmail(e.target.value) }} className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition" />
                        <img src="/assets/profile.svg" className=' absolute right-4 top-1/2 -translate-y-1/2 w-5 opacity-60 cursor-pointer hover:opacity-100 transition' alt="profile icon" />
                    </div>
                    <label htmlFor="password" className='flex -translate-x-20  sm:-translate-x-33 translate-y-4'>Password</label>
                    <div className="relative w-full">
                        <input type={showpassword ? 'text' : 'password'} placeholder='●●●●●●●●' required onChange={(e) => { setPassword(e.target.value) }} className="w-full px-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none  focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition" />
                        <img
                            src={showpassword ? eyeIcon : eyeSlashIcon}
                            alt="toggle password"
                            onClick={() => setShowpassword(prev => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 opacity-60 cursor-pointer hover:opacity-100 transition"
                        />
                    </div>
                    <button type='submit' className='mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all'>LOGIN</button>
                    <div className='w-80 h-[0.3px] mt-7 bg-gray-800 rounded-full'></div>
                    <p className='text-sm text-gray-400 font-bold'>Aleready a visitor?  <span className='text-purple-600 font-semibold hover:underline'><a href="/visitor-login">click here</a></span> </p>
                    {error && <p className="text-red-400 text-sm text-center mt-3 relative z-10">{error}</p>}
                </form>
            </div>
        </>
    )
}

export default VisitorRegister