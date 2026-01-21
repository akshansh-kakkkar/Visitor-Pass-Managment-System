import React from 'react'
import { useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const VisitorRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='name' required onChange={(e) => { setName(e.target.value) }} />
                    <input type="email" placeholder='email' required onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='password' required onChange={(e) => { setPassword(e.target.value) }} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default VisitorRegister