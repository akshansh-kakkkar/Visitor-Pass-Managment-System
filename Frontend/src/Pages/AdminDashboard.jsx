import React, { useEffect, useState } from 'react'
import api from '../api/api.js'
import AdminNav from "../Components/AdminNav.jsx"
import LoadingComponent from "../Components/LoadingComponent.jsx"
import BgGlow2 from '../Components/BgGlow2.jsx';
const AdminDashboard = () => {
  const [Loading, setLoading] = useState(null);
  const [form, setform] = useState({name: "", email: "", password: "", phone: "", department: "", role: ""});
  const [checkVisitor, setCheckVisitor] = useState([]);
  const [error, seterror] = useState("");
  const [staff, setStaff] = useState([])
  const [editStaff, setEditStaff] = useState(null)
  const [editStafform, setEditStafform] = useState({name: "", email: "", phone: "", department: "", role: ""})
  const [editVisitor, setEditVisitor] = useState(null);
  const [editVisitorForm, setEditVisitorForm] = useState({name : "", email : "", phone : ""})

  const loadData = async () => {
    setLoading(true);
    try {
      const [staffRes, VisitorRes] = await Promise.all([
        api.get(`/api/admin/employees`),
        api.get(`/api/admin/all-visitors`)
      ])

      setStaff(staffRes.data);
      setCheckVisitor(VisitorRes.data.visitor || []);
    }
    catch (error) {
      seterror(error.response?.data?.message)
    }
    finally {
      setLoading(null);
    }
  }
  useEffect(() => {
    loadData();
  }, [])

  const toggleSwitch = async (id) => {
    try {
      await api.patch(`/api/admin/toggle-staff/${id}`)
      await loadData()
    }
    catch (error) {
      seterror(error.response?.data?.message || "Failed to fetch data")
    }
  }
  const createStaff = async (e) => {
    try {
      e.preventDefault()
      await api.post(`/api/admin/create-user/`, form);
      alert("Staff Created Successfully!");
      setform({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        role: ""
      })
    }
    catch (error) {
      seterror(error.response?.data?.message || "Error while creating staff")
    }
  }

  const editingStaff = (staffItem) => {
    try {
      setEditStaff(staffItem._id);
      setEditStafform({
        name: staffItem.name || "",
        email: staffItem.email || "",
        phone: staffItem.phone || "",
        department: staffItem.department || "",
        role: staffItem.role || ""
      })
    }
    catch (error) {
      seterror(error.response?.data?.message || "An Error Occured while editing the staff")
    }
  }

  const updateEmployee = async (staffId) => {
    try {
      await api.patch(`/api/admin/edit-employees`, { id: staffId, ...editStafform });
      alert("Staff Updated Successfully");
      setEditStaff(null);
      loadData();
    }
    catch (error) {
      seterror(error.response?.data?.message || "An error occured while confirming your edit")
    }
  }

    const editingVisitor = (VisitorItem) => {
    try {
      setEditVisitor(VisitorItem._id);
      setEditVisitorForm({
        name: VisitorItem.name || "",
        email: VisitorItem.email || "",
        phone: VisitorItem.phone || "",
      })
    }
    catch (error) {
      seterror(error.response?.data?.message || "An Error Occured while editing the Visitor")
    }
  }

  const updateVisitor = async (visitorId) => {
    try {
      await api.patch(`/api/admin/edit-visitor`, { id: visitorId, ...editVisitorForm });
      alert("Visitor Updated Successfully");
      setEditVisitor(null);
      loadData();
    }
    catch (error) {
      seterror(error.response?.data?.message || "An error occured while confirming your edit")
    }
  }

  return (
    <>
      <div className='bg-black overflow-x-hidden text-white min-h-screen'>
        <AdminNav />
        <div>
          <BgGlow2 />
        </div>
        <div className='flex justify-center mt-10'>
          <form onSubmit={createStaff} className="relative  z-10 w-[340px] sm:w-[420px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-gray-600 border-gray-800 border-2 gap-5">
            <h2 className='p-2 rounded-xl text-center text-2xl font-bold  bg-gradient-to-r from-purple-600 to-indigo-600'> createStaff</h2>
            <div className='relative w-full'>
              <input type="text" placeholder='fullname' className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.name} onChange={e => setform({ ...form, name: e.target.value })} />
            </div>
            <div className='relative w-full'>
              <input type="email" placeholder='email' className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.email} onChange={e => setform({ ...form, email: e.target.value })} />
            </div>
            <div className='relative w-full'>
              <input type="password" placeholder='password' className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.password} onChange={e => setform({ ...form, password: e.target.value })} />
            </div>
            <div className='relative w-full'>
              <input type="text" placeholder='phone' className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.phone} onChange={e => setform({ ...form, phone: e.target.value })} />
            </div>
            <div className='relative w-full'>
              <input type="text" className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' placeholder='department' value={form.department} onChange={e => setform({ ...form, department: e.target.value })} />
            </div>
            <div className='relative w-full'>
              <select value={form.role} className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' onChange={e => setform({ ...form, role: e.target.value })} required>
                <option value="">Select Role</option>
                <option value="employee">employee</option>
                <option value="security">security</option>
              </select>
            </div>
            <div className="mt-4">
              <button className='mt-4 w-full p-5 py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all'>Create Staff</button>
            </div>
          </form>
        </div>
        <div className='mt-24'>
          <h2 className="justify-center flex items-center text-white font-bold text-3xl mb-8">Staff</h2>
          <div className='mx-auto px-4 max-w-7xl'>
            {Loading && staff && staff.length === 0 ? (
              <LoadingComponent />
            ) : staff && staff.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {staff.map(staff => (
                  <div key={staff._id} className='border border-gray-600 rounded-2xl p-6 flex flex-col items-center gap-4 bg-gray-800'>
                    <div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-lg">
                        {staff.name && staff.name[0] ? staff.name[0].toUpperCase() : ''}
                      </div>
                    </div>
                    <div className='flex-col flex items-center gap-2 text-center w-full'>
                      {editStaff === staff._id ? (
                        <>
                          <input value={editStafform.name} onChange={e => setEditStafform({ ...editStafform, name: e.target.value })} className='w-full text-center px-3 py-2 rounded-lg bg-gray-800 text-white' />
                          <input value={editStafform.email} onChange={e => setEditStafform({ ...editStafform, email: e.target.value })} className='w-full text-center px-3 py-2 rounded-lg bg-gray-800 text-white mt-2' />
                          <div className='grid grid-cols-2 gap-4 mt-3'>
                            <div>
                              <p className='text-sm text-gray-300'>Role</p>
                              <select value={editStafform.role} onChange={e => setEditStafform({ ...editStafform, role: e.target.value })} className='w-full text-center px-2 py-2 rounded bg-gray-800 text-white'>
                                <option value="" className='text-center border-2 border-white'>Select Role</option>
                                <option value="employee">employee</option>
                                <option value="security">security</option>
                              </select>
                            </div>
                            <div>
                              <p className='text-sm text-gray-300 text-center'>Department</p>
                              <input value={editStafform.department} onChange={e => setEditStafform({ ...editStafform, department: e.target.value })} className='text-center w-full px-2 py-2 rounded bg-gray-800 text-white' />
                            </div>
                          </div>
                          <div className='mt-4 w-full flex flex-col gap-2'>
                            <button onClick={() => updateEmployee(staff._id)} className='w-full bg-green-600 hover:bg-green-800 p-3 rounded-xl text-white'>Update</button>
                            <button onClick={() => setEditStaff(null)} className='w-full bg-red-600 hover:bg-red-800 p-3 rounded-xl text-white'>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-xl">
                            <h3 className='text-gray-100'>{staff.name}</h3>
                          </div>
                          <div className='text-gray-400 text-sm'>
                            <p>{staff.email}</p>
                          </div>
                          <div className='grid grid-cols-2 gap-4 mt-4 text-gray-300 text-sm'>
                            <p >Role :</p>
                            <p>{staff.role}</p>
                            <p>Department :</p>
                            <p>{staff.department || "N/A"}</p>
                          </div>
                          <div className='mt-4'>
                            <button onClick={() => toggleSwitch(staff._id)} className={`w-full bg-green-500 font-bold hover:bg-green-700 cursor-pointer p-3 rounded-xl ${staff && staff.isActive ? 'bg-red-600 hover:bg-red-800' : 'bg-green-600 hover:bg-green-800'} text-white transition`}>
                              {staff && staff.isActive ? 'Disable Access' : 'Enable Access'}
                            </button>
                            <button onClick={() => editingStaff(staff)} className="w-full mt-2 bg-blue-600 hover:bg-blue-800 p-3 rounded-xl text-white">Edit Employee</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-4xl flex justify-center '>No Staff Found</p>
            )}
          </div>
        </div>
                <div className='mt-24'>
          <h2 className="justify-center flex items-center text-white font-bold text-3xl mb-8">Visitors</h2>
          <div className='mx-auto px-4 max-w-7xl'>
            {Loading && checkVisitor && checkVisitor.length === 0 ? (
              <LoadingComponent />
            ) : checkVisitor && checkVisitor.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {checkVisitor.map(checkVisitor => (
                  <div key={checkVisitor._id} className='border border-gray-600 rounded-2xl p-6 flex flex-col items-center gap-4 bg-gray-800'>
                    <div>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-lg">
                        {checkVisitor.name && checkVisitor.name[0] ? checkVisitor.name[0].toUpperCase() : ''}
                      </div>
                    </div>
                    <div className='flex-col flex items-center gap-2 text-center w-full'>
                      {editVisitor === checkVisitor._id ? (
                        <>
                          <input value={editVisitorForm.name} onChange={e => setEditVisitorForm({ ...editVisitorForm, name: e.target.value })} className='w-full text-center px-3 py-2 rounded-lg bg-gray-800 text-white' />
                          <input value={editVisitorForm.email} onChange={e => setEditVisitorForm({ ...editVisitorForm, email: e.target.value })} className='w-full text-center px-3 py-2 rounded-lg bg-gray-800 text-white mt-2' />

                          <div className='mt-4 w-full flex flex-col gap-2'>
                            <button onClick={() => updateVisitor(checkVisitor._id)} className='w-full bg-green-600 hover:bg-green-800 p-3 rounded-xl text-white'>Update</button>
                            <button onClick={() => setEditVisitor(null)} className='w-full bg-red-600 hover:bg-red-800 p-3 rounded-xl text-white'>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold text-xl">
                            <h3 className='text-gray-100'>{checkVisitor.name}</h3>
                          </div>
                          <div className='text-gray-400 text-sm'>
                            <p>{checkVisitor.email}</p>
                          </div>
                          <div className='mt-4'>
                            <button onClick={() => editingVisitor(checkVisitor)} className="w-full mt-2 bg-blue-600 hover:bg-blue-800 p-3 rounded-xl text-white">Edit Employee</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-4xl flex justify-center '>No visitor Found</p>
            )}
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminDashboard