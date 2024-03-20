import React, { useMemo } from 'react';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';
import { MyUILayout } from './MyUILayout';

export const VideoCall: React.FC<{ username: string; callId: string }> = ({ username, callId }) => {
  const userId = 'Harshit'; // the user id can be found in the "Credentials" section
  const apiKey = 'mvxc2ac3sygv';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSGFyc2hpdCJ9.kWcdQM0kEKBW6bGO8NMbOAMc4P-v-ALeRAobeGZXIKM';

  const user: User = useMemo(() => ({
    id: userId,
    name: username,
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  }), [username]);

  const client: StreamVideoClient = useMemo(() => new StreamVideoClient({ apiKey, user, token }), [apiKey, user]);

  const call = client.call('default', callId);
  call.join({ create: true });

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export default VideoCall;