import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IArtist } from 'app/shared/model/artist.model';

type EntityResponseType = HttpResponse<IArtist>;
type EntityArrayResponseType = HttpResponse<IArtist[]>;

@Injectable({ providedIn: 'root' })
export class ArtistService {
  public resourceUrl = SERVER_API_URL + 'api/artists';

  constructor(protected http: HttpClient) {}

  create(artist: IArtist): Observable<EntityResponseType> {
    return this.http.post<IArtist>(this.resourceUrl, artist, { observe: 'response' });
  }

  update(artist: IArtist): Observable<EntityResponseType> {
    return this.http.put<IArtist>(this.resourceUrl, artist, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IArtist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArtist[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
