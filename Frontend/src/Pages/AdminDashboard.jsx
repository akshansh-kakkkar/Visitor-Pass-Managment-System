import React, { useState, useEffect } from 'react'
import api from '../api/api.js'
import LogoutButton from '../Components/LogoutButton';
import BgGlow2 from '../Components/BgGlow2';
import LoadingComponent from '../Components/LoadingComponent.jsx';

const AdminDashboard = () => {

  const [error, seterror] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
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
      <div className="min-h-screen bg-black overflow-x-hidden text-white font-sans">
        <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 text-white p-4 transition-all duration-300">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              PASSIFY
            </div>

            <div className="hidden md:flex items-center gap-6">
              <span className="text-gray-400 font-medium">Admin Dashboard</span>
              <LogoutButton />
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <span className="text-2xl">{open ? "✕" : "☰"}</span>
            </button>
          </div>
          {open && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/5 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
              <span className="text-gray-400 font-medium text-center">Admin Dashboard</span>
              <div className="flex justify-center pb-2">
                <LogoutButton />
              </div>
            </div>
          )}
        </nav>
        <div>
          <BgGlow2 />
        </div>

    
        <div className="flex justify-center mt-10 px-4">
          <form onSubmit={createUser} className="relative z-10 w-full max-w-[500px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-white/5 border-white/10 border-2 shadow-[-0_25px_60px_rgba(0,0,0,0.85)] gap-5 backdrop-blur-2xl">
            <h2 className='text-center text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent'>Onboard New User</h2>

            <div className="relative w-full">
              <input
                placeholder="Full Name"
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Email Address"
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
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
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <div className="relative w-full">
                <input
                  placeholder="Phone"
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="relative w-full">
              <input
                placeholder="Department"
                className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                required
              />
            </div>

            <div className="relative w-full">
              <select
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-white placeholder-white/40 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition"
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
                  <div key={user._id} className="relative z-10 rounded-2xl  justify-center p-6 bg-white/5 border border-white/10 shadow-[-0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col gap-4">
                    <div className="flex justify-center items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-xl">
                        {user.name[0].toUpperCase()}
                      </div>
                      
                    </div>

                    <div>
                      <div className='flex justify-center'><h3 className="text-xl font-bold truncate">{user.name}</h3></div>
                      
                      <div className='flex justify-center'><p className="text-gray-400 text-sm">{user.email}</p></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 mt-auto">
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
                  <div key={v._id} className="relative z-10 rounded-2xl p-6 bg-white/5 border border-white/10 shadow-[-0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col items-center gap-4 text-center">
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
              <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 border border-white/10 border-dashed rounded-3xl">
                No registered visitors found.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    </>
  )
}

export default AdminDashboard