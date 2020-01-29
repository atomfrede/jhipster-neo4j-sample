import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NeoTestModule } from '../../../test.module';
import { ArtistDetailComponent } from 'app/entities/artist/artist-detail.component';
import { Artist } from 'app/shared/model/artist.model';

describe('Component Tests', () => {
  describe('Artist Management Detail Component', () => {
    let comp: ArtistDetailComponent;
    let fixture: ComponentFixture<ArtistDetailComponent>;
    const route = ({ data: of({ artist: new Artist('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeoTestModule],
        declarations: [ArtistDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArtistDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArtistDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load artist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.artist).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
