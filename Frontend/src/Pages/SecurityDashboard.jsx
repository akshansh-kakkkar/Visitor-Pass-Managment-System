import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { Html5Qrcode } from 'html5-qrcode';
import LogoutButton from "../Components/LogoutButton";
import BgGlow2 from "../Components/BgGlow2";

const SecurityDashboard = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const [open, setOpen] = useState(false);
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
          await stopScanner();

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
      console.error(err);
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

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-injected-by', 'security-dashboard');
    styleEl.innerHTML = `
      #qr-reader { display:flex; align-items:center; justify-content:center; position:relative; }
      #qr-reader .html5-qrcode { width:100% !important; height:100% !important; border: none !important; }
      #qr-reader video { width: 100% !important; height: 100% !important; object-fit: cover !important; border-radius: 12px; }
      #qr-reader__scan_region { border: none !important; }
    `;
    document.head.appendChild(styleEl);
    return () => {
      const el = document.querySelector('[data-injected-by="security-dashboard"]');
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      <BgGlow2 />
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 text-white p-4 transition-all duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            PASSIFY
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-gray-400 font-medium">Security Dashboard</span>
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
            <span className="text-gray-400 font-medium text-center">Security Dashboard</span>
            <div className="flex justify-center pb-2">
              <LogoutButton />
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center gap-8">

        <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Gate Control</h2>
            <p className="text-gray-400 text-sm">Align the visitor QR code within the frame to verify</p>
          </div>

          <div className="relative w-full aspect-square bg-black/60 rounded-2xl border-2 border-dashed border-white/20 overflow-hidden flex items-center justify-center">
            <div id="qr-reader" className="w-full h-full"></div>

            {!isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="w-16 h-16 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin mb-4 hidden"></div>
                <div className="text-white/40 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Camera is offline</span>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 pointer-events-none border-[40px] border-black/30">
                <div className="w-full h-full border-2 border-purple-500/50 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.3)]"></div>
              </div>
            )}
          </div>

          <div className="mt-8">
            {!isScanning ? (
              <button
                onClick={startScanner}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Scan Now
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg border border-white/10 transition-all"
              >
                Cancel Scan
              </button>
            )}
          </div>
        </div>

        {(result || error) && (
          <div className={`w-full max-w-lg p-5 rounded-2xl border animate-in fade-in slide-in-from-bottom-4 duration-500 ${error
            ? "bg-red-500/10 text-white"
            : "bg-green-500/10 text-white"
            }`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${error ? "bg-red-500/20" : "bg-green-500/20"}`}>
                {error ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>~
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider opacity-60 font-bold">{error ? 'Error Details' : 'Status'}</p>
                <p className="font-semibold text-lg">{error || result}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default SecurityDashboard;