import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './styles.css';

const apiKey = 'mvxc2ac3sygv'; // the API key can be found in the "Credentials" section
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSGFyc2hpdCJ9.kWcdQM0kEKBW6bGO8NMbOAMc4P-v-ALeRAobeGZXIKM'
const userId = 'Harshit'; // the user id can be found in the "Credentials" section
const callId = 'firstcall'; // the call id can be found in the "Credentials" section

const user: User = {
  id: userId,
  name: 'Hasa',
  image: 'https://i.pinimg.com/originals/8b/fa/44/8bfa44aed55f551de4cb821ce12e739b.jpg',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom' />
      <CallControls />
    </StreamTheme>
  );
};
