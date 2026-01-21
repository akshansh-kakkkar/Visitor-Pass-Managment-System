import React, { useState, useEffect } from 'react'
import api from '../api/api.js'

const AdminDashboard = () => {
  const [error, seterror] = useState('')
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
  useEffect(() => {
    ShowStaff();
    showVisitor();
  }, [])
  const toggle = async (id) => {
    try {
      await api.patch(`/api/admin/toggle-staff/${id}`);
      ShowStaff();
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
      ShowStaff();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating user")
    }
  }

  const ShowStaff = async () => {
    try {
      const s = await api.get('/api/admin/employees');
      setStaff(s.data)
    }
    catch (error) {
      seterror(error.response?.data?.message || "Failed Fetching Staff")
    }
  }
  const showVisitor = async () => {
    try {
      const v = await api.get('/api/admin/all-visitors')
      // The backend returns { visitor: [...] }, so we need to set v.data.visitor
      setVisitors(v.data.visitor || [])
    }
    catch (error) {
      seterror(error.response?.data?.message || 'Failed to fetch visitors')
    }
  }


  return (
    <div style={{ padding: '20px' }}>
      <h3>Admin Dashboard</h3>
      <div>
        <form onSubmit={createUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
          <div>
            <label>Name: </label>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label>Email: </label>
            <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label>Password: </label>
            <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div>
            <label>Phone: </label>
            <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div >
            <label>Department: </label>
            <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required />
          </div>
          <div>
            <label>Role: </label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="employee">Employee</option>
              <option value="security">Security</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Create User
          </button>
        </form>
      </div>

      <h3>Staff Members</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? staff.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
              <td>{user.department || '-'}</td>
              <td>{user.isActive ? "Active" : "Disabled"}</td>
              <td>
                <button onClick={() => toggle(user._id)}>
                  {user.isActive ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>

          )) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No staff found</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Registered Visitors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
        {visitors.length > 0 ? visitors.map(v => (
          <div key={v._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
            <h4 style={{ margin: '0 0 5px 0' }}>{v.name}</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{v.email}</p>
          </div>
        )) : (
          <p>No visitors found</p>
        )}
      </div>

    </div>
  )
}

export default AdminDashboard
