import React, { useState } from "react";
import { VideoCall } from "./VideoCall.tsx";

export default function App() {
  const [callId, setCallId] = useState('');
  const [username, setUsername] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'callId') {
      setCallId(value);
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVideoCall(true);
  }

  return (
    <div>
      {!showVideoCall ? (
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={username} 
            onChange={handleOnChange} 
          />
          <input 
            type="text" 
            placeholder="Call Id" 
            name="callId" 
            value={callId} 
            onChange={handleOnChange} 
          />
          <button type="submit">Join Call</button>
        </form>
      ) : null}
      {showVideoCall && <VideoCall callId={callId} username={username} />}
    </div>
  );
}
