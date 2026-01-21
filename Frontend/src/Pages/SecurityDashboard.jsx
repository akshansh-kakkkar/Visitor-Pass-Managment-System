import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { Html5Qrcode } from 'html5-qrcode';

const SecurityDashboard = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  const startScanner = async () => {
    setIsScanning(true);
    setError("");
    setResult("");

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          setResult("Processing...");
          stopScanner(); 

          try {
            const res = await api.post("/api/security/check-log", {
              qrData: decodedText
            });
            setResult(res.data.message);
          } catch (err) {
            setError(err.response?.data?.message || "Scan failed");
          }
        },
      );
    } catch (err) {
      setError("Unable to start camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Failed to stop scanner", err);
      }
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Security Dashboard</h2>

      <div style={{ margin: "20px auto", maxWidth: "400px" }}>
        {!isScanning ? (
          <button
            onClick={startScanner}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
          >
            Start QR Scanner
          </button>
        ) : (
          <button
            onClick={stopScanner}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
          >
            Stop Scanner
          </button>
        )}
      </div>

      <div id="qr-reader" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></div>

      <div style={{ marginTop: "20px" }}>
        {result && (
          <div style={{ padding: "15px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "5px", border: "1px solid #c3e6cb" }}>
            <strong>{result}</strong>
          </div>
        )}
        {error && (
          <div style={{ padding: "15px", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "5px", border: "1px solid #f5c6cb" }}>
            <strong>{error}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityDashboard;