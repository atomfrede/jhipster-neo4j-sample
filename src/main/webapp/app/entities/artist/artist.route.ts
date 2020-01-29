import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IArtist, Artist } from 'app/shared/model/artist.model';
import { ArtistService } from './artist.service';
import { ArtistComponent } from './artist.component';
import { ArtistDetailComponent } from './artist-detail.component';
import { ArtistUpdateComponent } from './artist-update.component';

@Injectable({ providedIn: 'root' })
export class ArtistResolve implements Resolve<IArtist> {
  constructor(private service: ArtistService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArtist> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((artist: HttpResponse<Artist>) => {
          if (artist.body) {
            return of(artist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Artist());
  }
}

export const artistRoute: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neoApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArtistDetailComponent,
    resolve: {
      artist: ArtistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neoApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neoApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArtistUpdateComponent,
    resolve: {
      artist: ArtistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'neoApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
