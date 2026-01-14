import { useEffect, useState } from 'react'
import api from '../api/api'

const EmployeeDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setform] = useState({
    visitorId: "",
    date: "",
    time: "",
    purpose: ""
  })

  const load = async () => {
    try {
      const v = await api.get('/api/register/all-visitors');
      const a = await api.get('/api/visitor/my-appointments');
      setVisitors(v.data);
      setAppointments(a.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    load()
  }, [])

  // Filter out visitors who already have appointments
  const availableVisitors = Array.isArray(visitors) ? visitors.filter(v => {
    return !appointments.some(a => a.visitor?._id === v._id);
  }) : [];

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/visitor/create-appointment', form);
      alert('appointment created')
      setform({ visitorId: '', date: "", time: "", purpose: "" });
      load();
    } catch (err) {
      console.error("Failed to create appointment", err);
    }
  };

  const action = async (id, type) => {
    try {
      await api.post('/api/visitor/handle-pass', {
        appointmentId: id,
        action: type
      });
      load();
    } catch (err) {
      console.error("Failed to perform action", err);
    }
  }

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={create}>
        <select value={form.visitorId} onChange={(e) => setform({ ...form, visitorId: e.target.value })}>
          <option value="">Select Visitor</option>
          {availableVisitors.map(v => (
            <option key={v._id} value={v._id}>{v.name} - {v.phone}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setform({ ...form, date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setform({ ...form, time: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Purpose"
          value={form.purpose}
          onChange={(e) => setform({ ...form, purpose: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>
      <h2>My Appointments</h2>
      {Array.isArray(appointments) && appointments.map(a => (
        <div key={a._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><b>Visitor: </b>{a.visitor?.name} ({a.visitor?.phone})</p>
          <p><b>Date: </b>{a.date} at {a.time}</p>
          <p><b>Status: </b> {a.status}</p>

          {a.status === "pending" && (
            <>
              <button onClick={() => action(a._id, "approve")}>Approve</button>
              <button onClick={() => action(a._id, "reject")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default EmployeeDashboard