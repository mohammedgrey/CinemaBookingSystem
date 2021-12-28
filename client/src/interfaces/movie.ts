import room from './room';

export default interface movie {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room: any;
  image: any;
  _id?: string;
}

export interface updateMovieData {
  data: movie;
  id: string;
}
