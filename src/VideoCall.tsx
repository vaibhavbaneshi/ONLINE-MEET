import {
  StreamCall,
  StreamVideo
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import './styles.css';
import { MyUILayout } from './MyUILayout';


export function VideoCall({ call, client }: any) {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}