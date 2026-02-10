import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../api/api";
import SecurityNav from "../Components/SecurityNav";
import BgGlow2 from "../Components/BgGlow2";

const SecurityDashboard = () => {

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("Scanned Successfully");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [visitor, setVisitor] = useState([]);
  const [form, setForm] = useState({ visitorId: "", date: "", time: "", purpose: "" });

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

  useEffect(() => {
    if (!isScanning) return;

    const qr = new Html5Qrcode("reader");

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          qr.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: 250
            },
            async (decodedText) => {
              try {
                await qr.stop();
                setResult(decodedText);
                const res = await api.post("/api/security/scanqr", { qrData: decodedText });
                setScanningType(res.data.type);
                alert(res.data.message);
                setIsScanning(false)
              } catch (error) {
                alert(error.response?.data?.message || "scan failed")
              }
            },
            () => {}
          );

        }

      })
      .catch((err) => setError("Camera Error"));

    return () => {
      qr.stop().catch(() => { });
    };
  }, [isScanning]);

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
  }
  return (
    <div className="min-h-screen bg-black text-white">

      <SecurityNav />
      <BgGlow2 />

      <div id="reader" style={{ width: "300px", margin: "auto" }} />

      <div className="flex gap-4 justify-center mt-6">
        <button onClick={() => setIsScanning(true)}>
          Scan Now
        </button>

        <button onClick={() => setIsScanning(false)}>
          Stop Scan
        </button>
      </div>

      {result && (
        <p className="text-green-400 text-center mt-4">
          {result}
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
            {scanningType === "checkIn" ? "Visitor Checked In Successfully!" : "Visitor CheckedOut Successfully!"}
          </p>
        )
      }
    </div>
  );
};

export default SecurityDashboard;
