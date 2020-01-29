import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { IArtist } from 'app/shared/model/artist.model';
import { ArtistService } from 'app/entities/artist/artist.service';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre/genre.service';

type SelectableEntity = IArtist | IGenre;

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html'
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  artists: IArtist[] = [];
  genres: IGenre[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    artist: [],
    genre: []
  });

  constructor(
    protected albumService: AlbumService,
    protected artistService: ArtistService,
    protected genreService: GenreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);

      this.artistService
        .query({ filter: 'album-is-null' })
        .pipe(
          map((res: HttpResponse<IArtist[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IArtist[]) => {
          if (!album.artist || !album.artist.id) {
            this.artists = resBody;
          } else {
            this.artistService
              .find(album.artist.id)
              .pipe(
                map((subRes: HttpResponse<IArtist>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IArtist[]) => (this.artists = concatRes));
          }
        });

      this.genreService
        .query({ filter: 'album-is-null' })
        .pipe(
          map((res: HttpResponse<IGenre[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGenre[]) => {
          if (!album.genre || !album.genre.id) {
            this.genres = resBody;
          } else {
            this.genreService
              .find(album.genre.id)
              .pipe(
                map((subRes: HttpResponse<IGenre>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGenre[]) => (this.genres = concatRes));
          }
        });
    });
  }

  updateForm(album: IAlbum): void {
    this.editForm.patchValue({
      id: album.id,
      name: album.name,
      artist: album.artist,
      genre: album.genre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbum {
    return {
      ...new Album(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      artist: this.editForm.get(['artist'])!.value,
      genre: this.editForm.get(['genre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
