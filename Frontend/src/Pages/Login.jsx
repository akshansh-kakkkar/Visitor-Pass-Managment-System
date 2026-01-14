import { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') 
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      const res = await api.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        navigate('/admin');
      } else if (res.data.role === 'employee') {
        navigate('/employee');
      } else if (res.data.role === 'security') {
        navigate('/security')
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password'); 
    }
  }

  return (
    <>
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type='submit'>LOGIN</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )
}

export default Login