import React, { useState } from "react";
import { VideoCall } from "./VideoCall";
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import InputBox from "./components/Form/InputBox";

export default function App(): JSX.Element {
  const [callId, setCallId] = useState('');
  const [username, setUsername] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [callIdError, setCallIdError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
    setUsernameError("");
  }

  const handleCallId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCallId(e.target.value);
    setCallIdError(""); 
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setUsernameError("")
    setCallIdError("");

    let isValid = true;
    if (!username) {
      setUsernameError("Name is required");
      isValid = false;
    }
    if (!callId) {
      setCallIdError("Call Id is required");
      isValid = false;
    }
    if (!isValid) return;

    // Check if any field is empty
    if (!username || !callId) {
      setError('Please fill all the required fields !!!');
      return;
    }

    setError('');

    const apiKey = 'mvxc2ac3sygv';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSGFyc2hpdCJ9.kWcdQM0kEKBW6bGO8NMbOAMc4P-v-ALeRAobeGZXIKM';
    const userId = 'Harshit';

    const user = {
      id: userId,
      name: username,
      image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    };

    const client: any = new StreamVideoClient({ apiKey, user, token });
    setClient(client);
    const call = client.call('default', callId);
    setCall(call);
    call.join({ create: true });
    setShowVideoCall(true);
  } 
  
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-white">
      {!showVideoCall ? (
        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <img className="-my-4" src="./dpe3.jpg" alt="DoctorPe Icon" />
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Doctorपे <span className="text-cyan-500">MEET</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Enter the required details</div>
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            <div className="block relative">
              <label className={`block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 ${error && !username && 'text-red-500'}`}>Your Name</label>
              <InputBox
                  onChange={handleName}
                  placeholder={"John Doe"}
                  error={usernameError ? true : false}          
               />
              {usernameError && <p className="text-red-500 text-sm pb-2">{usernameError}</p>}
            </div>

            <div className="block relative">
              <label className={`block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 ${error && !callId && 'text-red-500'}`}>Call Id</label>
              <InputBox
                  onChange={handleCallId}
                  placeholder={"Call Id"}
                  error={callIdError ? true : false}              
               />
              {callIdError && <p className="text-red-500 text-sm pb-2">{callIdError}</p>}
            </div>
            <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:underline font-bold w-max m-auto px-6 py-2 rounded-full text-sm">Submit</button>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
          </form>
        </div>
      ) : null}
      {showVideoCall && <VideoCall call={call} client={client} />}
    </div>
    </>
  );
}
