import React, { useState } from "react";
import { VideoCall } from "./VideoCall";
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { send } from "./components/Email";

export default function App(): JSX.Element {
  const [callId, setCallId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');

  const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
    setError(''); // Clear error message when user starts typing
  }

  const handleCallId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCallId(e.target.value);
    setError(''); // Clear error message when user starts typing
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setError(''); // Clear error message when user starts typing
  }

  const handleResendEmail = (): void => {
    send({ email, username, callId });
    // You may want to show a message indicating that the email has been resent
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Check if any field is empty
    if (!username || !email || !callId) {
      setError('Please fill all the required fields !!!');
      return;
    }

    // Clear error if all fields are filled
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
    <div className="flex justify-center items-center h-screen bg-gray-800">
      {!showVideoCall ? (
        <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <img className="-my-4" src="/DoctorPe1.jpeg" alt="DoctorPe Icon" />
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">DoctorPe <span className="text-cyan-500">MEET</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Enter the required details</div>
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            <div className="block relative">
              <label className={`block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 ${error && !username && 'text-red-500'}`}>Your Name</label>
              <input onChange={handleName} type="text" id="text" className={`rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 ${error && !username && 'border-red-500'}`} />
            </div>

            <div className="block relative">
              <label className={`block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 ${error && !email && 'text-red-500'}`}>Your Email</label>
              <input onChange={handleEmail} type="email" id="email" className={`rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 ${error && !email && 'border-red-500'}`} />
            </div>
            <div className="block relative">
              <label className={`block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 ${error && !callId && 'text-red-500'}`}>Call Id</label>
              <input onChange={handleCallId} type="text" id="text" className={`rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 ${error && !callId && 'border-red-500'}`} />
            </div>
            <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:underline font-bold w-max m-auto px-6 py-2 rounded-full text-sm">Submit</button>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
          </form>
          <div className="text-sm text-center mt-[1.6rem]">Didn't receive the code?<label onClick={handleResendEmail} className="text-sm text-blue-500 pl-4 hover:underline">Resend Email</label></div>
        </div>
      ) : null}
      {showVideoCall && <VideoCall call={call} client={client} />}
    </div>
  );
}
