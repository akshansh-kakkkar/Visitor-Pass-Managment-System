import { useEffect, useState } from "react";
import api from "../api/api";
import BgGlow from "../Components/BgGlow";
import BgGlow2 from "../Components/BgGlow2";
import VisitorNav from "../Components/VisitorNav";

const VisitorDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [passes, setPasses] = useState([])
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([])
  const [photo, setPhoto] = useState(null)
  const [form, setForm] = useState({
    hostId: "",
    date: "",
    time: "",
    purpose: ""
  });

  const load = async () => {
    try {
      const [emp, app, passRes, LogRes] = await Promise.all([
        api.get("/api/admin/employees"),
        api.get("/api/visitor/my-appointments"),
        api.get('/visitor/my').catch(() => ({ data: [] })),
        api.get("/api/security/scanqr").catch(() => ({ data: [] }))
      ]);
      setLogs(LogRes.data || [])
      setEmployees(emp.data || []);
      setAppointments(app.data);
      setPasses(Array.isArray(passRes.data) ? passRes.data : []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please upload a photo");
      return;
    }
    
    try {
      setLoading(true);
      
      // Convert photo to base64
      const reader = new FileReader();
      const base64Photo = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(photo);
      });
      
      await api.post("/api/visitor/create-appointment", {
        ...form,
        photo: base64Photo
      });
      
      alert("Appointment requested");
      setForm({ hostId: "", date: "", time: "", purpose: "" });
      setPhoto(null);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to request appointment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const Interval = setInterval(load, 15000)
    return () => clearInterval(Interval)
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-black overflow-x-hidden">
        <VisitorNav />
        <div>
          <BgGlow2 />
        </div>
        <div className="flex justify-center mt-10">

          <form onSubmit={submit} className="relative  z-10 w-[340px] sm:w-[420px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-gray-600 border-gray-800 border-2 gap-5">
            <h2 className='text-center rounded-xl p-2 text-2xl font-bold  bg-gradient-to-r from-purple-600 to-indigo-600 '>Schedule Your Visit</h2>
            <div className="relative w-full">
              <select
                className='w-full px-4 py-3 rounded-xl bg-gray-700 border border-white text-white placeholder-gray-400 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)]'
                value={form.hostId}
                onChange={e => setForm({ ...form, hostId: e.target.value })}
                required
              >
                <option value="" className="bg-gray-700">Select Employee</option>
                {employees.map(e => (
                  <option key={e._id} value={e._id}>
                    {e.name} {e.department ? `(${e.department})` : ""}
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
            <div className="relative w-full">
              <label className='block text-sm font-medium mb-2'>Upload Your Photo *</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setPhoto(e.target.files[0])}
                className='w-full px-4 py-3 rounded-xl bg-gray-900 border text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'
                required
              />
              {photo && <p className='text-sm text-green-400 mt-2'>✓ Photo selected: {photo.name}</p>}
            </div>
            <button type="submit" disabled={loading} className='mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
              {loading ? 'Submitting...' : 'Request Appointment'}
            </button>
          </form>
        </div>
        <h2 className="justify-center flex items-center text-white font-bold text-3xl mt-5">My Appointments</h2>

        {appointments.length === 0 ? <p className="justify-center flex items-center font-bold text-2xl mt-5">No appointments found</p> : (
          appointments.map(a => {
            const appointmentPass = passes.find(p => p.appointment === a._id);
            const log = logs.find(
              status => status.pass?.appointment === a._id
            )

            return (
              <div className="justify-center flex items-center content-center text-center mb-7">
                <div key={a._id} className=" justify-center mt-8 relative  z-10 w-[340px] sm:w-[560px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-gray-800 border-2 shadow-[-0_25px_60px_rgba(0,0,0,0.85)] gap-5 backdrop-blur-2xl">
                  <p className="text-2xl w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium bg-purple-600 p-3 rounded-2xl">
                    <b>{a.host?.name || 'Unknown Employee'}</b> {a.host?.department ? `(${a.host.department})` : ""} — {a.date} {a.time}
                  </p>
                  <p className="w-full px-4 py-2 rounded-xl text-2xl bg-gray-800 border border-gray-800  outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition">Purpose: {a.purpose || 'N/A'}</p>
                  <p className="w-full px-4 py-2 rounded-xl text-2xl bg-gray-800 border border-gray-800 outline-none focus:border-purple-500/60 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition">Status: <span style={{
                    fontWeight: 'bold',
                    color: a.status === 'approved' ? 'green' : a.status === 'rejected' ? 'red' : 'orange'
                  }}>{a.status.toUpperCase()}</span></p>

                  {a.status === "approved" && appointmentPass && (
                    <div>
                      <h4 className="text-2xl font-bold ">Your Entry Pass</h4>
                      <img src={appointmentPass.qrCode} className="ml-19 my-5 rounded-xl" alt="Pass QR Code" />
                      <p className='w-full mb-5 px-4 py-3 rounded-xl bg-gray-800 border border-gray-800 text-white placeholder-white/40 outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'>Valid From: {new Date(appointmentPass.validFrom).toLocaleString()}</p>
                      <p className='w-full px-4 mb-5 py-3 rounded-xl bg-gray-800 border border-gray-800 text-white placeholder-white/40 outline-none focus:border-purple-800 focus:shadow-[0_0_0_1px_rgba(139,92,246,0.4)] transition'>Valid Till: {new Date(appointmentPass.validTill).toLocaleString()}</p>
                      {appointmentPass.pdfPath && (
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}/api/download-pass/${appointmentPass.pdfPath.split('/').pop()}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className='mt-4 md:px-20  px-12 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium '>
                          Download PDF Pass
                        </a>
                      )}
                    </div>

                  )}
                  {a.status === "approved" && !appointmentPass && (
                    <p>Pass is being generated, please refresh shortly!</p>
                  )}
                  {log && (
                    <p className={`font-bold ${log.checkOutTime ? "text-red-400" : "text-green-400"
                      }`}>
                      {log.checkOutTime ? "OUTSIDE" : "INSIDE"}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </>
  );
};

export default VisitorDashboard;