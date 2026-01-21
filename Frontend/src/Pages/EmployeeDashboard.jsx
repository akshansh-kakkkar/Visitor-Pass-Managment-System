import { useEffect, useState } from 'react'
import api from '../api/api'
import LogoutButton from '../Components/LogoutButton';

const EmployeeDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const load = async () => {
    try {
      const a = await api.get('/api/visitor/my-appointments');
      setAppointments(a.data);
    } catch (err) {
      console.error("Failed to load appointments", err);
    }
  };

  useEffect(() => {
    load()
  }, [])

  const action = async (id, type) => {
    try {
      await api.post('/api/visitor/handle-pass', {
        appointmentId: id,
        action: type
      });
      load();
    } catch (err) {
      console.error("Failed to perform action", err);
      alert(err.response?.data?.message || "Action failed");
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Employee Dashboard</h2>
        <LogoutButton />
      </div>

      <h3>My Appointments</h3>
      {Array.isArray(appointments) && appointments.length > 0 ? (
        appointments.map(a => (
          <div key={a._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <p><b>Visitor: </b>{a.visitor?.name || 'Unknown Visitor'}</p>
            <p><b>Email: </b>{a.visitor?.email || 'N/A'}</p>
            <p><b>Purpose: </b>{a.purpose || 'N/A'}</p>
            <p><b>Date: </b>{a.date} at {a.time}</p>
            <p><b>Status: </b>
              <span style={{
                color: a.status === 'approved' ? 'green' : a.status === 'rejected' ? 'red' : 'orange',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {a.status}
              </span>
            </p>

            {a.status === "pending" && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => action(a._id, "approve")}
                  style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Approve
                </button>
                <button
                  onClick={() => action(a._id, "reject")}
                  style={{ padding: '5px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  )
}

export default EmployeeDashboard