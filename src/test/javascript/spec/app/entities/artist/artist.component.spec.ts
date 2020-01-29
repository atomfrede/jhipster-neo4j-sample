import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NeoTestModule } from '../../../test.module';
import { ArtistComponent } from 'app/entities/artist/artist.component';
import { ArtistService } from 'app/entities/artist/artist.service';
import { Artist } from 'app/shared/model/artist.model';

describe('Component Tests', () => {
  describe('Artist Management Component', () => {
    let comp: ArtistComponent;
    let fixture: ComponentFixture<ArtistComponent>;
    let service: ArtistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NeoTestModule],
        declarations: [ArtistComponent]
      })
        .overrideTemplate(ArtistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Artist('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.artists && comp.artists[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
