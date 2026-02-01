import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

import SecurityNav from "../Components/SecurityNav";
import BgGlow2 from "../Components/BgGlow2";

const SecurityDashboard = () => {

  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    if (!isScanning) return;

    const qr = new Html5Qrcode("reader");

    Html5Qrcode.getCameras()
      .then(devices => {

        if (devices && devices.length) {

          qr.start(
            devices[0].id,
            {
              fps: 10,
              qrbox: 250
            },
            (decodedText) => {
              setResult(decodedText);
            },
            () => {}
          );

        }

      })
      .catch(err => setError("Camera Error"));

    return () => {
      qr.stop().catch(() => {});
    };

  }, [isScanning]);

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

    </div>
  );
};

export default SecurityDashboard;
