import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, MapPin, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface SmartAttendanceProps {
  userId: string;
  userType: 'student' | 'teacher';
  lang: "EN" | "BN" | "AR";
  onClose?: () => void;
  onSuccess?: () => void;
}

export const SmartAttendance: React.FC<SmartAttendanceProps> = ({ userId, userType, lang, onClose, onSuccess }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    let isMounted = true;
    
    if (status === 'scanning') {
      // Small timeout to ensure DOM is fully ready
      const initTimer = setTimeout(() => {
        if (!isMounted) return;
        
        try {
          // Clean up any existing scanner HTML before initializing (helps with React 18 Strict Mode)
          const readerElement = document.getElementById('reader');
          if (readerElement) readerElement.innerHTML = '';

          scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
          );
          
          scanner.render((decodedText) => {
            if (decodedText.includes('shafina-college-attendance')) {
              if (scanner) scanner.clear();
              submitAttendance('QR Scan');
            } else {
              setMessage(lang === "EN" ? "Invalid QR Code" : "ভুল কিউআর কোড");
            }
          }, (_error) => {
            // ignore scan errors
          });
        } catch (e) {
          console.error("Scanner initialization error:", e);
        }
      }, 50);

      return () => {
        isMounted = false;
        clearTimeout(initTimer);
        if (scanner) {
          scanner.clear().catch(console.error);
        }
      };
    }
  }, [status]);

  // Haversine formula to calculate distance between two lat/lng points in meters
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const p1 = lat1 * Math.PI/180;
    const p2 = lat2 * Math.PI/180;
    const dp = (lat2-lat1) * Math.PI/180;
    const dl = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dp/2) * Math.sin(dp/2) +
              Math.cos(p1) * Math.cos(p2) *
              Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const COLLEGE_LAT = 24.8949; // Default College Latitude (Sylhet region)
  const COLLEGE_LNG = 91.8687; // Default College Longitude
  const MAX_DISTANCE_METERS = 500;

  const handleTapCheckIn = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setMessage(lang === "EN" ? "GPS is not supported by your browser" : "আপনার ডিভাইসে জিপিএস সমর্থিত নয়");
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const dist = getDistance(position.coords.latitude, position.coords.longitude, COLLEGE_LAT, COLLEGE_LNG);
        if (dist <= MAX_DISTANCE_METERS) {
          submitAttendance('Mobile Tap (GPS Verified)');
        } else {
          setStatus('error');
          setMessage(lang === "EN" ? "You are too far from the campus!" : "আপনি ক্যাম্পাস থেকে অনেক দূরে আছেন!");
          setTimeout(() => setStatus('idle'), 4000);
        }
      },
      (_error) => {
        setStatus('error');
        setMessage(lang === "EN" ? "Please enable GPS location to check in" : "চেক-ইন করতে দয়া করে জিপিএস চালু করুন");
        setTimeout(() => setStatus('idle'), 3000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const submitAttendance = async (deviceType: string) => {
    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0];
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

      const response = await fetch('/api/attendance.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: userId,
          user_type: userType,
          date: dateStr,
          time_in: timeStr,
          status: 'Present',
          device_id: deviceType
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        setStatus('success');
        setMessage(lang === "EN" ? "Attendance marked successfully!" : "উপস্থিতি সফলভাবে রেকর্ড করা হয়েছে!");
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 2000);
      } else {
        throw new Error(result.error || "Failed to mark attendance");
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || "An error occurred");
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-md items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          {onClose && (
            <button onClick={onClose} className="absolute top-4 right-4 bg-emerald-700 hover:bg-emerald-800 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
          <ShieldCheck className="w-12 h-12 mx-auto mb-2 opacity-90" />
          <h2 className="text-2xl font-bold">
            {lang === "EN" ? "Smart Check-In" : "স্মার্ট চেক-ইন"}
          </h2>
          <p className="text-emerald-100 text-sm mt-1">
            {lang === "EN" ? "Mark your daily attendance instantly" : "আপনার দৈনন্দিন উপস্থিতি তাৎক্ষণিকভাবে দিন"}
          </p>
        </div>

        <div className="p-8 flex flex-col items-center gap-6">
          {status === 'success' ? (
            <div className="text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{message}</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-center animate-in shake duration-300">
              <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-12 h-12" />
              </div>
              <p className="text-xl font-bold text-rose-600">{message}</p>
            </div>
          ) : status === 'scanning' ? (
            <div className="w-full">
              <div id="reader" className="w-full overflow-hidden rounded-xl border-2 border-emerald-500 shadow-inner bg-slate-100 dark:bg-slate-800"></div>
              {message && <p className="text-center text-rose-500 mt-2 font-medium">{message}</p>}
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:text-slate-200 rounded-xl font-semibold transition-colors"
              >
                {lang === "EN" ? "Cancel Scanning" : "স্ক্যানিং বাতিল করুন"}
              </button>
            </div>
          ) : (
            <>
              {/* Tap Button */}
              <button 
                onClick={handleTapCheckIn}
                className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex flex-col items-center gap-2 group"
              >
                <div className="bg-white dark:bg-slate-900/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8" />
                </div>
                <span className="text-xl font-bold tracking-wide">
                  {lang === "EN" ? "TAP TO CHECK IN" : "চেক-ইন করতে ট্যাপ করুন"}
                </span>
              </button>

              <div className="w-full flex items-center gap-4 text-slate-400 text-sm font-medium">
                <div className="h-px bg-slate-200 flex-1"></div>
                {lang === "EN" ? "OR" : "অথবা"}
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              {/* Scan Button */}
              <button 
                onClick={() => setStatus('scanning')}
                className="w-full py-4 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 dark:text-slate-300 rounded-2xl transition-colors flex items-center justify-center gap-3"
              >
                <Camera className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-lg">
                  {lang === "EN" ? "Scan Campus QR" : "ক্যাম্পাস কিউআর স্ক্যান করুন"}
                </span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
