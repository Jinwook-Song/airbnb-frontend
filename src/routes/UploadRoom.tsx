import ProtectedPage from 'components/middleware/ProtectedPage';
import useHostOnly from 'lib/hooks/useHostOnly';

function UploadRoom() {
  useHostOnly();
  return <ProtectedPage>UploadRoom</ProtectedPage>;
}

export default UploadRoom;
