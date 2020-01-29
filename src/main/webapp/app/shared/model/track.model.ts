import { IAlbum } from 'app/shared/model/album.model';

export interface ITrack {
  id?: string;
  name?: string;
  album?: IAlbum;
}

export class Track implements ITrack {
  constructor(public id?: string, public name?: string, public album?: IAlbum) {}
}
