export default interface movie {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  image: any;
}

export interface updateMovieData {
  data: movie;
  id: string;
}
