import { useState } from "react";
import api from '../api/api.js';
const VisitorRegister = () => {
  const [form, setform] = useState({ name: '', phone: '', email: '', company: '', purpose: '' });
  const [photo, setphoto] = useState(null);
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const Data = new FormData();
    Object.keys(form).forEach(k=> Data.append(k, form[k]));
    Data.append("photo", photo)
    await api.post('/api/register/create-visitor', Data);
    alert('Registered')
    
    e.target.reset()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" onChange={(e) => setform({ ...form, name: e.target.value })} />
      <input type="text" placeholder="Phone" onChange={(e) => setform({ ...form, phone: e.target.value })} />
      <input type="Email" placeholder="Email" onChange={(e) => setform({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Purpose" onChange={(e) => setform({ ...form, purpose: e.target.value })} />
      <input type="file" onChange={(e)=>{setphoto(e.target.files[0])}} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default VisitorRegister