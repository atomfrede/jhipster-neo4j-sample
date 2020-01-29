import { IAlbum } from 'app/shared/model/album.model';

export interface IGenre {
  id?: string;
  name?: string;
  album?: IAlbum;
}

export class Genre implements IGenre {
  constructor(public id?: string, public name?: string, public album?: IAlbum) {}
}
