import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoom } from 'util/api';

function RoomDetail() {
  const { roomPk } = useParams();

  const { data } = useQuery(['roomId:', roomPk], getRoom);
  console.log(data);
  return <div>RoomDetail</div>;
}

export default RoomDetail;
