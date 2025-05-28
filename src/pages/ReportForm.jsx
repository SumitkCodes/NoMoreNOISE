import React, { useState, useEffect, useRef } from "react";

export default function ReportForm({ onReportSubmitted }) {
  const [decibels, setDecibels] = useState("");
  const [noiseType, setNoiseType] = useState("traffic");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [measuring, setMeasuring] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const rafIdRef = useRef(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(6));
        setLongitude(pos.coords.longitude.toFixed(6));
      },
      () => alert("Unable to retrieve your location.")
    );
  };

  const measureNoise = async () => {
    if (measuring) {
      stopMeasuring();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      sourceRef.current.connect(analyserRef.current);
      setMeasuring(true);
      tick();
    } catch {
      alert("Microphone access denied or unavailable.");
    }
  };

  const tick = () => {
    if (!analyserRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const values = dataArrayRef.current;
    let sum = 0;
    for (let i = 0; i < values.length; i++) sum += values[i];
    const average = sum / values.length;
    const estimatedDb = Math.min(Math.max((average / 2) + 30, 30), 120).toFixed(1);
    setDecibels(estimatedDb);
    rafIdRef.current = requestAnimationFrame(tick);
  };

  const stopMeasuring = () => {
    setMeasuring(false);
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (sourceRef.current) sourceRef.current.disconnect();
    if (analyserRef.current) analyserRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
  };

  useEffect(() => stopMeasuring, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!decibels || !latitude || !longitude) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decibels: parseFloat(decibels),
          location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
          noiseType,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit report.");
      const report = await res.json();
      const savedReports = JSON.parse(localStorage.getItem("myReports") || "[]");
      localStorage.setItem("myReports", JSON.stringify([...savedReports, report._id || report.id || Date.now()]));
      setDecibels("");
      setLatitude("");
      setLongitude("");
      setNoiseType("traffic");
      onReportSubmitted();
      alert("Report submitted successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      stopMeasuring();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Submit a Noise Report</h2>
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.row}>
        <label style={styles.label}>
          Noise Level (dB):
          <input
            type="number"
            min="0"
            max="200"
            step="0.1"
            value={decibels}
            onChange={(e) => setDecibels(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter or measure"
          />
        </label>
        <button
          type="button"
          onClick={measureNoise}
          style={{ ...styles.button, backgroundColor: measuring ? "#dc3545" : "#28a745" }}
          title="Use microphone to measure noise"
        >
          {measuring ? "Stop Measuring" : "Measure Noise"}
        </button>
      </div>

      <div style={styles.row}>
        <label style={styles.label}>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            step="any"
            style={styles.input}
            placeholder="Latitude"
          />
        </label>
        <label style={styles.label}>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            step="any"
            style={styles.input}
            placeholder="Longitude"
          />
        </label>
        <button
          type="button"
          onClick={handleUseMyLocation}
          style={{ ...styles.button, backgroundColor: "#007bff", height: 40, alignSelf: "flex-end" }}
          title="Use browser location"
        >
          Use My Location
        </button>
      </div>

      <label style={{ ...styles.label, marginBottom: 20 }}>
        Noise Type:
        <select
          value={noiseType}
          onChange={(e) => setNoiseType(e.target.value)}
          style={{ ...styles.input, marginTop: 6 }}
        >
          <option value="traffic">Traffic</option>
          <option value="construction">Construction</option>
          <option value="loudspeaker">Loudspeaker</option>
          <option value="other">Other</option>
        </select>
      </label>

      <button type="submit" disabled={loading} style={styles.submitButton}>
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    marginBottom: 40,
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    backgroundColor: "#fff",
    maxWidth: 650,
    margin: "30px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: 25,
    fontWeight: "700",
    fontSize: 28,
    color: "#222",
  },
  error: {
    color: "#e55353",
    marginBottom: 20,
    fontWeight: "600",
  },
  row: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  label: {
    flex: "1 1 150px",
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginTop: 8,
    padding: "12px 15px",
    fontSize: 16,
    borderRadius: 10,
    border: "1.5px solid #ccc",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  button: {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: 15,
    transition: "background-color 0.3s ease",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 16,
    fontSize: 20,
    fontWeight: "800",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,123,255,0.4)",
    transition: "background-color 0.3s ease",
  },
};
