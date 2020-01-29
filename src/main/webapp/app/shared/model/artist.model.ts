import { IAlbum } from 'app/shared/model/album.model';

export interface IArtist {
  id?: string;
  name?: string;
  album?: IAlbum;
}

export class Artist implements IArtist {
  constructor(public id?: string, public name?: string, public album?: IAlbum) {}
}
