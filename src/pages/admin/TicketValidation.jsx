import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { CheckCircle2, XCircle, ShieldCheck, Loader2, RefreshCcw, Camera, CameraOff } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';

const TicketValidation = () => {
  const [scanResult, setScanResult] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [manualId, setManualId] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);

  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    setIsCameraActive(true);
    setErrorMsg("");


    setTimeout(() => {
      const config = {
        fps: 10,
        qrbox: { width: 200, height: 200 },
        aspectRatio: 1.0
      };

      scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleValidation(decodedText);
          stopScanner();
        },
        (errorMessage) => { }
      ).catch(err => {
        console.error("Camera start error:", err);
        setErrorMsg("Camera access denied or failed to load.");
        setIsCameraActive(false);
      });
    }, 100);
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        setIsCameraActive(false);
      } catch (err) {
        console.error("Failed to stop scanner", err);
      }
    }
  };

  const handleValidation = async (ticketId) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const ticketRef = doc(db, "tickets", ticketId.trim());
      const ticketSnap = await getDoc(ticketRef);

      if (!ticketSnap.exists()) {
        setScanResult('error');
        setErrorMsg("Invalid Ticket: No record found.");
        return;
      }

      const data = ticketSnap.data();
      setTicketData(data);

      if (data.isValidated) {
        setScanResult('already-validated');
      } else {
        await updateDoc(ticketRef, {
          isValidated: true,
          validatedAt: new Date().toISOString()
        });
        const eventRef = doc(db, "events", data.eventId);
        await updateDoc(eventRef, { ticketsValidated: increment(1) });
        setScanResult('success');
      }
    } catch (err) {
      setScanResult('error');
      setErrorMsg("Connection error.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setTicketData(null);
    setManualId("");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-md">

          <header className="mb-6 text-center">
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-100">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase">Gate Entry</h1>
          </header>

          {isLoading ? (
            <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100">
              <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={40} />
              <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Verifying...</p>
            </div>
          ) : scanResult ? (
            <div className="bg-white rounded-[2rem] p-8 text-center shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-300">
              {scanResult === 'success' && (
                <>
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-emerald-600" size={32} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">Access Granted</h2>
                  <p className="text-slate-500 mb-6 text-sm font-bold">{ticketData?.name}</p>
                </>
              )}
              {scanResult === 'already-validated' && (
                <>
                  <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RefreshCcw className="text-amber-600" size={32} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">Already In</h2>
                  <p className="text-slate-500 mb-6 text-xs italic">Scanned: {new Date(ticketData?.validatedAt).toLocaleTimeString()}</p>
                </>
              )}
              {scanResult === 'error' && (
                <>
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="text-red-600" size={32} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">Denied</h2>
                  <p className="text-slate-500 mb-6 text-sm">{errorMsg}</p>
                </>
              )}
              <button onClick={resetScanner} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">


              <div className="relative mx-auto w-full max-w-[320px] aspect-square bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <div id="reader" className="w-full h-full"></div>

                {!isCameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-center p-6">
                    <Camera size={40} className="text-slate-600 mb-3" />
                    <button
                      onClick={startScanner}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Launch Camera
                    </button>
                    {errorMsg && <p className="text-red-400 text-[10px] mt-4 font-bold">{errorMsg}</p>}
                  </div>
                )}

                {isCameraActive && (
                  <button
                    onClick={stopScanner}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 z-50 transition-all"
                  >
                    <CameraOff size={18} />
                  </button>
                )}
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Manual Entry</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ticket ID..."
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    onClick={() => handleValidation(manualId)}
                    disabled={!manualId}
                    className="bg-slate-900 text-white px-5 rounded-xl font-black text-[10px] uppercase disabled:opacity-30"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketValidation;