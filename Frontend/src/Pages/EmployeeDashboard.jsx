import { useEffect, useState } from 'react'
import api from '../api/api'
import LogoutButton from '../Components/LogoutButton';
import BgGlow2 from '../Components/BgGlow2';

const EmployeeDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [open, setOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const a = await api.get(`/api/visitor/my-appointments?t=${Date.now()}`);
      setAppointments(a.data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load()
  }, [])

  const action = async (id, type) => {
    try {
      setActionLoading(id);
      await api.post('/api/visitor/handle-pass', {
        appointmentId: id,
        action: type
      });
      await load();
    } catch (err) {
      console.error("Failed to perform action", err);
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
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
              <span className="text-gray-400 font-medium">Employee Dashboard</span>
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
              <span className="text-gray-400 font-medium text-center">Employee Dashboard</span>
              <div className="flex justify-center pb-2">
                <LogoutButton />
              </div>
            </div>
          )}
        </nav>

        <div>
          <BgGlow2 />
        </div>

        <h2 className="justify-center flex items-center text-white font-bold text-3xl mt-12 mb-8">Visitor Requests</h2>

        <div className="max-w-7xl mx-auto px-4 pb-20">
          {loading && appointments.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : appointments.length > 0 ? (
            appointments.map(a => (
              <div className="justify-center flex items-center content-center text-center mb-10 overflow-hidden">
                <div key={a._id} className="relative z-10 w-full max-w-[600px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-white/5 border-white/10 border-2 shadow-[-0_25px_60px_rgba(0,0,0,0.85)] gap-6 backdrop-blur-2xl transition-all hover:scale-[1.01]">

                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-2xl shadow-lg">
                      {(a.visitor?.name || 'V')[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {a.visitor?.name || 'Unknown Visitor'}
                      </h3>
                      <p className="text-gray-500 text-sm">{a.visitor?.email || 'No email provided'}</p>
                    </div>
                  </div>

                 
                  <div className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-xl font-medium">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Purpose of Visit</p>
                    {a.purpose || 'N/A'}
                  </div>

                
                  <div className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-xl">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Scheduled For</p>
                    <span className="font-bold">{a.date}</span> at <span className="font-bold">{a.time}</span>
                  </div>

              
                  <div className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Status</p>
                    <span className={`text-xl font-bold px-4 py-1 rounded-lg uppercase tracking-wider ${a.status === 'approved' ? 'text-green-400' :
                        a.status === 'rejected' ? 'text-red-400' :
                          'text-orange-400'
                      }`}>
                      {a.status}
                    </span>
                  </div>
                  {a.status === "pending" && (
                    <div className="flex gap-4 w-full pt-4">
                      <button
                        disabled={actionLoading === a._id}
                        onClick={() => action(a._id, "approve")}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold text-lg shadow-[0_12px_30px_rgba(34,197,94,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-50"
                      >
                        {actionLoading === a._id ? 'Processing...' : 'Approve Request'}
                      </button>
                      <button
                        disabled={actionLoading === a._id}
                        onClick={() => action(a._id, "reject")}
                        className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))
          ) : (
            <div className="max-w-[600px] mx-auto text-center py-20 bg-white/5 border border-white/10 border-dashed rounded-3xl backdrop-blur-sm">
              <svg className="w-16 h-16 text-white/10 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-300">No Pending Requests</h3>
              <p className="text-gray-500 mt-2 px-6">Any visitor requests sent to you will appear here as actionable cards.</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    </>
  )
}

export default EmployeeDashboard
