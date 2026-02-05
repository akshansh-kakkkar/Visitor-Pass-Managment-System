import api from '../api/api'
import { useEffect, useState } from 'react'
import BgGlow2 from "../Components/BgGlow2"
import LogoutButton from '../Components/LogoutButton'
import EmployeeNavbar from '../Components/EmployeeNavbar'
const EmployeeDashboard = () => {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setaction] = useState(null);
  const [open, setOpen] = useState(false)
  const [visitor, setVisitor] = useState([])
  const [form, setForm] = useState({ visitorId: "", date: "", time: "", purpose: "" })
  
  const load = async () => {
    setLoading(true);
    
    try {
      const [appointmentRes, visitorRes] = await Promise.all([
        api.get(`/api/visitor/my-appointments?t=${Date.now()}`),
        api.get(`/api/admin/all-visitors`)
      ]);
      setAppointment(appointmentRes.data);
      setVisitor(visitorRes.data.visitor || []);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const Action = async (id, type) => {
    try {
      setaction(id);
      await api.post("/api/visitor/handle-pass", {
        appointmentId: id,
        action: type,
      });
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "action failed");
    } finally {
      setaction(null);
    }
  };

  const CreatePass = async (e) => {
    try {
      e.preventDefault();
      await api.post("/api/visitor/staff/handle-route/pass", form);
      alert("Pass Created Successfully!");
      setForm({ visitorId: "", date: "", time: "", purpose: "" });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create pass");
    }
  }

  return (
    <>
      <div className='bg-black overflow-x-hidden text-white min-h-screen'>
        <EmployeeNavbar />

        <div>
          </div>
        <div className="flex justify-center mt-10">
          <form onSubmit={CreatePass} className="relative  z-10 w-[340px] sm:w-[420px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-gray-600 border-gray-800 border-2 gap-5">
            <h2 className='text-center rounded-xl p-2 text-2xl font-bold  bg-gradient-to-r from-purple-600 to-indigo-600 '>Schedule Your Visit</h2>
            <div className="relative w-full">
              <select
                className='w-full px-4 py-3 rounded-xl bg-gray-700 border border-white text-white placeholder-gray-400 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)]'
                value={form.visitorId}
                onChange={e => setForm({ ...form, visitorId: e.target.value })}
                required
              >
                <option value="" className="bg-gray-700">Select Visitor</option>
                {visitor.map(v => (
                  <option key={v._id} value={v._id}>
                    {v.name} {v.email ? `(${v.email})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full">
              <input type="date" className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="relative w-full">
              <input type="time" className='w-full px-4 py-3 rounded-xl bg-gray-900   text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
            </div>
            <div className="relative w-full">
              <input placeholder="Purpose" className='w-full px-4 py-3 rounded-xl bg-gray-900 border text-white placeholder-white outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition' value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />
            </div>
            <button type="submit" className='mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all'>Create Pass</button>
          </form>
        </div>
        <h2 className='flex justify-center items-center text-white font-bold text-3xl mt-12  mb-8'>Visitor Requests</h2>
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {loading && appointment.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-900 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : appointment.length > 0 ? (
            appointment.map(a => (
              <div className="justify-center flex items-center content-center text-center mb-10 overflow-hidden">
                <div key={a._id} className="relative z-10 w-full max-w-[600px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col  border-gray-600 border-2 gap-6 backdrop-blur-2xl ">

                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-lg">
                      {(a.visitor?.name || 'V')[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gray-800 p-4 rounded-2xl text-white text-transparent">
                        {a.visitor?.name || 'Unknown Visitor'}
                      </h3>
                      <p className="text-gray-500 text-sm">{a.visitor?.email || 'No email provided'}</p>
                    </div>
                  </div>


                  <div className="w-full px-6 py-4 rounded-xl bg-gray-800 border border-gray-600 text-xl font-medium">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Purpose</p>
                    {a.purpose || 'N/A'}
                  </div>


                  <div className="w-full px-6 py-4 rounded-xl bg-gray-800 border border-gray-600 text-xl">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Scheduled</p>
                    <span className="font-bold">{a.date}</span> at <span className="font-bold">{a.time}</span>
                  </div>


                  <div className="w-full px-6 py-4 rounded-xl bg-gray-800 border border-gray-600 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Status</p>
                    <span className={`text-xl font-bold px-4 py-1 rounded-lg uppercase tracking-wider ${a.status === 'approved' ? 'text-purple-600' :
                      a.status === 'rejected' ? 'text-red-400' :
                        'text-orange-400'
                      }`}>
                      {a.status}
                    </span>
                  </div>
                  {a.status === "pending" && (
                    <div className="flex gap-4 w-full pt-4">
                      <button
                        onClick={() => Action(a._id, "approve")}
                        className="flex-1 py-4 rounded-xl bg-purple-600  text-white font-bold text-lg  " >
                        {action === a._id ? 'Processing' : 'Approve Request'}
                      </button>
                      <button
                        disabled={action === a._id}
                        onClick={() => Action(a._id, "reject")}
                        className="flex-1 py-4 rounded-xl border border-gray-600 font-bold text-lg  text-white bg-red-600  ">
                        Reject
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))
          ) : (
            <div className="max-w-[600px] mx-auto text-center py-20 bg-gray-800 border border-gray-600 border-dashed rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-300">No Pending Requests</h3>
              <p className="text-gray-500 mt-2 px-6">Any visitor requests sent to you will appear here as actionable cards.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EmployeeDashboard