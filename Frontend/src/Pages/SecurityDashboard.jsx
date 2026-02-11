import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../api/api";
import SecurityNav from "../Components/SecurityNav";
import BgGlow2 from "../Components/BgGlow2";

const SecurityDashboard = () => {
  const [scanningType, setScanningType] = useState("")
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [visitor, setVisitor] = useState([]);
  const [form, setForm] = useState({ visitorId: "", date: "", time: "", purpose: "" });
  const [scannedAppointment, setScannedAppointment] = useState(null);
  const [scannedQrData, setScannedQrData] = useState("");
  const [alreadyCheckedIn, setAlreadyCheckedIn] = useState(false);

  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);

  const load = async () => {
    try {
      const visitorRes = await api.get(`/api/admin/all-visitors`);
      setVisitor(visitorRes.data.visitor || []);
    } catch (err) {
      console.error("Failed to load visitors", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startScanner = async () => {
    setError("");
    setResult("");
    setScanningType("");
    setScannedAppointment(null);
    setScannedQrData("");
    setAlreadyCheckedIn(false);
    isProcessingRef.current = false;
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
      }
      scannerRef.current = null;
    }
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      readerElement.innerHTML = "";
    }

    try {
      const qr = new Html5Qrcode("reader");
      scannerRef.current = qr;

      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setError("No cameras found");
        setIsScanning(false);
        return;
      }

      await qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;
          try {
            await qr.stop();
            scannerRef.current = null;
            setResult(decodedText);
            setScannedQrData(decodedText);

            const res = await api.post("/api/security/verifyqr", { qrData: decodedText });
            setScannedAppointment(res.data.appointment);
            setAlreadyCheckedIn(res.data.alreadyCheckedIn);
          } catch (error) {
            alert(error.response?.data?.message || "Scan failed");
          } finally {
            setIsScanning(false);
            isProcessingRef.current = false;
          }
        },
        () => { }
      );
    } catch (err) {
      console.error("Scanner start error:", err);
      setError("Failed to start camera. Please allow camera permission.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
      }
      scannerRef.current = null;
    }
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      readerElement.innerHTML = "";
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (isScanning) {
      startScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => { });
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  const handleCheckIn = async () => {
    try {
      const res = await api.post("/api/security/scanqr", { qrData: scannedQrData });
      setScanningType(res.data.type);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  const handleReject = async () => {
    try {
      const res = await api.post("/api/security/rejectvisitor", { qrData: scannedQrData });
      setScanningType("rejected");
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await api.post("/api/security/scanqr", { qrData: scannedQrData });
      setScanningType(res.data.type);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed");
    }
  };

  const CreatePass = async (e) => {
    try {
      e.preventDefault();
      setCreating(true);
      await api.post("/api/visitor/staff/handle-route/pass", form);
      alert("Pass Created Successfully!");
      setForm({ visitorId: "", date: "", time: "", purpose: "" });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create pass");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SecurityNav />
      <BgGlow2 />
      <div className="flex justify-center items-center m-5">
        <form onSubmit={CreatePass} className="relative  z-10 w-[340px] sm:w-[420px] items-center rounded-2xl p-8 border-t-5 border-t-purple-900 flex flex-col bg-gray-600 border-gray-800 border-2 gap-5">
          <h2 className='text-center rounded-xl p-2 text-2xl font-bold  bg-gradient-to-r from-purple-600 to-indigo-600 '>Schedule the Visit</h2>
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
          <button
            type="submit"
            disabled={creating}
            className='mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium'
          >
            {creating ? 'Creating Pass...' : 'Create Pass'}
          </button>
        </form>
      </div>
      <div id="reader" style={{ width: "300px", margin: "auto", border: isScanning ? "2px solid white" : "none" }} />

      <div className="flex gap-4 justify-center mt-6 ">
        <button onClick={() => setIsScanning(true)} disabled={isScanning} className="bg-green-600 rounded-xl p-2 disabled:opacity-50">
          Scan Now
        </button>

        <button onClick={stopScanner} disabled={!isScanning} className="bg-red-600 rounded-xl p-2 disabled:opacity-50">
          Stop Scan
        </button>
      </div>

      {result && (
        <p className="text-green-400 text-center mt-4">
          Scanned: {result}
        </p>
      )}

      {error && (
        <p className="text-red-400 text-center mt-4">
          {error}
        </p>
      )}
      {
        scanningType && (
          <p className="text-white  text-center mt-4 ">
            {scanningType === "checkIn" ? "Visitor Checked In Successfully!" :
              scanningType === "checkout" ? "Visitor Checked Out Successfully!" :
                scanningType === "rejected" ? "Visitor Rejected!" : ""}
          </p>
        )
      }

      {scannedAppointment && (
        <div className="flex justify-center mt-8">
          <div className="relative z-10 w-[340px] sm:w-[420px] rounded-2xl p-8 border-t-5 border-t-purple-900 bg-gray-800 border-2 gap-5">
            <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl">
              Visitor Information
            </h3>
            {scannedAppointment.photo && scannedAppointment.photo.startsWith("data:") && (
              <div className="flex justify-center mb-4">
                <img
                  src={scannedAppointment.photo}
                  alt="Visitor Photo"
                  className="w-48 h-48 object-cover rounded-xl border-4 border-purple-500"
                />
              </div>
            )}
            <div className="space-y-3">
              <p className="text-lg"><span className="font-bold text-purple-400">Name:</span> {scannedAppointment.visitor?.name || 'N/A'}</p>
              <p className="text-lg"><span className="font-bold text-purple-400">Email:</span> {scannedAppointment.visitor?.email || 'N/A'}</p>
              <p className="text-lg"><span className="font-bold text-purple-400">Host:</span> {scannedAppointment.host?.name || 'N/A'}</p>
              <p className="text-lg"><span className="font-bold text-purple-400">Date:</span> {scannedAppointment.date}</p>
              <p className="text-lg"><span className="font-bold text-purple-400">Time:</span> {scannedAppointment.time}</p>
              <p className="text-lg"><span className="font-bold text-purple-400">Purpose:</span> {scannedAppointment.purpose || 'N/A'}</p>
            </div>

            {!scanningType && (
              <div className="flex gap-4 justify-center mt-6">
                {alreadyCheckedIn ? (
                  <button
                    onClick={handleCheckOut}
                    className="mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCheckIn}
                      className='mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      Check In
                    </button>

                    <button
                      onClick={handleReject}
                      className='mt-4 w-full py-3 rounded-xl border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow-[0_12px_30px_rgba(139,92,246,0.6)] hover:scale-[1.03] hover:shadow-[0_18px_45px_rgba(139,92,246,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed'                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityDashboard;
