import React, { useState, useEffect } from 'react'
import api from '../api/api.js'
import LogoutButton from '../Components/LogoutButton';
import BgGlow2 from '../Components/BgGlow2';
import LoadingComponent from '../Components/LoadingComponent.jsx';
import AdminNav from '../Components/AdminNav.jsx';
const AdminDashboard = () => {

  const [error, seterror] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: "",
    role: 'employee',
    phone: ''
  })
  const [staff, setStaff] = useState([])
  const [visitors, setVisitors] = useState([])

  const loadData = async () => {
    setLoading(true)
    try {
      const t = Date.now();
      const [sRes, vRes] = await Promise.all([
        api.get(`/api/admin/employees?t=${t}`),
        api.get(`/api/admin/all-visitors?t=${t}`)
      ]);
      setStaff(sRes.data);
      setVisitors(vRes.data.visitor || []);
    } catch (error) {
      seterror(error.response?.data?.message || "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const toggle = async (id) => {
    try {
      await api.patch(`/api/admin/toggle-staff/${id}`);
      await loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to toggle status");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/create-user', form)
      alert("User Created Successfully")
      setForm({
        name: "",
        email: "",
        password: "",
        role: "employee",
        phone: "",
        department: ""
      })
      await loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating user")
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black overflow-x-hidden text-white">
        <AdminNav/>
        <div>
          <BgGlow2 />
        </div>

    
        <div className="flex justify-center mt-10 px-4">
          <form onSubmit={createUser} className=" border-white relative z-10 w-full max-w-[500px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900   flex flex-col bg-gray-800 border-gray-900 border-2 shadow-[-0_25px_60px_rgba(0,0,0,0.85)] gap-5">
            <h2 className='text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent text-white rounded-2xl p-5'>Create New User</h2>

            <div className="relative w-full">
              <input
                placeholder="Full Name"
                className='w-full px-4 py-3 rounded-xl bg-gray-800 border border-bg-gray-400 text-white placeholder-gray-400 outline-none focus:border-purple-700 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email Address"
                className='w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-400 text-white placeholder-gray-400 outline-none focus:border-purple-700 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="relative w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className='w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-400 text-white placeholder-gray-400 outline-none focus:border-purple-700 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="relative w-full">
                <input
                  placeholder="Phone"
                  className='w-full px-4 py-3 border-gray-400 rounded-xl bg-gray-800 border  text-white placeholder-gray-400 outline-none focus:border-purple-700 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="relative w-full">
              <input
                placeholder="Department"
                className='w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-400 text-white placeholder-gray-400 outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                required
              />
            </div>

            <div className="relative w-full">
              <select
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-400 outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="security">Security Personnel</option>
              </select>
            </div>

            <button type="submit" className='mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all'>Onboard User</button>
          </form>
        </div>

        <div className="mt-20">
          <h2 className="justify-center flex items-center text-white font-bold text-3xl mb-8">Organization Staff</h2>
          <div className="max-w-7xl mx-auto px-4">
            {loading && staff.length === 0 ? (
              <LoadingComponent/>
            ) : staff.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {staff.map(user => (
                  <div key={user._id} className="relative z-10 rounded-2xl  justify-center p-6 bg-gray border border-gray-900 shadow-[-0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col gap-4">
                    <div className="flex justify-center items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-xl">
                        {user.name[0].toUpperCase()}
                      </div>
                      
                    </div>

                    <div>
                      <div className='flex justify-center'><h3 className="text-xl font-bold truncate">{user.name}</h3></div>
                      
                      <div className='flex justify-center'><p className="text-gray-400 text-sm">{user.email}</p></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-800 mt-auto">
                      <div className='flex justify-center flex-col mx-5'>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Role</p>
                        <p className="text-sm font-medium capitalize">{user.role}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Dept</p>
                        <p className="text-sm font-medium truncate">{user.department || 'N/A'}</p>
                      </div>
                    </div>

                    <button onClick={() => toggle(user._id)} className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 border ${user.isActive
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 border-gray-500'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-5~00 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 border-gray-500'
                        }`}
                    >
                      {user.isActive ? 'Disable Access' : 'Enable Access'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-20">No staff members found.</p>
            )}
          </div>
        </div>


        <div className="mt-20">
          <h2 className="justify-center flex items-center text-white font-bold text-3xl mb-8">Registered Visitors</h2>
          <div className="max-w-7xl mx-auto px-4 pb-20">
            {loading && visitors.length === 0 ? (
              <LoadingComponent/>
            ) : visitors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visitors.map(v => (
                  <div key={v._id} className="relative z-10 rounded-2xl p-6 bg-gray-800 border border-gray-900 shadow-[-0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-2xl">
                      {v.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{v.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{v.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 bg-gray-800 border border-gray-900 border-dashed rounded-3xl">
                No registered visitors found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard