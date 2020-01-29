import { IArtist } from 'app/shared/model/artist.model';
import { IGenre } from 'app/shared/model/genre.model';
import { ITrack } from 'app/shared/model/track.model';

export interface IAlbum {
  id?: string;
  name?: string;
  artist?: IArtist;
  genre?: IGenre;
  tracks?: ITrack[];
}

export class Album implements IAlbum {
  constructor(public id?: string, public name?: string, public artist?: IArtist, public genre?: IGenre, public tracks?: ITrack[]) {}
}
