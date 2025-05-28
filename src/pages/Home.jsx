import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [position, setPosition] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [micActive, setMicActive] = useState(false);
  const [decibel, setDecibel] = useState("");
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("noiseReports");
    return saved ? JSON.parse(saved) : [];
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const rafIdRef = useRef(null);

  // Get user location once
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setLocationError("Unable to retrieve your location.");
        console.error(err);
      }
    );
  }, []);

  // Setup mic audio analysis for decibel
  useEffect(() => {
    if (!micActive) {
      cleanupMic();
      return;
    }

    async function startMic() {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        microphoneRef.current.connect(analyserRef.current);

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

        const calculateDecibel = () => {
          analyserRef.current.getByteFrequencyData(dataArray);
          let values = 0;
          for (let i = 0; i < dataArray.length; i++) {
            values += dataArray[i] * dataArray[i];
          }
          let rms = Math.sqrt(values / dataArray.length);
          let db = Math.round(20 * Math.log10(rms / 255) + 100);
          if (db < 0) db = 0;
          if (db > 130) db = 130;
          setDecibel(db.toString());

          rafIdRef.current = requestAnimationFrame(calculateDecibel);
        };

        calculateDecibel();
      } catch (e) {
        alert("Microphone access denied or not available.");
        setMicActive(false);
        cleanupMic();
      }
    }

    startMic();

    return () => cleanupMic();

  }, [micActive]);

  function cleanupMic() {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setDecibel("");
  }

  function handleSubmitReport(e) {
    e.preventDefault();
    if (!position) {
      alert("Location not available, cannot submit report.");
      return;
    }
    if (!decibel) {
      alert("Please provide a decibel value.");
      return;
    }

    const newReport = {
      id: Date.now(),
      decibel,
      location: position,
      timestamp: new Date().toLocaleString(),
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem("noiseReports", JSON.stringify(updatedReports));
    setShowConfirmation(true);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>NoMoreNoise</h1>

      <button onClick={() => navigate("/admin")} style={styles.adminButton}>
        Admin Panel
      </button>

      {locationError && <p style={styles.error}>{locationError}</p>}

      {!position && !locationError && <p>Getting your location...</p>}

      {position && (
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={16}
          style={styles.map}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[position.lat, position.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      )}

      <form onSubmit={handleSubmitReport} style={styles.form}>
        <label>
          Decibel Level (dB):
          <input
            type="number"
            value={decibel}
            onChange={(e) => setDecibel(e.target.value)}
            placeholder="Auto or type your decibel"
            style={styles.input}
          />
        </label>

        <div style={styles.micControls}>
          {!micActive ? (
            <button type="button" onClick={() => setMicActive(true)} style={styles.micButton}>
              Start Mic & Auto Detect
            </button>
          ) : (
            <button type="button" onClick={() => setMicActive(false)} style={styles.micButtonStop}>
              Stop Mic
            </button>
          )}
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit Noise Report
        </button>
      </form>

      {showConfirmation && (
        <div style={styles.popup}>
          <p>Report submitted successfully!</p>
          <button onClick={() => setShowConfirmation(false)} style={styles.closePopup}>
            Close
          </button>
        </div>
      )}

      <button onClick={() => setShowHistory(!showHistory)} style={styles.historyToggle}>
        {showHistory ? "Hide" : "Show"} My Reports ({reports.length})
      </button>

      {showHistory && (
        <div style={styles.historyContainer}>
          {reports.length === 0 && <p>No reports submitted yet.</p>}
          {reports.map((r) => (
            <div key={r.id} style={styles.reportCard}>
              <p><strong>Decibel:</strong> {r.decibel} dB</p>
              <p>
                <strong>Location:</strong> Lat {r.location.lat.toFixed(4)}, Lng {r.location.lng.toFixed(4)}
              </p>
              <p><strong>Time:</strong> {r.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 720,
    margin: "auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    color: "#007bff",
    marginBottom: 20,
  },
  adminButton: {
    marginBottom: 20,
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  map: {
    height: "400px",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    padding: 8,
    width: "150px",
    fontSize: 16,
  },
  micControls: {
    marginTop: 12,
    marginBottom: 12,
  },
  micButton: {
    backgroundColor: "#28a745",
    border: "none",
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 6,
    cursor: "pointer",
  },
  micButtonStop: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 6,
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "12px 25px",
    fontSize: 18,
    borderRadius: 6,
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  closePopup: {
    marginTop: 12,
    backgroundColor: "#007bff",
    border: "none",
    color: "white",
    padding: "8px 16px",
    fontSize: 14,
    borderRadius: 6,
    cursor: "pointer",
  },
  historyToggle: {
    marginBottom: 10,
    padding: "8px 20px",
    fontSize: 16,
    borderRadius: 6,
    cursor: "pointer",
  },
  historyContainer: {
    textAlign: "left",
    maxHeight: "300px",
    overflowY: "auto",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
  },
  reportCard: {
    padding: 10,
    borderBottom: "1px solid #eee",
  },
};
