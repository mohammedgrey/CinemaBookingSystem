export default interface room {
  seatsNumber: number;
  name: string;
  _id?: string;
}
export interface updateRoomData {
  data: room;
  id: string;
}
