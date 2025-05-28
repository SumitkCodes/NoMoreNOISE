import React, { useState } from "react";

function MicAccess() {
  const [micGranted, setMicGranted] = useState(false);
  const [error, setError] = useState(null);

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
      setError(null);
    } catch (err) {
      setError("Microphone permission denied or error occurred.");
      setMicGranted(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={requestMicAccess}>Enable Microphone</button>
      {micGranted && <p>Microphone Access Granted ✅</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default MicAccess;
