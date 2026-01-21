import { useEffect, useState } from "react";
import api from "../api/api";

const VisitorDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [passes, setPasses] = useState([])
  const [form, setForm] = useState({
    hostId: "",
    date: "",
    time: "",
    purpose: ""
  });

  const load = async () => {
    try {
      const [emp, app, passRes] = await Promise.all([
        api.get("/api/admin/employees"),
        api.get("/api/visitor/my-appointments"),
        api.get('/visitor/my').catch(() => ({ data: [] }))
      ]);
      setEmployees(emp.data);
      setAppointments(app.data);
      setPasses(Array.isArray(passRes.data) ? passRes.data : []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/visitor/create-appointment", form);
      alert("Appointment requested");
      setForm({ hostId: "", date: "", time: "", purpose: "" });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to request appointment");
    }
  };

  useEffect(() => {
    load();
  }, []);


  return (
    <div style={{ padding: '20px' }}>
      <h2>Request Appointment</h2>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <select
          value={form.hostId}
          onChange={e => setForm({ ...form, hostId: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(e => (
            <option key={e._id} value={e._id}>
              {e.name} {e.department ? `(${e.department})` : ""}
            </option>
          ))}
        </select>

        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
        <input placeholder="Purpose" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} />

        <button type="submit">Request</button>
      </form>

      <h2 style={{ marginTop: '40px' }}>My Appointments</h2>

      {appointments.length === 0 ? <p>No appointments found</p> : (
        appointments.map(a => {
          const appointmentPass = passes.find(p => p.appointment === a._id);

          return (
            <div key={a._id} style={{ border: '1px solid #ccc', margin: '15px 0', padding: '15px', borderRadius: '8px' }}>
              <p>
                <b>{a.host?.name || 'Unknown Employee'}</b> {a.host?.department ? `(${a.host.department})` : ""} — {a.date} {a.time}
              </p>
              <p>Purpose: {a.purpose || 'N/A'}</p>
              <p>Status: <span style={{
                fontWeight: 'bold',
                color: a.status === 'approved' ? 'green' : a.status === 'rejected' ? 'red' : 'orange'
              }}>{a.status.toUpperCase()}</span></p>

              {a.status === "approved" && appointmentPass && (
                <div style={{ marginTop: '10px', padding: '10px', borderTop: '1px dashed #ccc' }}>
                  <h4>Your Entry Pass</h4>
                  <img src={appointmentPass.qrCode} alt="Pass QR Code" width={150} style={{ border: '1px solid #eee' }} />
                  <p style={{ fontSize: '0.9rem' }}>Valid From: {new Date(appointmentPass.validFrom).toLocaleString()}</p>
                  <p style={{ fontSize: '0.9rem' }}>Valid Till: {new Date(appointmentPass.validTill).toLocaleString()}</p>
                  {appointmentPass.pdfPath && (
                    <a
                      href={`http://localhost:3000/${appointmentPass.pdfPath}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: 'inline-block', marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
                    >
                      Download PDF Pass
                    </a>
                  )}
                </div>
              )}
              {a.status === "approved" && !appointmentPass && (
                <p style={{ color: '#666', fontStyle: 'italic' }}>Pass is being generated, please refresh shortly...</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default VisitorDashboard;